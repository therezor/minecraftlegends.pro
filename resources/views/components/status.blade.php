@if(session('status'))
    <div class="alert fade show bg-success text-white border-success d-flex align-items-center mb-5" role="alert">
        <div class="flex-fill">
            {{ session('status') }}
        </div>
        <i class="bi bi-x-lg ms-2 text-opacity-70-hover cursor-pointer flex-shrink-0 h2 text-white fs-4" data-bs-dismiss="alert" aria-label="Close"></i>
    </div>
@endif
