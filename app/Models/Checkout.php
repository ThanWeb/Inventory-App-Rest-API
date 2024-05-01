<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Checkout extends Model
{
    protected $table = 'checkouts';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = true;

    protected $fillable = [
        'owned_by',
        'total',
        'is_unpaid'
    ];

    public function carts():HasMany
    {
        return $this->hasMany(Cart::class, 'checkout_id', 'id');
    }
}
