<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => ['api', 'cors'],
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);

});

Route::group(['middleware' => ['auth:sanctum','abilities:admin']], function () {
    Route::get('/index', [UserController::class, 'getAllUsers']);
    Route::post('/deleteUser', [UserController::class, 'deleteUser']);
    Route::post('admin/logout', [AuthController::class, 'logout']);
    Route::post('/addUser', [UserController::class, 'addUser']);
    Route::post('/editUser', [UserController::class, 'editUser']);
});
Route::group(['middleware' => ['auth:sanctum','abilities:teacher']], function () {
    Route::post('teacher/logout', [AuthController::class, 'logout']);
    Route::get('getStudentGrades', [TeacherController::class, 'getStudentGrades']);
    Route::post('manageGrades',[TeacherController::class, 'manageGrades']);
});
Route::group(['middleware' => ['auth:sanctum','abilities:student']], function () {
    Route::post('student/logout', [AuthController::class, 'logout']);
    Route::get('getGrades', [StudentController::class, 'getGrades']);
});
