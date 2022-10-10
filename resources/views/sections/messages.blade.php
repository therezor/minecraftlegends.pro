@if(session()->get('status'))
    <div class="alert alert-success alert-dismissible fade show mb-6" role="alert">
        {{ session('status') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif
