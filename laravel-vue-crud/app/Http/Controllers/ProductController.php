<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Intervention\Image\Facades\Image;

$name = time() . ".png";

class ProductController extends Controller
{
    public function getProducts()
    {
        return Product::all();
    }
    
    public function addProduct(Request $request)
    {  
        
        $product = new Product();
        $product->name = $request->name;
        $product->description = $request->description;
        if ($request->photo) {
            $this->handlePhoto($request, $product);
        } else {
            $product->photo = "image.png";
        }
        $product->type = $request->type;
        $product->quantity = $request->quantity;
        $product->price = $request->price;
        $product->save();
    }

   
    public function editProduct($id)
    {
        return Product::find($id);
    }

    public function updateProduct(Request $request, $id)
    {
        global $name;
        $product = Product::find($id);
        $product->name = $request->name;
        $product->description = $request->description;
        if ($request->photo && $product->photo != $request->photo) {
            $this->handlePhoto($request, $product);
        } else {
           $name = $product->photo; 
        }
       // $product->photo = $name;
        $product->type = $request->type;
        $product->quantity = $request->quantity;
        $product->price = $request->price;
        $product->save();
     }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function deleteProduct($id)
    {
        $product = Product::findOrFail($id);
        $image_path = public_path() . "/upload/";
        $image = $image_path . $product->photo;
        if (file_exists($image)) {
            @unlink($image);
        }
        $product->delete();
    }

    public function handlePhoto(Request $request, $product)
    {
            $name = time() . ".png";
            $img = Image::make($request->photo)->resize(200, 200);
            $upload_path = public_path() . "/upload/";
            $image = $upload_path . $product->photo;
            $img->save($upload_path . $name);  
            $product->photo = $name; 
            if (file_exists($image)) {
                @unlink($image);
            }
            
    }
}
