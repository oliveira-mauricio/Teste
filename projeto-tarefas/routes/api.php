<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Middleware\IsAdmin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [LoginController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [LoginController::class, 'logout']);
Route::post('/register', [LoginController::class, 'register']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function() {
    Route::resource('/projects', ProjectController::class)->parameter('', 'project');
    Route::resource('/tasks', TaskController::class)->parameter('', 'task');
    Route::post('/give-permission', [PermissionController::class, 'givePermission']);
    Route::get('/users', function(Request $request){
        if(auth()->user()->role !== 'admin'){
            return response()->json(['message' => 'nao autorizado'], 403);
        }
        return response()->json([
            'users' => User::all()
        ]);
    });
});