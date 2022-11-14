<?php
  
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductControl;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\API\AuthController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::resource('getProducts', ProductController::class);


Route::get('/getProducts', [ProductController::class, 'getProducts']);
Route::post('/addProduct', [ProductController::class, 'add_product']); 
Route::get('/get_edit_product/{id}',[ProductController::class, 'get_edit_product']);
Route::post('/update_product/{id}', [ProductController::class, 'update_product']);
Route::get('/delete_product/{id}', [ProductController::class, 'delete_product']);

Route::post('Register', [AuthController::class, 'register']);
Route::post('Login', [AuthController::class, 'login']);