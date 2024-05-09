<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function list(): JsonResponse
    {
        $venues = Product::query()->where('is_deleted', false);
        $venues = $venues->paginate();
        return response()->json(new ProductCollection($venues))->setStatusCode(200);
    }
}
