<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RumahRequest;
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
            $data = Rumah::all();
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
    public function store(RumahRequest $request)
    {
        try {
            $data = $request->all();
            $rumah = Rumah::create($data);
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
        try {
            $data = Rumah::find($id);
            if(!$data){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data rumah tidak ditemukan'
                ], 404);
            }
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
    public function update(RumahRequest $request, $id)
    {
        try {
            $data = Rumah::find($id);
            if(!$data){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data rumah tidak ditemukan'
                ], 404);
            }
            $data->update($request->all());
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Rumah  $rumah
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $data = Rumah::find($id);
            if(!$data){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data rumah tidak ditemukan'
                ], 404);
            }
            $data->delete();
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
