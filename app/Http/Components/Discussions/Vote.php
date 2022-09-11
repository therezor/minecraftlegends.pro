<?php

namespace App\Http\Components\Discussions;

use Illuminate\Contracts\View\View;
use Livewire\Component;

class Vote extends Component
{
    public int $points = 0;

    public function voteUp(): void
    {
        $this->points++;
    }

    public function voteDown(): void
    {
        $this->points--;
    }

    public function render(): View
    {
        return view('components.discussions.vote');
    }
}
