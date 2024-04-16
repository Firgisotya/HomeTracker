<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PembayaranSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('pembayaran')->insert([
            [
                'penghuni_id' => 1,
                'jenis_pembayaran' => 'iuran kebersihan',
                'jumlah_pembayaran' => 15000,
                'tanggal_pembayaran' => '2021-01-01',
                'periode_pembayaran' => 'bulan',
                'status_pembayaran' => 'lunas'
            ],
            [
                'penghuni_id' => 1,
                'jenis_pembayaran' => 'iuran satpam',
                'jumlah_pembayaran' => 100000,
                'tanggal_pembayaran' => '2021-01-01',
                'periode_pembayaran' => 'bulan',
                'status_pembayaran' => 'lunas'
            ],
            [
                'penghuni_id' => 2,
                'jenis_pembayaran' => 'iuran kebersihan',
                'jumlah_pembayaran' => 15000,
                'tanggal_pembayaran' => '2022-01-01',
                'periode_pembayaran' => 'bulan',
                'status_pembayaran' => 'lunas'
            ],
            [
                'penghuni_id' => 2,
                'jenis_pembayaran' => 'iuran satpam',
                'jumlah_pembayaran' => 100000,
                'tanggal_pembayaran' => '2022-01-01',
                'periode_pembayaran' => 'bulan',
                'status_pembayaran' => 'lunas'
            ],
            [
                'penghuni_id' => 3,
                'jenis_pembayaran' => 'iuran kebersihan',
                'jumlah_pembayaran' => 15000,
                'tanggal_pembayaran' => '2023-01-01',
                'periode_pembayaran' => 'bulan',
                'status_pembayaran' => 'lunas'
            ],
            [
                'penghuni_id' => 3,
                'jenis_pembayaran' => 'iuran satpam',
                'jumlah_pembayaran' => 100000,
                'tanggal_pembayaran' => '2023-01-01',
                'periode_pembayaran' => 'bulan',
                'status_pembayaran' => 'lunas'
            ],
        ]);
    }
}
