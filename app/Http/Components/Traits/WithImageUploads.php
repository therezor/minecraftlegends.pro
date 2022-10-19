<?php

namespace App\Http\Components\Traits;

use App\Eloquent\Repositories\ImageRepository;
use Illuminate\Validation\ValidationException;
use Livewire\FileUploadConfiguration;
use Facades\Livewire\GenerateSignedUploadUrl;

trait WithImageUploads
{
    protected ImageRepository $imageRepository;

    public function startUpload($name, $fileInfo, $isMultiple)
    {
        $this->emit('upload:generatedSignedUrl', $name, GenerateSignedUploadUrl::forLocal())->self();
    }

    public function finishUpload($name, $tmpPath, $isMultiple)
    {
        foreach ($tmpPath as $path) {
            $images = [];
            $path = storage_path('app/' . FileUploadConfiguration::directory() . $path);
            $images[] = $this->imageRepository->uploadFromPath($path, auth()->user())->id;
        }

        $this->emit('upload:finished', $name, $images)->self();
        $this->syncInput($name, $isMultiple ? $images : $images[0]);
    }

    public function uploadErrored($name, $errorsInJson, $isMultiple) {
        $this->emit('upload:errored', $name)->self();

        if (null === $errorsInJson) {
            // Handle any translations/custom names
            $translator = app()->make('translator');

            $attribute = $translator->get("validation.attributes.{$name}");
            if ($attribute === "validation.attributes.{$name}") $attribute = $name;

            $message = trans('validation.uploaded', ['attribute' => $attribute]);
            if ($message === 'validation.uploaded') $message = "The {$name} failed to upload.";

            throw ValidationException::withMessages([$name => $message]);
        }

        $errorsInJson = $isMultiple
            ? str_ireplace('files', $name, $errorsInJson)
            : str_ireplace('files.0', $name, $errorsInJson);

        $errors = json_decode($errorsInJson, true)['errors'];

        throw (ValidationException::withMessages($errors));
    }

    public function removeImage($name)
    {
        $imageId = $this->getPropertyValue($name);

        $this->imageRepository->delete($imageId);

        $this->syncInput($name, null);
    }
}
