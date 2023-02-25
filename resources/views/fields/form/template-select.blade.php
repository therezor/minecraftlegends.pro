@if($showLabel && $showField)
    @if ($options['wrapper'] !== false)
    <div {!! $options['wrapperAttrs'] !!} >
    @endif
@endif

@if ($showField)
    @foreach($options['choices'] as $template)
        <div class="form-check form-block">
            {{ Form::radio($name, $template, $template === $options['value'], ['id' => $name . '-' . $template, 'class' => 'form-check-input']) }}
            <label class="form-check-label" for="{{ $name . '-' . $template }}">
                <img class="rounded w-100" src="{{ asset('img/image-default.png') }}" alt="{{ $template }}">
            </label>
        </div>
    @endforeach

    @include('fields.form.help-block')
@endif

@include('fields.form.errors')

@if($showLabel && $showField)
    @if($options['wrapper'] !== false)
    </div>
    @endif
@endif
