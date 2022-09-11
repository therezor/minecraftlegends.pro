<?php

namespace App\Http\Components\Discussions;

use Livewire\Component;

class Vote extends Component
{
    public int $points = 0;

    public function voteUp()
    {
        $this->points++;
    }

    public function voteDown()
    {
        $this->points--;
    }

    public function render()
    {
        return view('components.discussions.vote');
    }
}
