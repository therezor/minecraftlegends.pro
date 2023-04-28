<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('site.name', 'Site name');
        $this->migrator->add('site.locale', 'en');
        $this->migrator->add('site.favicon', '/img/favicon.png');
        $this->migrator->add('site.logo', '/img/logo.png');
        $this->migrator->add('site.active', true);
    }

    public function down(): void
    {
        $this->migrator->deleteIfExists('site.name');
        $this->migrator->deleteIfExists('site.locale');
        $this->migrator->deleteIfExists('site.favicon');
        $this->migrator->deleteIfExists('site.logo');
        $this->migrator->deleteIfExists('site.active');
    }
};
