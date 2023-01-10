<?php

namespace App\Http\Resources;

use App\Eloquent\Models\Image;
use Illuminate\Http\Resources\Json\JsonResource;

class ImageResource extends JsonResource
{
    public function __construct(Image $resource)
    {
        parent::__construct($resource);
    }

    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'           => $this->resource->id,
            'url'          => $this->resource->url,
        ];
    }
}
