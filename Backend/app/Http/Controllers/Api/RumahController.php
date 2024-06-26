<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RumahRequest;
use App\Models\Pembayaran;
use App\Models\PenghuniRumah;
use App\Models\Rumah;
use Illuminate\Http\Request;

class RumahController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $data = PenghuniRumah::with('rumah', 'penghuni')->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Data rumah berhasil diambil',
                'data' => $data
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ], 500);
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
            $rumah = Rumah::create([
                'nomor_rumah' => $request->nomor_rumah,
                'status_rumah' => $request->status_rumah
            ]);
            if ($request->status_rumah == 'Dihuni') {
                PenghuniRumah::create([
                    'penghuni_id' => $request->penghuni_id,
                    'rumah_id' => $rumah->id,
                    'tanggal_masuk' => $request->tanggal_masuk
                ]);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Data rumah berhasil ditambahkan',
                'data' => $rumah
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Rumah  $rumah
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // current date
        $date = date('Y-m-d');
        try {
            $detail = PenghuniRumah::with('rumah', 'penghuni')
                ->where('rumah_id', $id)
                ->whereHas('rumah', function ($query) {
                    $query->where('status_rumah', 'Dihuni');
                })
                ->first();
            $history = Pembayaran::select('pembayaran.*', 'penghuni_rumah.*', 'rumah.*', 'penghuni.*')
                ->join('penghuni_rumah', 'penghuni_rumah.id', '=', 'pembayaran.penghuni_rumah_id')
                ->join('rumah', 'rumah.id', '=', 'penghuni_rumah.rumah_id')
                ->join('penghuni', 'penghuni.id', '=', 'penghuni_rumah.penghuni_id')
                ->where('penghuni_rumah.rumah_id', $id)
                ->get();
            if (!$detail) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data rumah tidak ditemukan'
                ], 404);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Data rumah berhasil diambil',
                'detail' => $detail,
                'history' => $history
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function history($id)
    {
        try {
            $data = PenghuniRumah::with('rumah', 'penghuni')
                ->where('rumah_id', $id)
                ->whereHas('rumah', function ($query) {
                    $query->where('status_rumah', 'Dihuni');
                })
                ->first();
            $history = PenghuniRumah::with('rumah', 'penghuni')->where('rumah_id', $id)->where('tanggal_keluar', '!=', null)->get();
            if (!$history) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data history tidak ditemukan'
                ], 404);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Data rumah berhasil diambil',
                'rumah' => $data,
                'history' => $history

            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Rumah  $rumah
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
     * @param  \App\Models\Rumah  $rumah
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $data = PenghuniRumah::with('rumah', 'penghuni')->where('rumah_id', $id)->first();
            if (!$data) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data rumah tidak ditemukan'
                ], 404);
            }
            Rumah::where('id', $id)->update([
                'nomor_rumah' => $request->nomor_rumah,
                'status_rumah' => $request->status_rumah
            ]);

            if ($request->status_rumah == 'Dihuni') {
                PenghuniRumah::where('rumah_id', $id)->update([
                    'penghuni_id' => $request->penghuni_id,
                    'rumah_id' => $id, // 'rumah_id' => $request->rumah_id,
                    'tanggal_masuk' => $request->tanggal_masuk,
                    'tanggal_keluar' => $request->tanggal_keluar
                ]);
            } else {
                PenghuniRumah::where('rumah_id', $id)->update([
                    'tanggal_keluar' => $request->tanggal_keluar
                ]);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Data rumah berhasil diubah',
                'data' => $data
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function updateStatusRumah($id)
    {
        try {
            $data = Rumah::where('id', $id)->update([
                'status_rumah' => 'Tidak Dihuni'
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Status rumah berhasil diubah',
                'data' => $data
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Rumah  $rumah
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $data = PenghuniRumah::with('rumah')->where('rumah_id', $id)->first();
            if (!$data) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data rumah tidak ditemukan'
                ], 404);
            }
            $data->delete();
            Rumah::where('id', $id)->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Data rumah berhasil dihapus'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
