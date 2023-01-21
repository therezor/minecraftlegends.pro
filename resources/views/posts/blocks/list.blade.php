@if($data['style'] === 'ordered')
    <ol>
        @foreach($data['items'] as $item)
            <li>{{ $item }}</li>
        @endforeach
    </ol>
@else
    <ol>
        @foreach($data['items'] as $item)
            <li>{{ $item }}</li>
        @endforeach
    </ol>
@endif
