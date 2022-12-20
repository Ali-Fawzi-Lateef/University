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
        Schema::create('course_curricula', function (Blueprint $table) {
            $table->bigInteger('id')->primary();
            $table->unsignedDecimal('stage');
            $table->bigInteger('students_id');
            $table->foreign('students_id')->references('id')->on('students')
            ->onDelete('cascade');
            $table->bigInteger('teachers_id');
            $table->foreign('teachers_id')->references('id')->on('teachers')
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
        Schema::dropIfExists('course_curricula');
    }
};
