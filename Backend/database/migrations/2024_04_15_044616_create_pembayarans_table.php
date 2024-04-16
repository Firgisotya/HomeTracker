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
            $table->foreignId('penghuni_id')->constrained('penghuni');
            $table->enum('jenis_pembayaran', ['iuran kebersihan', 'iuran keamanan']);
            $table->integer('jumlah_pembayaran');
            $table->date('tanggal_pembayaran');
            $table->enum('periode_pembayaran', ['bulan', 'tahun']);
            $table->enum('status_pembayaran', ['lunas', 'belum lunas']);
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
