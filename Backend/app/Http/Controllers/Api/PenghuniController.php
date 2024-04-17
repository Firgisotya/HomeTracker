<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PenghuniRequest;
use App\Models\Penghuni;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PenghuniController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $data = Penghuni::all();
            return response()->json([
                'status' => 'success',
                'message' => 'Data penghuni berhasil diambil',
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
    public function store(PenghuniRequest $request)
    {
        try {
            $data = $request->all();
            $data['foto_ktp'] = $request->file('foto_ktp')->store('foto_ktp', 'public');
            $penghuni = Penghuni::create($data);
            return response()->json([
                'status' => 'success',
                'message' => 'Data penghuni berhasil ditambahkan',
                'data' => $penghuni
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
     * @param  \App\Models\Penghuni  $penghuni
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $data = Penghuni::find($id);
            if(!$data){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data penghuni tidak ditemukan'
                ], 404);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Data penghuni berhasil diambil',
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
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Penghuni  $penghuni
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
     * @param  \App\Models\Penghuni  $penghuni
     * @return \Illuminate\Http\Response
     */
    public function update(PenghuniRequest $request, $id)
    {
        try {
            $data = Penghuni::find($id);

            if(!$data){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data penghuni tidak ditemukan'
                ], 404);
            }
            $data->nama_lengkap = $request->nama_lengkap;
            $data->jenis_kelamin = $request->jenis_kelamin;
            $data->no_telepon = $request->no_telepon;
            $data->status_penghuni = $request->status_penghuni;
            $data->status_pernikahan = $request->status_pernikahan;
            if ($request->hasFile('foto_ktp')) {
                // Delete old photo if it exists
                if ($data->foto_ktp) {
                    Storage::disk('public')->delete($data->foto_ktp);
                    $data->foto_ktp = $request->file('foto_ktp')->store('foto_ktp', 'public');
                } else {
                    $data->foto_ktp = $request->file('foto_ktp')->store('foto_ktp', 'public');
                }

            }
            $data->save();
            return response()->json([
                'status' => 'success',
                'message' => 'Data penghuni berhasil diubah',
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
     * @param  \App\Models\Penghuni  $penghuni
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $data = Penghuni::find($id);
            if(!$data){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data penghuni tidak ditemukan'
                ], 404);
            }
            $data->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Data penghuni berhasil dihapus'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
