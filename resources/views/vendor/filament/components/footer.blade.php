{{ \Filament\Facades\Filament::renderHook('footer.before') }}

<div class="filament-footer flex items-center justify-center">
    {{ \Filament\Facades\Filament::renderHook('footer.start') }}

    @if (config('filament.layout.footer.should_show_logo') && $logo = setting('logo'))
        <a
            href="{{ route('index') }}"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-300 hover:text-primary-500 transition"
        >
            <img src="{{ Storage::disk('public')->url($logo) }}" class="h-6 sm:h-9" alt="{{ config('app.name') }}" />
        </a>
    @endif

    {{ \Filament\Facades\Filament::renderHook('footer.end') }}
</div>

{{ \Filament\Facades\Filament::renderHook('footer.after') }}
