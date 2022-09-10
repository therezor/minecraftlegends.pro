<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        @vite('resources/css/app.scss')
    </head>
    <body class="bg-surface-secondary">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-0 py-3">
            <div class="container-xl">
                <!-- Navbar toggle -->
                <button class="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <!-- Logo -->
                <a class="navbar-brand" href="#">
                    <img src="https://preview.webpixels.io/web/img/logos/clever-light.svg" class="h-8" alt="...">
                </a>
                <!-- Avatar -->
                <div class="dropdown order order-lg-3 ms-lg-4">
                    <a class="d-block" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div class="avatar avatar-sm bg-warning rounded-circle text-white">
                            <img alt="..." src="https://images.unsplash.com/photo-1579463148228-138296ac3b98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80">
                        </div>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end">
                        <div class="dropdown-header">
                            <h6 class="text-overflow m-0">Welcome!</h6>
                        </div>
                        <a href="#!" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>My profile</span>
                        </a>
                        <a href="#!" class="dropdown-item">
                            <i class="ni ni-settings-gear-65"></i>
                            <span>Settings</span>
                        </a>
                        <a href="#!" class="dropdown-item">
                            <i class="ni ni-calendar-grid-58"></i>
                            <span>Activity</span>
                        </a>
                        <a href="#!" class="dropdown-item">
                            <i class="ni ni-support-16"></i>
                            <span>Support</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#!" class="dropdown-item">
                            <i class="ni ni-user-run"></i>
                            <span>Logout</span>
                        </a>
                    </div>
                </div>
                <!-- Collapse -->
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <!-- Nav -->
                    <div class="navbar-nav">
                        <a class="nav-item nav-link active" href="#" aria-current="page">Home</a>
                        <a class="nav-item nav-link" href="#">Product</a>
                        <a class="nav-item nav-link" href="#">Features</a>
                        <a class="nav-item nav-link" href="#">Pricing</a>
                    </div>
                    <!-- Right navigation -->
                    <div class="navbar-nav align-items-lg-center d-none d-lg-flex ms-lg-auto">
                        <a href="#" class="nav-link nav-link-icon px-3 position-relative">
                            <i class="bi bi-chat"></i>
                        </a>
                        <a href="#" class="nav-link nav-link-icon px-3 position-relative">
                            <i class="bi bi-bell"></i>
                            <span class="w-3 h-3 bg-warning rounded-circle position-absolute top-2 end-2 border-2 border-primary d-inline-block"></span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
        <!-- Header -->
        <header class="pt-5">
            <div class="container-xl">
                <div>
                    <div class="row align-items-center">
                        <div class="col-md-6 col-12 mb-3 mb-md-0">
                            <!-- Title -->
                            <h1 class="h2 mb-0 ls-tight">Application</h1>
                        </div>
                        <!-- Actions -->
                        <div class="col-md-6 col-12 text-md-end">
                            <div class="mx-n1">
                                <a href="#" class="btn d-inline-flex btn-sm btn-neutral border-base mx-1">
                <span class=" pe-2">
                  <i class="bi bi-pencil"></i>
                </span>
                                    <span>Edit</span>
                                </a>
                                <a href="#" class="btn d-inline-flex btn-sm btn-neutral border-base mx-1">
                <span class=" pe-2">
                  <i class="bi bi-eye"></i>
                </span>
                                    <span>View</span>
                                </a>
                                <a href="#" class="btn d-inline-flex btn-sm btn-primary mx-1">
                <span class=" pe-2">
                  <i class="bi bi-cloud-download"></i>
                </span>
                                    <span>Download</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- Nav -->
                    <ul class="nav nav-tabs overflow-x mt-2">
                        <li class="nav-item">
                            <a href="#" class="nav-link font-regular active">Components</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link font-regular">Pages</a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        <!-- Main content -->
        <div class="py-5 container-xl">
            <div class="row">
                <main class="col-md-8">
                    <div class="card">
                        <img class="card-img-top" src="https://carsbasics.com/wp-content/uploads/2022/07/How-To-Buy-And-Sell-Repossessed-Cars-640x385.jpg" alt="Card image cap">

                        <div class="card-body">
                            <h2 class="mb-3">What to Give On Father’s Day</h2>
                            <a class="btn btn-sm btn-square btn-facebook" href="https://www.facebook.com/sharer/sharer.php?u=https://css-pro.ru" rel="nofollow" target="_blank" title="Share with Facebook">
                                <i class="bi bi-facebook"></i>
                            </a>
                            <a class="btn btn-sm btn-square btn-twitter" href="https://twitter.com/intent/tweet?url=https://css-pro.ru&text=custom share title" rel="nofollow" target="_blank" title="Share on Twitter">
                                <i class="bi bi-twitter"></i>
                            </a>
                            <a class="btn btn-sm btn-round btn-pinterest" href="http://pinterest.com/pin/create/button/?url=https://css-pro.ru&media=https://css-pro.ru/_nw/3/37167338.png" rel="nofollow" target="_blank" title="Share on Pinterest">
                                <i class="bi bi-pinterest"></i>
                            </a>
                            <p class="lh-relaxed mb-4">
                                As with any loved one, when an important date arrives such as their birthday or a holiday such as mother's day or, in this case, father's day. It is difficult for us to find the perfect gift for that person. Which...
                            </p>

                            <hr class="my-3">
                            <div class="row">
                                <div class="col-auto">
                                    <a class="btn btn-sm btn-square btn-neutral text-opacity-100-hover text-success-hover" href="#" title="Vote up">
                                        <i class="bi bi-hand-thumbs-up"></i>
                                    </a>
                                    <span type="button" class="btn btn-sm btn-square btn-success disabled">215</span>
                                    <a class="btn btn-sm btn-square btn-neutral text-opacity-100-hover text-danger-hover" href="#" title="Vote down">
                                        <i class="bi bi-hand-thumbs-down"></i>
                                    </a>
                                    <a class="btn btn-sm btn-neutral" href="#" title="Vote up">
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
                </main>
                <aside class="col-md-4">
                    <div><h5>Categories</h5>
                        <div class="vstack gap-3 mt-4">
                            <div class="form-item-checkable"><input class="form-item-check" type="radio"
                                                                    name="filter-category" id="filter-category-1">
                                <label class="item w-full" for="filter-category-1"><span
                                        class="form-item-click d-flex align-items-center border border-primary-hover text-heading p-3 rounded-2"><i
                                            class="bi bi-bar-chart-line text-lg me-3"></i> <span
                                            class="text-body text-sm font-semibold">Analytics</span></span></label>
                            </div>
                            <div class="form-item-checkable"><input class="form-item-check" type="radio"
                                                                    name="filter-category" id="filter-category-2">
                                <label class="item w-full" for="filter-category-2"><span
                                        class="form-item-click d-flex align-items-center border border-primary-hover text-heading p-3 rounded-2"><i
                                            class="bi bi-body-text text-xl me-3"></i> <span
                                            class="text-body text-sm font-semibold">CMS</span></span></label></div>
                            <div class="form-item-checkable"><input class="form-item-check" type="radio"
                                                                    name="filter-category" id="filter-category-3">
                                <label class="item w-full" for="filter-category-3"><span
                                        class="form-item-click d-flex align-items-center border border-primary-hover text-heading p-3 rounded-2"><i
                                            class="bi bi-hdd-stack text-xl me-3"></i> <span
                                            class="text-body text-sm font-semibold">Database</span></span></label></div>
                            <div class="form-item-checkable"><input class="form-item-check" type="radio"
                                                                    name="filter-category" id="filter-category-4">
                                <label class="item w-full" for="filter-category-4"><span
                                        class="form-item-click d-flex align-items-center border border-primary-hover text-heading p-3 rounded-2"><i
                                            class="bi bi-cart-4 text-lg me-3"></i> <span
                                            class="text-body text-sm font-semibold">E-commerce</span></span></label>
                            </div>
                            <div class="form-item-checkable"><input class="form-item-check" type="radio"
                                                                    name="filter-category" id="filter-category-5">
                                <label class="item w-full" for="filter-category-5"><span
                                        class="form-item-click d-flex align-items-center border border-primary-hover text-heading p-3 rounded-2"><i
                                            class="bi bi-credit-card text-xl me-3"></i> <span
                                            class="text-body text-sm font-semibold">Payment</span></span></label></div>
                            <div class="form-item-checkable"><input class="form-item-check" type="radio"
                                                                    name="filter-category" id="filter-category-6">
                                <label class="item w-full" for="filter-category-6"><span
                                        class="form-item-click d-flex align-items-center border border-primary-hover text-heading p-3 rounded-2"><i
                                            class="bi bi-shield-check text-xl me-3"></i> <span
                                            class="text-body text-sm font-semibold">Security</span></span></label></div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>

        <footer class="py-5 container-xl">
            <div class="row align-items-center justify-content-md-between">
                <div class="col-md-6">
                    <div class="copyright text-sm text-center text-md-start">
                        &copy; 2021 <a href="#" class="h6 text-sm font-bold">Webpixels</a>. All rights reserved.
                    </div>
                </div>
                <div class="col-md-6">
                    <ul class="nav justify-content-center justify-content-md-end mt-3 mt-md-0 mx-n3">
                        <li class="nav-item">
                            <a class="nav-link text-opacity-75 text-white-hover" href="#">
                                Terms
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-opacity-75 text-white-hover" href="#">
                                Privacy
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-opacity-75 text-white-hover" href="#">
                                Cookies
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    </body>
</html>
