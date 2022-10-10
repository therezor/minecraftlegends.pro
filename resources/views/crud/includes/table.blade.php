<table class="table table-hover">
    <thead class="table-light">
    <tr>
        @foreach($fields as $field)
            <th class="{{ $field->getMeta('list.class') }}" scope="col">
                @if($field->isSortable())
                    <a href="{{ $field->sortableUrl(request()) }}">
                        {{ $field->resolveLabel($emptyEntity) }}
                        @if($field->getSortDirection() === 'asc')
                            <i class="bi bi-sort-up-alt"></i>
                        @elseif($field->getSortDirection() === 'desc')
                            <i class="bi bi-sort-down"></i>
                        @else
                            <i class="bi bi-list"></i>
                        @endif
                    </a>
                @else
                    {{ $field->resolveLabel($emptyEntity) }}
                @endif
            </th>
        @endforeach
    </tr>
    </thead>
    <tbody>
    @forelse($entities as $entity)
        <tr>
            @foreach($fields as $field)
                <td class="{{ $field->getMeta('list.class') }}">
                    {{ $field->render($entity) }}
                </td>
            @endforeach
        </tr>
    @empty
        <tr>
            <td colspan="{{ count($fields) }}" class="text-center"><i>{{ trans('crud.empty_result') }}</i></td>
        </tr>
    @endforelse
    </tbody>
</table>
