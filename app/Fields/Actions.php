<?php

namespace App\Fields;

use Illuminate\Routing\Route;

class Actions extends BaseField
{
    protected ?string $template = 'fields.actions';

    protected string $routePrefix;

    protected $actions = [
        'show',
        'edit',
        'destroy',
    ];

    public function __construct(string $name, string $routePrefix)
    {
        $this->routePrefix = $routePrefix;

        $this->meta('text-end', 'list.class');

        $this->label = trans('crud.actions');

        parent::__construct($name);
    }

    public static function make(string $name, string $routePrefix): self
    {
        return new self($name, $routePrefix);
    }

    public function hasUrl(string $action): bool
    {
        $routeName = $this->routePrefix . '.' . $action;

        return $this->hasAction($action) && \Route::has($routeName);
    }

    public function url(string $action, $value): string
    {
        $routeName = $this->routePrefix . '.' . $action;

        return route($routeName, $this->getRouteParameters() + [$value]);
    }

    protected function getRouteParameters(): array
    {
        return app(Route::class)->parameters();
    }

    public function hasAction($name): bool
    {
        return in_array($name, $this->actions);
    }
}
