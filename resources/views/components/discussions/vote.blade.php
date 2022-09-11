<div class="d-inline-block">
    <button wire:click="voteUp" class="btn btn-sm btn-square btn-neutral text-opacity-100-hover text-success-hover" title="Vote up">
        <i class="bi bi-hand-thumbs-up"></i>
    </button>
    <span type="button" class="btn btn-sm btn-square @if($points > 0) btn-success @elseif($points < 0) btn-danger @else btn-secondary @endif disabled">{{ $points }}</span>
    <button wire:click="voteDown" class="btn btn-sm btn-square btn-neutral text-opacity-100-hover text-danger-hover" title="Vote down">
        <i class="bi bi-hand-thumbs-down"></i>
    </button>
</div>
