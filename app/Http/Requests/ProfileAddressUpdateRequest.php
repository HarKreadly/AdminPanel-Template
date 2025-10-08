<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfileAddressUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "country"=> "nullable|string|max:255",
            "city"=> "nullable|string|max:255",
            "province"=> "nullable|string|max:255",
            "address"=> "nullable|string|max:500",
            "zip_code"=> "nullable|string|max:20",
            "time_zone"=> "nullable|string|max:100",
        ];
    }
}
