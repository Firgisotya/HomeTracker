<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rumah extends Model
{
    use HasFactory;
    protected $table = 'rumah';
    protected $guarded = ['id'];

    public function penghuni_rumah()
    {
        return $this->hasMany(PenghuniRumah::class, 'rumah_id');
    }
}
