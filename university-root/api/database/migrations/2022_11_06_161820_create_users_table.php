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
        Schema::create('users', function (Blueprint $table) {
            $table->uuid("id")->primary()->unique();
            $table->string("name", 256);
            $table->string("username", 256)->unique();
            $table->string("email", 256)->unique();
            $table->string("password");
            $table->timestamp("verified_at")->nullable();
            $table->timestamp("registered_at");
            $table->date("birthdate");
            $table->string("profile_photo_url");
            $table->uuid("category_id");

            $table->foreign('category_id')->references('id')->on('permission_categories')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
