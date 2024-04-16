<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PenghuniRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'nama_lengkap' => 'required|string',
            'jenis_kelamin' => 'required|string',
            'no_telepon' => 'required|string',
            'status_penghuni' => 'required|string',
            'status_pernikahan' => 'required|string',
            'foto_ktp' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
}
