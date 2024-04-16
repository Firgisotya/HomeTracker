<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReportSummarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('report_summary')->insert([
            [
                'bulan' => 'Januari',
                'tahun' => '2021',
                'pemasukan' => 115000,
                'pengeluaran' => 4100000
            ],
            [
                'bulan' => 'Januari',
                'tahun' => '2022',
                'pemasukan' => 115000,
                'pengeluaran' => 0
            ],
            [
                'bulan' => 'Januari',
                'tahun' => '2023',
                'pemasukan' => 115000,
                'pengeluaran' => 0
            ],
        ]);
    }
}
