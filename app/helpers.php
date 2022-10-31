<?php
use App\Eloquent\Repositories\ImageRepository;

if (!function_exists('imageUrl')) {
    function imageUrl(int $imageId)
    {
        /** @var \App\Eloquent\Models\Image $image */
        $image = app(ImageRepository::class)->findOrFail($imageId);

        return $image->url;
    }
}
