<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Pengeluaran;
use App\Models\ReportSummary;
use Illuminate\Http\Request;

class PengeluaranController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $data = Pengeluaran::with('report')->get();
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
            $pengeluaran = Pengeluaran::create([
                'report_id' => $request->report_id,
                'jenis_pengeluaran' => $request->jenis_pengeluaran,
                'jumlah_pengeluaran' => $request->jumlah_pengeluaran,

            ]);
            $report = ReportSummary::where('id', $request->report_id)->first();
            $report->pengeluaran = $report->pengeluaran + $request->jumlah_pengeluaran;
            $report->save();
            return response()->json([
                'status' => 'success',
                'message' => 'Data berhasil disimpan',
                'data' => $report
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
     * @param  \App\Models\Pengeluaran  $pengeluaran
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $data = Pengeluaran::with('report')->find($id);
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
     * @param  \App\Models\Pengeluaran  $pengeluaran
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
     * @param  \App\Models\Pengeluaran  $pengeluaran
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            Pengeluaran::find($id)->update($request->all());
            ReportSummary::where('report_id', $request->report_id)->update([
                'pengeluaran' => $request->jumlah_pengeluaran
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Data berhasil diupdate'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pengeluaran  $pengeluaran
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            Pengeluaran::destroy($id);
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
