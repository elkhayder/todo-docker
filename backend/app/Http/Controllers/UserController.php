<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{

    public function me(Request $request)
    {
        return new UserResource($request->user());
    }
  
    public function register(Request $request)
    {
        $validated = $request->validate([
            'username' => ['required', 'string', 'min:3', 'max:30', 'unique:users'],
            'password' => ['required', 'min:6']
        ]);

        $validated['password'] = Hash::make($validated['password']);

         User::create($validated);

        return $this->login($request);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'username' => ['required', 'string', 'min:3', 'max:30'],
            'password' => ['required', 'min:6']
        ]);

        $user = User::where('username', $validated['username'])->first();

        if(!$user) {
            throw ValidationException::withMessages([
                'username' => ['The provided username is incorrect.'],
            ]);
        }

        if(!Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'password' => ['The provided password is incorrect.'],
            ]);
        }

        return [
            'access_token' => $user->createToken('Auth ' . time())->plainTextToken,
            'user' => new UserResource($user->fresh())
        ];
    }
}
