<?php

namespace App\Http\Controllers;

use App\Eloquent\Repositories\ImageRepository;
use App\Http\Requests\ImageUploadRequest;
use App\Http\Resources\ImageResource;

class ImageController extends Controller
{
    protected $repository;

    public function __construct(ImageRepository $repository)
    {
        $this->repository = $repository;
    }

    public function store(ImageUploadRequest $request)
    {
        $file = $request->file('image');
        $image = $this->repository->upload($file, auth()->user());

        return response()->json(ImageResource::make($image), 201);
    }
}
