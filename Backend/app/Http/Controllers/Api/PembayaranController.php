<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pembayaran;
use App\Models\ReportSummary;
use Illuminate\Http\Request;

class PembayaranController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $data = Pembayaran::with('penghuni')->get();
            return response()->json([
                'status' => 'success',
                'data' => $data
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $pembayaran = Pembayaran::create([
                'penghuni_id' => $request->penghuni_id,
                'jenis_pembayaran' => $request->jenis_pembayaran,
                'jumlah_pembayaran' => $request->jumlah_pembayaran,
                'tanggal_pembayaran' => $request->tanggal_pembayaran,
                'periode_pembayaran' => $request->periode_pembayaran,
                'status_pembayaran' => $request->status_pembayaran
            ]);

            // get bulan & tahun from tanggal_pembayaran
            $bulan = date('n', strtotime($request->tanggal_pembayaran));
            $tahun = date('Y', strtotime($request->tanggal_pembayaran));

            // Array nama bulan dalam bahasa Indonesia
            $nama_bulan = array(
                'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
            );

            // Ubah angka bulan menjadi nama bulan dalam bahasa Indonesia
            $bulan_indonesia = $nama_bulan[$bulan - 1]; // Karena array dimulai dari indeks 0

            // cek apakah sudah ada data pembayaran di bulan & tahun tersebut
            $cek_bulan_tahun_report = ReportSummary::where('bulan', $bulan_indonesia)->where('tahun', $tahun)->first();

            // jika belum ada, maka buat data baru
            if (!$cek_bulan_tahun_report) {
                ReportSummary::create([
                    'bulan' => $bulan_indonesia,
                    'tahun' => $tahun,
                    'pemasukan' => $pembayaran->jumlah_pembayaran,
                ]);
            } else {
                // jika sudah ada, maka update data yang sudah ada
                $cek_bulan_tahun_report->update([
                    'pemasukan' => $cek_bulan_tahun_report->pemasukan + $pembayaran->jumlah_pembayaran
                ]);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Data berhasil disimpan'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pembayaran  $pembayaran
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $data = Pembayaran::with('penghuni')->find($id);
            return response()->json([
                'status' => 'success',
                'data' => $data
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Pembayaran  $pembayaran
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pembayaran  $pembayaran
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pembayaran  $pembayaran
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            Pembayaran::find($id)->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Data berhasil dihapus'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }
}
