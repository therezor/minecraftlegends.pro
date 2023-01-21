<picture @class(['text-center', 'bg-body-extra-light' => $data['withBackground']])>
    <img @class(['mw-100', 'img-fluid' => $data['stretched'], 'img-thumbnail' => $data['withBorder']]) src="{{ $data['file']['url'] }}" alt="{{ $data['caption'] }}" loading="lazy">
</picture>
