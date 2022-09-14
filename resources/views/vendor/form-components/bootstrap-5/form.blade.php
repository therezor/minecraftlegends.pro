<form
    method="{{ $spoofMethod ? 'POST' : $method }}"
    {!! $attributes->merge(['class' => $hasError() ? 'needs-validation' : '']) !!}
>

@unless(in_array($method, ['HEAD', 'GET', 'OPTIONS']))
    @csrf
@endunless

@if($spoofMethod)
    @method($method)
@endif

    {!! $slot !!}
</form>
