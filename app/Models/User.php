<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
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

    protected $hidden = [
        'password',
        'refresh_token',
    ];

    public function products():HasMany
    {
        return $this->hasMany(Product::class, 'owned_by', 'id');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
