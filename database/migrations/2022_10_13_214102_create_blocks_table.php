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
        Schema::create('blocks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('post_id')->index();
            $table->string('type');
            $table->unsignedSmallInteger('display_order')->default(0)->index();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->unsignedBigInteger('image_id')->index()->nullable();
            $table->json('data')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('image_id')->references('id')->on('images')->onDelete('set null');
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blocks');
    }
};
