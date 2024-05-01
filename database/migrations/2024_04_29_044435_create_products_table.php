<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->uuid();
            $table->uuid('owned_by')->nullable(false);
            $table->uuid('last_updated_by')->nullable(false);
            $table->string('name', 255)->nullable(false)->unique('products_name_unique');
            $table->integer('capital_price')->nullable(false);
            $table->integer('sell_price')->nullable(false);
            $table->integer('stock')->nullable(false);
            $table->string('unit', 30)->nullable(false);
            $table->string('image', 255)->nullable(false);
            $table->boolean('is_deleted')->nullable(false)->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
