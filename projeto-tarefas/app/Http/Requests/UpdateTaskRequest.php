<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
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
        $rules = [
            'name' => 'required',
            'description' => 'required',
            'status' => 'required|in:todo,in_progress,done',
        ];
        if($this->method() === 'PUT'){
            $rules['project_id'] = ['required', 'exists:projects,id'];
        }
        if($this->method() === 'PATCH'){
            $rules = array_map(fn($rule) => str_replace('required', 'sometimes', $rule), $rules);
        }
        return $rules;
    }
}