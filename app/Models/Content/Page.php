<?php

namespace App\Models\Content;

use App\Eloquent\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Page extends Model
{
    use HasUuids;
    use SoftDeletes;

    protected $table = 'pages';

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'content',
        'meta_image',
        'meta_title',
        'meta_description',
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
