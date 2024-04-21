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
                'jenis_pengeluaran' => 'Listrik Pos Satpam',
                'jumlah_pengeluaran' => 100000,
            ],
        ]);
    }
}
