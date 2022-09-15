<?php

namespace App\Http\Components\Panel;

use App\Http\Components\Traits\WithSorting;
use Livewire\Component;
use Livewire\WithPagination;

abstract class BaseTable extends Component
{
    use WithPagination;
    use WithSorting;

    public string $search = '';

    protected $queryString = [
        'search' => [
            'except' => '',
        ],
        'sortBy' => [
            'except' => 'id',
        ],
        'sortDirection' => [
            'except' => 'desc',
        ],
    ];

    public function updatingSearch()
    {
        $this->resetPage();
    }

    public function mount()
    {
        $this->sortBy = 'id';
        $this->sortDirection = 'desc';
    }
}
