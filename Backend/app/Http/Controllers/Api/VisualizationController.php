<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pembayaran;
use App\Models\Pengeluaran;
use App\Models\Penghuni;
use App\Models\ReportSummary;
use App\Models\Rumah;
use Illuminate\Http\Request;

class VisualizationController extends Controller
{
    public function countAllSections()
    {
        $penghuni = Penghuni::count();
        $rumah = Rumah::count();
        $pembayaran = Pembayaran::count();
        $pengeluaran = Pengeluaran::count();

        try {
            return response()->json([
                'totalPenghuni' => $penghuni,
                'totalRumah' => $rumah,
                'totalPembayaran' => $pembayaran,
                'totalPengeluaran' => $pengeluaran,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Failed to get data',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function reportTransaction()
    {
        try {
            $report_summary = ReportSummary::select('bulan', 'tahun', 'pemasukan', 'pengeluaran')
            ->where('tahun', '2024')
            ->get();

            // Menghitung saldo awal (sisa saldo sebelumnya), misalnya dari database atau dapat juga dihitung dari array report_summary yang sebelumnya sudah disort berdasarkan tahun dan bulan.
            $saldo_awal = 0;

            // Looping untuk setiap data report summary
            foreach ($report_summary as $data) {
                $sisa_saldo = $data->pemasukan - $data->pengeluaran;

                // Menambahkan sisa saldo ke data report summary
                $data->sisa_saldo = $sisa_saldo;
            }

            return response()->json([
                'message' => 'Success get data',
                'data' => $report_summary,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Failed to get data',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
}
