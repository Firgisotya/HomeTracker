<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PembayaranController;
use App\Http\Controllers\Api\PengeluaranController;
use App\Http\Controllers\Api\PenghuniController;
use App\Http\Controllers\Api\PenghuniRumahController;
use App\Http\Controllers\Api\ReportSummaryController;
use App\Http\Controllers\Api\RumahController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('/auth')->group(function(){
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware('auth:sanctum')->group(function(){
    Route::apiResource('/penghuni', PenghuniController::class);
    Route::apiResource('/rumah', RumahController::class);
    Route::get('/rumah/{id}/history', [RumahController::class, 'history']);
    Route::apiResource('/penghuni_rumah', PenghuniRumahController::class);
    Route::apiResource('/pembayaran', PembayaranController::class);
    Route::get('/report_summary', [ReportSummaryController::class, 'index']);
    Route::apiResource('/pengeluaran', PengeluaranController::class);
});
