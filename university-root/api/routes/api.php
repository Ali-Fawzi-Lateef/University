<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
// use App\Http\Controllers\AuthController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Route::middleware(['cors'])->group(function () {
//     Route::post('/login', [AuthController::class , 'login']);
// });

Route::group([

    'middleware' => 'cors',
    'namespace' => 'App\Http\Controllers',
    // 'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});
// !!!!!!!!!!!!!!!!!!!!!!!

Route::controller(UserController::class)->group(function () {
    Route::post('deleteUser', 'deleteUser');
});