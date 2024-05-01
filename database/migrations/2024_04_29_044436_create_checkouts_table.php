<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('checkouts', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
            $table->uuid('owned_by')->nullable(false);
            $table->integer('total')->nullable(false);
            $table->boolean('unpaid')->nullable(false)->default(true);
            $table->timestamps();

            $table->foreign('owned_by')->on('users')->references('id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('checkouts');
    }
};
