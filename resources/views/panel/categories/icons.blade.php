<div class="mb-4">
    {{ Form::customLabel($name, $options['label'], $options['label_attr']) }}
    <div class="input-group">
        <span id="icon-preview" class="input-group-text">
            @if($options['value'])
                <i class="{{ $options['value'] }}"></i>
            @endif
        </span>
        {{ Form::input($type, $name, $options['value'], $options['attr']) }}
    </div>

    <div class="row g-3 mt-3">
        @foreach($options['choices'] as $icon)
            <div class="col-md-2 col-4">
                <button class="form-item-click align-items-center justify-content-center form-control h-24 border-primary-hover"
                    onclick="document.querySelector('#icon').value = 'bi bi-{{ $icon }}'; document.querySelector('#icon-preview').innerHTML = '<i class=&quot;bi bi-{{ $icon }}&quot;></i>'; return false;">
                    <i class="bi bi-{{ $icon }} text-muted h2"></i>
                    <span class="text-muted text-xs d-block overflow-hidden">{{ $icon }}</span>
                </button>
            </div>
        @endforeach
    </div>
</div>
