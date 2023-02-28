@extends($crud->layout())

@section('header', $crud->title())

@section('content')
    <div class="row">
        <div class="col-md-8">
            <div class="block block-rounded">
                <div class="block-header block-header-default">
                    <h3 class="block-title">{{ trans('crud.show') }}</h3>
                </div>
                <div class="block-content">
                    <article class="story">
                        <h1>{{ $entity->title }}</h1>

                        @foreach($entity->content->blocks() as $block)
                            @include('fields.blocks.' . $block['type'], ['data' => $block['data']])
                        @endforeach
                    </article>
                </div>
            </div>
        </div>
        @include('crud.includes.actions')
    </div>
@endsection
