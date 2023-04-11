<x-tables::actions.action
    :action="$action"
    component="tables::button"
    :outlined="$isOutlined()"
    :icon-position="$getIconPosition()"
    :label-sr-only="$isLabelHidden()"
    class="filament-tables-button-action"
>
    {{ $getLabel() }}
</x-tables::actions.action>
