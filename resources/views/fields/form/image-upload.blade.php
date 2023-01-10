@if($showLabel && $showField)
    @if ($options['wrapper'] !== false)
    <div {!! $options['wrapperAttrs'] !!} >
    @endif
@endif

@if($showLabel && $options['label'] !== false && $options['label_show'])
    {{ Form::customLabel($name, $options['label'], $options['label_attr']) }}
@endif

@if ($showField)
    <img src="{{ $options['value'] }}" alt="{{ __('Uploaded image') }}" data-target="{{ "[name='$name']" }}" class="img-preview rounded img-thumbnail mb-2">

    {!! Form::file($name, $options['attr']) !!}

    @include('fields.form.help-block')

@endif

@include('fields.form.errors')

@if($showLabel && $showField)
    @if($options['wrapper'] !== false)
    </div>
    @endif
@endif
