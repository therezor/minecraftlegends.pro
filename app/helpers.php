<?php
use App\Eloquent\Repositories\ImageRepository;

if (!function_exists('imageUrl')) {
    function imageUrl(int $imageId)
    {
        return app(ImageRepository::class)->findOrFail($imageId)->url;
    }
}
