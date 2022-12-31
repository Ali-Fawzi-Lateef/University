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
        Schema::create('quiz_scores', function (Blueprint $table) {
            $table->id();
            $table->float('score');
            $table->unsignedBigInteger('quizzes_id');
            $table->unsignedBigInteger('students_id');
            $table->foreign('quizzes_id')->references('id')->on('quizzes')
            ->onDelete('cascade');
            $table->foreign('students_id')->references('id')->on('students')
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
        Schema::dropIfExists('quiz_scores');
    }
};
