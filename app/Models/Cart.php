<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Cart extends Model
{
    protected $table = 'carts';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = true;

    protected $fillable = [
        'product_id',
        'checkout_id',
        'total'
    ];

    public function product():HasOne
    {
        return $this->hasOne(Checkout::class, 'id', 'product_id');
    }

    public function checkout():BelongsTo
    {
        return $this->belongsTo(Checkout::class, 'checkout_id', 'id');
    }
}
