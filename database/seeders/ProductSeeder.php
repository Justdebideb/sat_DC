<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $lifestyle = Category::where('name', 'Lifestyle')->first();
        $running = Category::where('name', 'Running')->first();
        $basketball = Category::where('name', 'Basketball')->first();

        $products = [
            // Lifestyle Products
            [
                'category_id' => $lifestyle->id,
                'name' => 'Air Max Crimson',
                'description' => 'Bold style and revolutionary comfort for your everyday rotation. Features advanced cushioning and breathable mesh uppers. Perfect for the street or the track.',
                'price' => 150.00,
                'stock' => 12,
                'image' => 'air-max-crimson.jpg'
            ],
            [
                'category_id' => $lifestyle->id,
                'name' => 'Oreo Dunk Low',
                'description' => 'Classic basketball silhouette meets modern street style. The iconic Dunk Low gets a fresh update with premium materials.',
                'price' => 120.00,
                'stock' => 8,
                'image' => 'oreo-dunk-low.jpg'
            ],
            [
                'category_id' => $lifestyle->id,
                'name' => 'Neon Velocity',
                'description' => 'Stand out from the crowd with these eye-catching sneakers. Featuring vibrant neon accents and superior comfort.',
                'price' => 180.00,
                'stock' => 15,
                'image' => 'neon-velocity.jpg'
            ],
            [
                'category_id' => $lifestyle->id,
                'name' => 'Classic White',
                'description' => 'Timeless design meets modern comfort. The perfect white sneaker for any outfit.',
                'price' => 95.00,
                'stock' => 20,
                'image' => 'classic-white.jpg'
            ],

            // Running Products
            [
                'category_id' => $running->id,
                'name' => 'Zoom Elite',
                'description' => 'Ultra-lightweight performance running shoe with responsive cushioning and breathable upper.',
                'price' => 160.00,
                'stock' => 10,
                'image' => 'zoom-elite.jpg'
            ],
            [
                'category_id' => $running->id,
                'name' => 'Air Turbo',
                'description' => 'Maximum cushioning for long-distance running. Features revolutionary air technology.',
                'price' => 200.00,
                'stock' => 6,
                'image' => 'air-turbo.jpg'
            ],
            [
                'category_id' => $running->id,
                'name' => 'Swift Runner',
                'description' => 'Lightweight and responsive, perfect for speed training and daily runs.',
                'price' => 130.00,
                'stock' => 18,
                'image' => 'swift-runner.jpg'
            ],

            // Basketball Products
            [
                'category_id' => $basketball->id,
                'name' => 'Court Dominator',
                'description' => 'High-performance basketball shoe with superior ankle support and traction.',
                'price' => 175.00,
                'stock' => 9,
                'image' => 'court-dominator.jpg'
            ],
            [
                'category_id' => $basketball->id,
                'name' => 'Sky High',
                'description' => 'Elevate your game with maximum cushioning and responsive energy return.',
                'price' => 190.00,
                'stock' => 7,
                'image' => 'sky-high.jpg'
            ],
            [
                'category_id' => $basketball->id,
                'name' => 'Power Dunk',
                'description' => 'Explosive performance shoe designed for powerful players and high-flying dunks.',
                'price' => 165.00,
                'stock' => 11,
                'image' => 'power-dunk.jpg'
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
