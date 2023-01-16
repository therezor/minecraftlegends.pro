<?php

namespace App\Eloquent\Repositories;

use App\Eloquent\Models\Image;
use App\Eloquent\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Intervention\Image\Constraint;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image as Optimizer;
use Intervention\Image\Image as File;

class ImageRepository extends BaseRepository
{
    protected const MAX_WIDTH = 1280;
    protected const MAX_HEIGHT = 720;
    protected const QUALITY = 92;
    protected const FORMAT = 'jpg';
    protected const DISK = 'public';

    public function modelClass(): string
    {
        return Image::class;
    }

    public function upload(UploadedFile $uploadedFile, User $user): Image
    {
        $file = $this->encodeImage($uploadedFile, static::MAX_WIDTH, static::MAX_HEIGHT);

        return $this->createModel($file, $user);
    }

    public function fetch($url, User $user): Image
    {
        $file = $this->encodeImage($url, static::MAX_WIDTH, static::MAX_HEIGHT);

        return $this->createModel($file, $user);
    }

    public function delete($id): bool
    {
        /** @var Image $image */
        $image = $this->findOrFail($id);

        Storage::disk(static::DISK)->delete($image->directory . $image->filename);

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

    protected function createModel(File $file, User $user): Image
    {
        $today = now()->toDateString();
        $directory = "images/{$today}/";
        $filename = $this->uniqueFilename();

        Storage::disk(static::DISK)->put($directory . $filename, $file);

        return parent::create([
            'disk' => static::DISK,
            'directory' => $directory,
            'filename' => $filename,
            'user_id' => $user->id,
        ]);
    }
}
