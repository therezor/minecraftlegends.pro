<figure @class(['text-center' => ($data['alignment'] === 'center')])>
    <blockquote class="blockquote">
        <p>{{ $data['text'] }}</p>
    </blockquote>
    @if($data['caption'])
        <figcaption class="blockquote-footer">
            {{ $data['caption'] }}
        </figcaption>
    @endif
</figure>
