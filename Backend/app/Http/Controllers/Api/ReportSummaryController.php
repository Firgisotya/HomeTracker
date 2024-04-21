<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\ReportSummary;
use Illuminate\Http\Request;

class ReportSummaryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $data = ReportSummary::all();
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ReportSummary  $reportSummary
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $data = ReportSummary::select('report_summary.*', 'penghuni_rumah.penghuni_id', 'penghuni_rumah.rumah_id', 'penghuni.nama_lengkap', 'rumah.nomor_rumah', 'pembayaran.*', 'pengeluaran.*')
                ->join('penghuni_rumah', 'report_summary.penghuni_rumah_id', '=', 'penghuni_rumah.id')
                ->join('penghuni', 'penghuni_rumah.penghuni_id', '=', 'penghuni.id')
                ->join('rumah', 'penghuni_rumah.rumah_id', '=', 'rumah.id')
                ->join('pembayaran', 'report_summary.pembayaran_id', '=', 'pembayaran.id')
                ->join('pengeluaran', 'report_summary.pengeluaran_id', '=', 'pengeluaran.id')
                ->where('report_summary.id', $id)
                ->first();
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
     * @param  \App\Models\ReportSummary  $reportSummary
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
     * @param  \App\Models\ReportSummary  $reportSummary
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ReportSummary  $reportSummary
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
