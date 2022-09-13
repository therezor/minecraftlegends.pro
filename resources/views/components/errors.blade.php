@if ($errors->any())
    <div class="alert fade show bg-danger text-white border-danger d-flex align-items-center mb-5" role="alert">
        <div class="flex-fill">
            <ul class="ps-3 mb-0">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
        <i class="bi bi-x-lg ms-2 text-opacity-70-hover cursor-pointer flex-shrink-0 h2 text-white fs-4" data-bs-dismiss="alert" aria-label="Close"></i>
    </div>
@endif
