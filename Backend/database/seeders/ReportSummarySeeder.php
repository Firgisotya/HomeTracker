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
                'tahun' => '2024',
                'pemasukan' => 115000,
                'pengeluaran' => 55000
            ],
            [
                'bulan' => 'Febreari',
                'tahun' => '2024',
                'pemasukan' => 115000,
                'pengeluaran' => 0
            ],
            [
                'bulan' => 'Maret',
                'tahun' => '2024',
                'pemasukan' => 115000,
                'pengeluaran' => 0
            ],
            [
                'bulan' => 'April',
                'tahun' => '2024',
                'pemasukan' => 115000,
                'pengeluaran' => 0
            ],
            [
                'bulan' => 'Mei',
                'tahun' => '2024',
                'pemasukan' => 1150000,
                'pengeluaran' => 0
            ],
            [
                'bulan' => 'Juni',
                'tahun' => '2024',
                'pemasukan' => 2000000,
                'pengeluaran' => 0
            ],
            [
                'bulan' => 'Juli',
                'tahun' => '2024',
                'pemasukan' => 115000,
                'pengeluaran' => 0
            ],
            [
                'bulan' => 'Agustus',
                'tahun' => '2024',
                'pemasukan' => 115000,
                'pengeluaran' => 0
            ],
            [
                'bulan' => 'September',
                'tahun' => '2024',
                'pemasukan' => 115000,
                'pengeluaran' => 0
            ],
            [
                'bulan' => 'Oktober',
                'tahun' => '2024',
                'pemasukan' => 115000,
                'pengeluaran' => 0
            ],
            [
                'bulan' => 'November',
                'tahun' => '2024',
                'pemasukan' => 115000,
                'pengeluaran' => 0
            ],
            [
                'bulan' => 'Desember',
                'tahun' => '2024',
                'pemasukan' => 115000,
                'pengeluaran' => 0
            ],
        ]);
    }
}
