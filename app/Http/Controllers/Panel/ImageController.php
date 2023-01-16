<?php

namespace App\Http\Controllers\Panel;

use App\Eloquent\Repositories\ImageRepository;
use App\Http\Controllers\Controller;
use App\Http\Requests\ImageFetchRequest;
use App\Http\Requests\ImageUploadRequest;
use App\Http\Resources\ImageResource;

class ImageController extends Controller
{
    protected $repository;

    public function __construct(ImageRepository $repository)
    {
        $this->repository = $repository;
    }

    public function upload(ImageUploadRequest $request)
    {
        $file = $request->file('image');
        $image = $this->repository->upload($file, auth()->user());

        return response()->json([
            'success' => 1,
            'file' => ImageResource::make($image),
        ], 201);
    }

    public function fetch(ImageFetchRequest $request)
    {
        $url = $request->input('url');
        $image = $this->repository->fetch($url, auth()->user());

        return response()->json([
            'success' => 1,
            'file' => ImageResource::make($image),
        ], 201);
    }
}
