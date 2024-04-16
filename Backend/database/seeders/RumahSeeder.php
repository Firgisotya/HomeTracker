<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RumahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('rumah')->insert([
            [
                'nomor_rumah' => 'A1',
                'status_rumah' => 'dihuni'
            ],
            [
                'nomor_rumah' => 'B1',
                'status_rumah' => 'tidak dihuni'
            ],
            [
                'nomor_rumah' => 'C1',
                'status_rumah' => 'dihuni'
            ],
        ]);
    }
}
