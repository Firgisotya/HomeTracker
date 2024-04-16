<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Traits\ApiResponse;
use Illuminate\Http\Response;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        try {
            $user = User::where('username', $request->username)->first();
            if(!$user){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Username tidak terdaftar'
                ], 401);
            }
            if(!Hash::check($request->password, $user->password)){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Password salah'
                ], 401);
            }
            $token = $user->createToken('token')->plainTextToken;
            return response()->json([
                'status' => 'success',
                'message' => 'Login berhasil',
                'data' => $user,
                'token' => $token
            ]);
        } catch (\Throwable $th) {
            throw new HttpResponseException($this->apiError(
                $th->getMessage(),
                Response::HTTP_UNAUTHORIZED
            ));
        }
    }

}
