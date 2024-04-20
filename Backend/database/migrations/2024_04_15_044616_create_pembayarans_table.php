<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pembayaran', function (Blueprint $table) {
            $table->id();
            $table->foreignId('penghuni_rumah_id')->constrained('penghuni_rumah');
            $table->enum('jenis_pembayaran', ['Iuran Kebersihan', 'Iuran Keamanan']);
            $table->integer('jumlah_pembayaran');
            $table->date('tanggal_pembayaran');
            $table->enum('periode_pembayaran', ['Bulan', 'Tahun']);
            $table->enum('status_pembayaran', ['Lunas', 'Belum Lunas']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pembayarans');
    }
};
