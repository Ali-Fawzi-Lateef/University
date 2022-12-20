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
        Schema::create('quizzes', function (Blueprint $table) {
            $table->bigInteger('id')->primary();
            $table->timestamp('date');
            $table->string('name');
            $table->timestamp('quiz_time');
            $table->string('path_to_file');
            $table->string('file_type');
            $table->float('score');
            $table->bigInteger('curriculums_id');
            $table->foreign('curriculums_id')->references('id')->on('curriculums')
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
        Schema::dropIfExists('quizzes');
    }
};
