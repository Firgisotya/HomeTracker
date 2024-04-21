<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PenghuniRumahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('penghuni_rumah')->insert([
            [
                'penghuni_id' => 1,
                'rumah_id' => 1,
                'tanggal_masuk' => '2021-01-01',
                'tanggal_keluar' => '2021-12-31'
            ],
            [
                'penghuni_id' => 2,
                'rumah_id' => 2,
                'tanggal_masuk' => '2022-01-01',
                'tanggal_keluar' => '2022-12-31'
            ],
            [
                'penghuni_id' => 3,
                'rumah_id' => 3,
                'tanggal_masuk' => '2023-01-01',
                'tanggal_keluar' => '2023-12-31'
            ],
        ]);
    }
}
