<?php

namespace App\Console\Commands;

use App\Enums\Role\Permission;
use Illuminate\Console\Command;
use Illuminate\Contracts\Console\PromptsForMissingInput;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Composer;
use Illuminate\Support\Str;

class MakeCrud extends Command implements PromptsForMissingInput
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:crud {name : The model name}  {--prefix= : Route and view prefix. Default: admin}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate a new crud classes';

    protected Filesystem $filesystem;

    protected Composer $composer;

    public function __construct(Filesystem $filesystem, Composer $composer)
    {
        parent::__construct();

        $this->filesystem = $filesystem;

        $this->composer = $composer;
    }

    public function handle()
    {
        $name = trim($this->input->getArgument('name'));

        $this->createMigration($name);
        $this->createModel($name);
        $this->createForm($name, 'Form');
        $this->createForm($name, 'FilterForm');
        $this->createRepository($name);
        $this->createCrud($name);
        $this->createController($name);
        $this->addPermissions($name);
        $this->addRoute($name);
    }

    protected function createModel(string $name): void
    {
        $modelName = Str::studly($name);
        $fqn = $this->qualifyClass($modelName, 'Eloquent\\Models');
        $filename = $this->getPath($fqn);

        if ($this->filesystem->exists($filename)) {
            $this->error('Model already exists!');
            return;
        }

        $replace = [
            '@NAMESPACE' => $this->getNamespace($fqn),
            '@TABLE_NAME' => $this->getTableName($name),
            '@CLASS_NAME' => $this->getClass($fqn),
        ];

        $this->buildFromStub($filename, $this->getStub('model'), $replace);

        $this->info($fqn . ' Model created');
    }

    protected function createForm(string $name, string $formName): void
    {
        $fqn = $this->qualifyClass($formName, 'Forms\\' . Str::studly($this->getPrefix()) . '\\' . $name);
        $filename = $this->getPath($fqn);

        if ($this->filesystem->exists($filename)) {
            $this->error("{$formName} already exists!");
            return;
        }

        $replace = [
            '@NAMESPACE' => $this->getNamespace($fqn),
            '@CLASS_NAME' => $formName,
        ];

        $this->buildFromStub($filename, $this->getStub(Str::snake($formName)), $replace);

        $this->info("{$fqn} {$formName} created");
    }

    protected function createRepository(string $name): void
    {
        $repositoryName = Str::studly($name) . 'Repository';
        $fqn = $this->qualifyClass($repositoryName, 'Eloquent\\Repositories');
        $filename = $this->getPath($fqn);

        if ($this->filesystem->exists($filename)) {
            $this->error('Repository already exists!');
            return;
        }

        $modelFqn = $this->qualifyClass(Str::studly($name), 'Eloquent\\Models');

        $replace = [
            '@NAMESPACE' => $this->getNamespace($fqn),
            '@CLASS_NAME' => $this->getClass($fqn),
            '@MODEL_FQN' => $modelFqn,
            '@MODEL_NAME' => $this->getClass($modelFqn),
        ];

        $this->buildFromStub($filename, $this->getStub('repository'), $replace);

        $this->info($fqn . ' Repository created');
    }

    protected function createCrud(string $name): void
    {
        $prefix = $this->getPrefix();
        $crudName = Str::studly($name) . 'Crud';
        $fqn = $this->qualifyClass($crudName, 'Http\\Crud\\' . Str::studly($prefix));
        $filename = $this->getPath($fqn);

        if ($this->filesystem->exists($filename)) {
            $this->error('Crud already exists!');
            return;
        }

        $repositoryFqn = $this->qualifyClass(Str::studly($name) . 'Repository', 'Eloquent\\Repositories');

        $replace = [
            '@NAMESPACE' => $this->getNamespace($fqn),
            '@CLASS_NAME' => $this->getClass($fqn),
            '@PREFIX' => $prefix,
            '@ROUTE_NAME' => $this->getRouteName($name),
            '@FORM_NAMESPACE' => $this->qualifyClass(
                    Str::studly($name),
                    'Forms\\' . Str::studly($prefix)
                ) . '\\{Form, FilterForm}',
            '@REPOSITORY_FQN' => $repositoryFqn,
            '@REPOSITORY_NAME' => $this->getClass($repositoryFqn),
        ];

        $this->buildFromStub($filename, $this->getStub('crud'), $replace);

        $this->info($fqn . ' Crud created');
    }

    protected function createController(string $name): void
    {
        $prefix = $this->getPrefix();
        $controllerName = Str::studly($name) . 'Controller';
        $fqn = $this->qualifyClass($controllerName, 'Http\\Controllers\\' . Str::studly($prefix));
        $filename = $this->getPath($fqn);

        if ($this->filesystem->exists($filename)) {
            $this->error('Controller already exists!');
            return;
        }

        $crudFqn = $this->qualifyClass(Str::studly($name) . 'Crud', 'Http\\Crud\\' . Str::studly($prefix));
        $permissionName = $this->getPermissionName($name);

        $replace = [
            '@NAMESPACE' => $this->getNamespace($fqn),
            '@CLASS_NAME' => $this->getClass($fqn),
            '@CRUD_FQN' => $crudFqn,
            '@CRUD_NAME' => $this->getClass($crudFqn),
            '@PERMISSION_NAME' => $permissionName,
        ];

        $this->buildFromStub($filename, $this->getStub('controller'), $replace);

        $this->info($fqn . ' Controller created');
    }

    protected function createMigration(string $name): void
    {
        $table = $this->getTableName($name);
        $filename = 'migrations/' . date('Y_m_d_his') . "_create_{$table}_table.php";

        if ($this->filesystem->glob(database_path("migrations/*_create_{$table}_table.php"))) {
            $this->error('Migration already exists!');
            return;
        }

        $replace = [
            '@TABLE_NAME' => $this->getTableName($name),
        ];

        $this->buildFromStub(database_path($filename), $this->getStub('migration'), $replace);

        $this->info($filename . ' Migration created');
    }

    protected function addPermissions(string $name): void
    {
        $enumClass = Permission::class;
        $filename = $this->getPath($enumClass);

        if ($this->filesystem->missing($filename)) {
            $this->error('Permission file does not exists!');
            return;
        }

        $placeholder = '// Placeholder for auto insertion';
        $permissionName = $this->getPermissionName($name);
        $permissions = [
            "{$permissionName}_LIST",
            "{$permissionName}_CREATE",
            "{$permissionName}_EDIT",
            "{$permissionName}_DELETE",
        ];

        $fileContent = $this->filesystem->get($filename);

        foreach ($permissions as $permission) {
            $line = "case {$permission} = '$permission';";

            if (str_contains($fileContent, $line)) {
                $this->error("Permission {$permission} exists");
                continue;
            }

            $fileContent = str_replace($placeholder, $line . PHP_EOL . '    ' . $placeholder, $fileContent);

            $this->info("Permission {$permission} added");
        }

        $this->filesystem->put($filename, $fileContent);
    }

    protected function addRoute(string $name): void
    {
        $filename = base_path('routes/web.php');

        if ($this->filesystem->missing($filename)) {
            $this->error('Route file does not exists!');
            return;
        }

        $routeName = $this->getRouteName($name);
        $controllerFqn = '\\' . $this->qualifyClass(
                Str::studly($name) . 'Controller',
                'Http\\Controllers\\' . Str::studly($this->getPrefix())
            );
        $routeLine = "Route::resource('{$routeName}', {$controllerFqn}::class);";
        $fileContent = $this->filesystem->get($filename);
        if (str_contains($fileContent, $routeLine)) {
            $this->error("Route {$routeLine} exists");
        }

        $this->filesystem->append($filename, PHP_EOL . $routeLine);
    }

    protected function buildFromStub(string $filename, string $stub, array $replace = []): void
    {
        $stub = $this->filesystem->get($stub);

        $stub = str_replace(
            array_keys($replace),
            array_values($replace),
            $stub
        );

        $this->makeDirectory($filename);
        $this->filesystem->put($filename, $stub);
    }

    protected function getStub(string $stubName): string
    {
        return app_path("Console/Commands/Stubs/{$stubName}.stub");
    }

    protected function getPath(string $name): string
    {
        $name = Str::replaceFirst(app()->getNamespace(), '', $name);

        return app_path(str_replace('\\', '/', $name) . '.php');
    }

    protected function getTableName(string $name): string
    {
        return str_replace('.', '_', $this->getRouteName($name));
    }

    protected function getRouteName(string $name): string
    {
        return Str::plural(str_replace('/', '', Str::snake($name, '.')));
    }

    protected function getPermissionName(string $name): string
    {
        return strtoupper(
            $this->getPrefix() . '_' . str_replace('.', '_', $this->getRouteName($name))
        );
    }

    protected function makeDirectory(string $path): string
    {
        if (!$this->filesystem->isDirectory(dirname($path))) {
            $this->filesystem->makeDirectory(dirname($path), 0755, true, true);
        }

        return $path;
    }

    protected function qualifyClass(string $name, string $namespace): string
    {
        $name = ltrim($name, '\\/');

        $name = str_replace('/', '\\', $name);

        $rootNamespace = app()->getNamespace();

        if (Str::startsWith($name, $rootNamespace)) {
            return $name;
        }

        return $this->qualifyClass(
            trim($rootNamespace, '\\') . '\\' . $namespace . '\\' . $name,
            $namespace
        );
    }

    protected function getNamespace(string $fqn): string
    {
        return trim(implode('\\', array_slice(explode('\\', $fqn), 0, -1)), '\\');
    }

    protected function getClass(string $fqn): string
    {
        return str_replace($this->getNamespace($fqn) . '\\', '', $fqn);
    }

    protected function getPrefix(): string
    {
        return $this->input->getOption('prefix') ?? 'admin';
    }
}
