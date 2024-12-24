<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'email' => 'required|string|email|unique:users',
            'name' => 'required|string',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->markEmailAsVerified();

        return response()->json([
            'user' => $user
        ]);
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();
        
        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json(['message' => 'nâo autorizado'], 401);
        }
        
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'email' => $request->email,
            'token' => $token
        ]);
    }

    public function logout(Request $request){
        $token = $request->user()->currentAccessToken();
        $token->delete();
        return response()->json([
            'message' => 'Logout com sucesso'
        ]);
    }
}
