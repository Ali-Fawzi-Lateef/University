<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => ['api', 'cors'],
], function ($router) {
    Route::post('/register',[AuthController::class,'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::group(['middleware' => ['auth:sanctum','abilities:admin']], function () {
    Route::get('/index', [AdminController::class, 'index']);
    Route::post('/logout', [AuthController::class, 'logout']);
});