<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PenghuniSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('penghuni')->insert([
            [
                'nama_lengkap' => 'Penghuni 1',
                'jenis_kelamin' => 'Laki-laki',
                'no_telepon' => '081234567890',
                'status_penghuni' => 'Kontrak',
                'status_pernikahan' => 'Belum Menikah',
                'foto_ktp' => 'penghuni1.jpg',
            ],
            [
                'nama_lengkap' => 'Penghuni 2',
                'jenis_kelamin' => 'Perempuan',
                'no_telepon' => '3473856',
                'status_penghuni' => 'Tetap',
                'status_pernikahan' => 'Menikah',
                'foto_ktp' => 'penghuni2.jpg',
            ],
            [
                'nama_lengkap' => 'Penghuni 3',
                'jenis_kelamin' => 'Laki-laki',
                'no_telepon' => '56079856',
                'status_penghuni' => 'Tetap',
                'status_pernikahan' => 'Menikah',
                'foto_ktp' => 'penghuni3.jpg',
            ],
        ]);
    }
}
