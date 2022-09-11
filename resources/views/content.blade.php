@extends('layouts.app')

@section('body')
    @include('sections.header')
    <!-- Header -->
    <header class="pt-5">
        <div class="container-xl">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a href="#" class="nav-link font-regular">Featured</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link font-regular">Trending</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link font-regular">Latest</a>
                </li>
            </ul>
       </div>
    </header>
    <!-- Main content -->
    <div class="py-5 container-xl">
        <div class="row">
            <main class="col-md-8">
                <div class="card mb-5">
                    <div class="card-body">
                        <h1>What to Give On Father’s Day</h1>

                        <img class="card-img my-4" src="https://carsbasics.com/wp-content/uploads/2022/07/How-To-Buy-And-Sell-Repossessed-Cars-640x385.jpg" alt="Card image cap">

                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable you need to be sure there isn't anything hidden in the middle of text.</p>
                    </div>

                    <div class="card-footer border-top">
                        <div class="row">
                            <div class="col-auto text-muted my-auto">
                                <i class="bi bi-person"></i> <a href="#">Robert Fox</a>
                                &bull;
                                <i class="bi bi-clock"></i> 1 hr ago
                                &bull;
                                <i class="bi bi-folder"></i> <a href="#">Category</a>
                            </div>
                            <div class="mt-4 mt-md-0 col-12 col-md-auto ms-auto">
                                <a class="btn btn-neutral me-4" href="#" title="Share">
                                    <i class="bi bi-box-arrow-up-right"></i> Share
                                </a>
                                <a class="btn btn-square btn-neutral text-opacity-100-hover text-success-hover" href="#" title="Vote up">
                                    <i class="bi bi-hand-thumbs-up"></i>
                                </a>
                                <span type="button" class="btn btn-square btn-success disabled">215</span>
                                <a class="btn btn-square btn-neutral text-opacity-100-hover text-danger-hover" href="#" title="Vote down">
                                    <i class="bi bi-hand-thumbs-down"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <aside class="col-md-4">
                @include('sections.sidebar')
            </aside>
        </div>
    </div>

    @include('sections.footer')
@endsection
