<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Rfc4122\UuidV4;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'id' => UuidV4::uuid4()->toString(),
            'username' => 'hansrio',
            'password' => Hash::make('12345678'),
            'is_admin' => true
        ]);
    }
}
