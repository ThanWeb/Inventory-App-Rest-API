<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $table = 'products';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = true;

    public function owner():BelongsTo
    {
        return $this->belongsTo(User::class, 'owned_by', 'id');
    }
}
