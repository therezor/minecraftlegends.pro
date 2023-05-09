<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blog_categories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('layout_id')->index();

            $table->string('name');
            $table->unsignedSmallInteger('display_order')->default(0)->index();
            $table->text('description')->fullText()->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('layout_id')->references('id')->on('layouts')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
    }
};
