<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
            $table->uuid('product_id')->nullable(false);
            $table->uuid('checkout_id')->nullable(false);
            $table->integer('total')->nullable(false);
            $table->timestamps();

            $table->foreign('product_id')->on('products')->references('id');
            $table->foreign('checkout_id')->on('checkouts')->references('id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};
