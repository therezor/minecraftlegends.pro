<?php

namespace App\Eloquent\Repositories;

use App\Eloquent\Models\Image;
use Illuminate\Support\Str;
use Intervention\Image\Constraint;
use Livewire\TemporaryUploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image as Optimizer;

class ImageRepository extends BaseRepository
{
    protected const MAX_WIDTH = 1280;
    protected const MAX_HEIGHT = 720;
    protected const THUMBNAIL_MAX_WIDTH = 640;
    protected const THUMBNAIL_MAX_HEIGHT = 360;
    protected const QUALITY = 92;
    protected const FORMAT = 'jpg';
    protected const DISK = 'public';

    public function modelClass(): string
    {
        return Image::class;
    }

    public function upload(TemporaryUploadedFile $file)
    {
        $big = $this->encodeImage($file, static::MAX_WIDTH, static::MAX_HEIGHT);
        $thumbnail = $this->encodeImage($file, static::THUMBNAIL_MAX_WIDTH, static::THUMBNAIL_MAX_HEIGHT);

        $today = now()->toDateString();
        $directory = "images/{$today}/";
        $filename = $this->uniqueFilename();

        Storage::disk(static::DISK)->put($directory . $filename, $big);
        Storage::disk(static::DISK)->put($directory . 'thumbnail_' . $filename, $thumbnail);

        return parent::create([
            'disk' => static::DISK,
            'directory' => $directory,
            'filename' => $filename,
        ]);
    }

    public function delete($id): bool
    {
        /** @var Image $image */
        $image = $this->findOrFail($id);

        Storage::disk(static::DISK)->delete($image->directory . $image->filename);
        Storage::disk(static::DISK)->delete($image->directory . 'thumbnail_' . $image->filename);

        return parent::delete($id);
    }


    protected function encodeImage($file, $width, $height)
    {
        return Optimizer::make($file)
            ->fit($width, $height, function (Constraint $constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            })->encode(static::FORMAT, static::QUALITY);
    }

    protected function uniqueFilename()
    {
        return str_replace('.', '_', uniqid()) . Str::start(static::FORMAT, '.');
    }
}
