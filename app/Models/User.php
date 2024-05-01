<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = true;

    protected $fillable = [
        'username',
        'password',
        'is_admin',
        'refresh_token'
    ];

    public function products():HasMany
    {
        return $this->hasMany(Product::class, 'owned_by', 'id');
    }

}
