<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Lifestyle', 'description' => 'Casual and everyday wear sneakers'],
            ['name' => 'Running', 'description' => 'Performance running shoes'],
            ['name' => 'Basketball', 'description' => 'Basketball shoes and athletic footwear'],
            ['name' => 'Training', 'description' => 'Gym and training shoes'],
            ['name' => 'Skateboarding', 'description' => 'Skate shoes and casual streetwear'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
