<blockquote @class(['text-center' => ($data['alignment'] === 'center')])>
    {{ $data['text'] }}
    @if($data['caption'])
        <footer>
            <cite>{{ $data['caption'] }}</cite>
        </footer>
    @endif
</blockquote>
