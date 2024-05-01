<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    protected $table = 'products';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = true;

    protected $fillable = [
        'owned_by',
        'name',
        'capital_price',
        'sell_price',
        'stock',
        'unit',
        'image',
        'is_deleted'
    ];

    public function owner():BelongsTo
    {
        return $this->belongsTo(User::class, 'owned_by', 'id');
    }

    public function carts():BelongsToMany
    {
        return $this->belongsToMany(Cart::class, 'id', 'product_id');
    }

}
