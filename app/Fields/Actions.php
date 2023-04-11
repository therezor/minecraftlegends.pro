<?php

namespace App\Fields;

class Actions extends BaseField
{
    protected $template = 'fields.actions';

    protected $routePrefix;

    protected $actions = [
        'show',
        'edit',
        'destroy',
    ];

    public function __construct(string $name, string $routePrefix)
    {
        $this->routePrefix = $routePrefix;

        $this->meta('text-end', 'list.class');

        $this->label = __('crud.actions');

        parent::__construct($name);
    }

    public static function make(string $name, string $routePrefix): self
    {
        return new self($name, $routePrefix);
    }

    public function getRoutePrefix()
    {
        return $this->routePrefix;
    }

    public function hasAction($name): bool
    {
        return in_array($name, $this->actions);
    }
}
