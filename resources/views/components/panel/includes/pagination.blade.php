@if($items->hasPages())
    <div class="card-footer border-0 py-5">
        {{ $items->links() }}
    </div>
@endif