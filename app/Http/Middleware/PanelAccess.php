<?php

namespace App\Http\Middleware;

use Closure;
use Filament\Models\Contracts\FilamentUser;
use Illuminate\Http\Request;

class PanelAccess
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if ($user instanceof FilamentUser) {
            abort_if(!$user->canAccessFilament(), 403);
        }

        return $next($request);
    }
}
