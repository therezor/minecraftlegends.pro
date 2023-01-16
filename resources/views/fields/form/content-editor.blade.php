@if($showLabel && $showField)
    @if ($options['wrapper'] !== false)
    <div {!! $options['wrapperAttrs'] !!} >
    @endif
@endif

@if($showLabel && $options['label'] !== false && $options['label_show'])
    {{ Form::customLabel($name, $options['label'], $options['label_attr']) }}
@endif

@if ($showField)
    <div class="content-editor form-control" data-target="{{ "[name='$name']" }}" data-upload-url="{{ route('panel.images.upload') }}" data-fetch-url="{{ route('panel.images.fetch') }}"></div>

    {!! Form::hidden($name, $options['value'], $options['attr']) !!}

    @include('fields.form.help-block')

@endif

@include('fields.form.errors')

@if($showLabel && $showField)
    @if($options['wrapper'] !== false)
    </div>
    @endif
@endif
