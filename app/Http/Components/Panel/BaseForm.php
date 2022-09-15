<?php

namespace App\Http\Components\Panel;

use Livewire\Component;

abstract class BaseForm extends Component
{
    public ?string $itemId;
    public string $routePrefix;

    public function mount(string $routePrefix, string $itemId = null)
    {
        $this->routePrefix = $routePrefix;
        $this->itemId = $itemId;
        if ($this->itemId) {
            $this->fillProperties();
        }
    }
    
    abstract protected function fillProperties();
}
