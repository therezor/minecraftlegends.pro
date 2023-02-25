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
        Schema::create('posts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id')->index();
            $table->tinyInteger('featured')->unsigned()->index()->default(0)->nullable();
            $table->tinyInteger('status')->unsigned()->index()->default(0)->nullable();
            $table->uuid('category_id')->nullable()->index();

            $table->uuid('image_id')->index()->nullable();
            $table->string('title')->fullText();
            $table->string('slug')->index();
            $table->text('description')->fullText()->nullable();

            $table->uuid('meta_image_id')->index()->nullable();
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();

            $table->json('content');

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('category_id')->references('id')->on('post_categories')->onDelete('set null');
            $table->foreign('image_id')->references('id')->on('images')->onDelete('set null');
            $table->foreign('meta_image_id')->references('id')->on('images')->onDelete('set null');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('discussions');
    }
};
