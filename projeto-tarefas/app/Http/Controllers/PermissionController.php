<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function givePermission(Request $request)
    {

        if(auth()->user()->role !== 'admin'){
            return response()->json([
                'message' => 'nao autorizado'
            ], 403);
        }

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'permission' => 'required|in:admin,user'
        ]);

        $user = User::findOrFail($validated['user_id']);
        $user->role = $validated['permission'];
        $user->save();

        return response()->json([
            'user' => $user,
            'permission' => $validated['permission']
        ]);
    }
}
