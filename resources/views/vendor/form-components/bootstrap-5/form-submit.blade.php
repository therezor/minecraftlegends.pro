<button
    {!! $attributes->merge([
        'class' => 'btn btn-sm btn-primary',
        'type' => 'submit'
    ]) !!}
>
    {!! trim($slot) ?: __('Save') !!}
</button>
