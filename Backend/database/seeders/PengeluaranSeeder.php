<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PengeluaranSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('pengeluaran')->insert([
            [
                'report_id' => 1,
                'jenis_pengeluaran' => 'gaji satpam',
                'jumlah_pengeluaran' => 4000000,
            ],
            [
                'report_id' => 1,
                'jenis_pengeluaran' => 'listrik pos satpam',
                'jumlah_pengeluaran' => 100000,
            ],
        ]);
    }
}
