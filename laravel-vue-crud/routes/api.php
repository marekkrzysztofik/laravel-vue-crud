<?php
   
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
//use App\Http\Controllers\ProdController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\API\AuthController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/getProducts', [ProductController::class, 'getProducts']);
Route::post('/addProduct', [ProductController::class, 'addProduct']); 
Route::get('/editProduct/{id}',[ProductController::class, 'editProduct']);
Route::post('/updateProduct/{id}', [ProductController::class, 'updateProduct']);
Route::get('/deleteProduct/{id}', [ProductController::class, 'deleteProduct']); 

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']); 