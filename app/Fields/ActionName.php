<?php

namespace App\Fields;

use Illuminate\Routing\Route;
use Illuminate\Support\Str;

class ActionName extends BaseField
{
    protected ?string $template = 'fields.action-name';

    protected string $routePrefix;

    protected string $column = 'id';

    protected bool $isShow = true;

    public function __construct(string $name, string $routePrefix, string $column = 'id', bool $isShow = true)
    {
        $this->routePrefix = $routePrefix;
        $this->column = $column;
        $this->isShow = $isShow;

        parent::__construct($name);
    }

    public static function make(string $name, string $routePrefix, string $column = 'id', bool $isShow = true): self
    {
        return new self($name, $routePrefix, $column, $isShow);
    }

    public function url($entity): string
    {
        $routeName = $this->routePrefix . ($this->isShow ? '.show' : '.edit');

        return route($routeName, $this->getRouteParameters() + [$entity]);
    }

    public function limit(int $limit)
    {
        $this->valueCallback = (fn($value) => Str::limit($value, $limit));

        return $this;
    }

    protected function getRouteParameters(): array
    {
        return app(Route::class)->parameters();
    }
}
