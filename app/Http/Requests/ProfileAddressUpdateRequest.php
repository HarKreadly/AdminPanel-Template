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
            "country"=> "required|string|max:255",
            "city"=> "required|string|max:255",
            "province"=> "required|string|max:255",
            "address"=> "required|string|max:500",
        ];
    }
}
