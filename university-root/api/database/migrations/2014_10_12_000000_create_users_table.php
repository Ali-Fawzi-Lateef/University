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
            $table->bigInteger('id')->primary();
            $table->string("name");
            $table->string("username")->unique();
            $table->string("email")->unique();
            $table->string("password");
            $table->timestamp("verified_at")->nullable();
            $table->timestamp("registered_at");
            $table->date("birthdate")->nullable();
            $table->string("profile_photo_url")->nullable();
            $table->string("user_type")->nullable();
            $table->rememberToken();
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
