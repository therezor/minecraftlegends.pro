@extends('layouts.app')

@section('body')
    @include('sections.header')
    <!-- Header -->
    <header class="pt-5">
        <div class="container-xl">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a href="#" class="nav-link font-regular active">Featured</a>
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
                    <a href="/content">
                        <img class="card-img-top" src="https://carsbasics.com/wp-content/uploads/2022/07/How-To-Buy-And-Sell-Repossessed-Cars-640x385.jpg" alt="Card image cap">
                    </a>

                    <div class="card-body">
                        <a href="/content">
                            <h2 class="text-primary-hover">What to Give On Father’s Day</h2>
                        </a>
                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable you need to be sure there isn't anything hidden in the middle of text.</p>
                    </div>

                    <div class="card-footer border-top">
                        <div class="row">
                            <div class="col-auto">
                                <a class="btn btn-sm btn-neutral" href="#" title="Comments">
                                    <i class="bi bi-chat-left-dots"></i> 10
                                </a>
                            </div>
                            <div class="col text-end">
                                <a class="btn btn-sm btn-neutral" href="#" title="Share">
                                    <i class="bi bi-box-arrow-up-right"></i> Share
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mb-5">
                    <div class="ratio ratio-16x9">
                        <iframe class="card-img-top" src="https://www.youtube.com/embed/rYSjFfCKoqI" allowfullscreen=""></iframe>
                    </div>
                    <div class="card-body">
                        <a href="/content">
                            <h2 class="text-primary-hover">What to Give On Father’s Day</h2>
                        </a>
                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable you need to be sure there isn't anything hidden in the middle of text.</p>
                    </div>
                    <div class="card-footer border-top">
                        <div class="row">
                            <div class="col-auto">
                                <a class="btn btn-sm btn-square btn-neutral text-opacity-100-hover text-success-hover" href="#" title="Vote up">
                                    <i class="bi bi-hand-thumbs-up"></i>
                                </a>
                                <span type="button" class="btn btn-sm btn-square btn-danger disabled">-3</span>
                                <a class="btn btn-sm btn-square btn-neutral text-opacity-100-hover text-danger-hover" href="#" title="Vote down">
                                    <i class="bi bi-hand-thumbs-down"></i>
                                </a>
                                <a class="btn btn-sm btn-neutral" href="#" title="Vote up">
                                    <i class="bi bi-chat-left-dots"></i> 0
                                </a>
                            </div>
                            <div class="col text-end">
                                <a class="btn btn-sm btn-neutral" href="#" title="Share">
                                    <i class="bi bi-box-arrow-up-right"></i> Share
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
