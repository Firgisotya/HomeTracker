<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportSummary extends Model
{
    use HasFactory;
    protected $table = 'report_summary';
    protected $guarded = ['id'];

    public function pengeluaran()
    {
        return $this->hasMany(Pengeluaran::class, 'report_id');
    }
}
