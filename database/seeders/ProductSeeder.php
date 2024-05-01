<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Ramsey\Uuid\Rfc4122\UuidV4;

class ProductSeeder extends Seeder
    {
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::query()->first();

        $products = [
            [
                'id' => UuidV4::uuid4()->toString(),
                'owned_by' => $user->id,
                'last_updated_by' => $user->id,
                'name' => 'Hoodie KKK',
                'capital_price' => 200000,
                'sell_price' => 300000,
                'stock' => 20,
                'unit' => 'pcs',
                'is_deleted' => false
            ],
            [
                'id' => UuidV4::uuid4()->toString(),
                'owned_by' => $user->id,
                'last_updated_by' => $user->id,
                'name' => 'Gigi Minotaur',
                'capital_price' => 5000000,
                'sell_price' => 10000000,
                'stock' => 2,
                'unit' => 'pcs',
                'is_deleted' => false
            ],
            [
                'id' => UuidV4::uuid4()->toString(),
                'owned_by' => $user->id,
                'last_updated_by' => $user->id,
                'name' => 'Bunga Bankai',
                'capital_price' => 200000,
                'sell_price' => 350000,
                'stock' => 30,
                'unit' => 'tangkai',
                'is_deleted' => false
            ],
            [
                'id' => UuidV4::uuid4()->toString(),
                'owned_by' => $user->id,
                'last_updated_by' => $user->id,
                'name' => 'Dragon ball',
                'capital_price' => 1000000,
                'sell_price' => 3000000,
                'stock' => 7,
                'unit' => 'pcs',
                'is_deleted' => false
            ],
            [
                'id' => UuidV4::uuid4()->toString(),
                'owned_by' => $user->id,
                'last_updated_by' => $user->id,
                'name' => 'Death Note',
                'capital_price' => 10000000,
                'sell_price' => 20000000,
                'stock' => 1,
                'unit' => 'pcs',
                'is_deleted' => false
            ],
            [
                'id' => UuidV4::uuid4()->toString(),
                'owned_by' => $user->id,
                'last_updated_by' => $user->id,
                'name' => 'Pedang Kunasagi',
                'capital_price' => 150000,
                'sell_price' => 200000,
                'stock' => 10,
                'unit' => 'pcs',
                'is_deleted' => false
            ],
            [
                'id' => UuidV4::uuid4()->toString(),
                'owned_by' => $user->id,
                'last_updated_by' => $user->id,
                'name' => 'Buku Tulis Kiky 38',
                'capital_price' => 3000,
                'sell_price' => 4000,
                'stock' => 50,
                'unit' => 'pcs',
                'is_deleted' => false
            ],
            [
                'id' => UuidV4::uuid4()->toString(),
                'owned_by' => $user->id,
                'last_updated_by' => $user->id,
                'name' => 'Sky Guardian Helmet',
                'capital_price' => 3500,
                'sell_price' => 5000,
                'stock' => 35,
                'unit' => 'pcs',
                'is_deleted' => false
            ]
        ];

        foreach($products as $product){
            Product::create($product);
        }
    }
}
