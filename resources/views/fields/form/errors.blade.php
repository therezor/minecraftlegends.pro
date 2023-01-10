@if($showError && isset($errors) && $errors->hasBag($errorBag))
    @foreach($errors->getBag($errorBag)->get($nameKey) as $err)
    <div {!! $options['errorAttrs'] !!}>{!! $err !!}</div>
    @endforeach
@endif
