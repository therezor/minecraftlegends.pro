<?php

namespace App\Services;

use Filament\AvatarProviders\Contracts\AvatarProvider;
use Filament\Facades\Filament;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AvatarService implements AvatarProvider
{
    public function get(Model $user): string
    {
        if ($user->profile_image) {
            return Storage::disk('public')->url($user->profile_image);
        }

        $name = Str::of(Filament::getUserName($user))
            ->trim()
            ->explode(' ')
            ->map(fn (string $segment): string => filled($segment) ? mb_substr($segment, 0, 1) : '')
            ->join(' ');

        return 'https://ui-avatars.com/api/?name=' . urlencode($name) . '&color=FFFFFF&background=111827';
    }
}
