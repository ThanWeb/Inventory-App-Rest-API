<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Models\User;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Resources\UserResource;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    public function login(UserLoginRequest $request)
    {
        $request->validated();
        $credentials = $request->only('username', 'password');

        $token = Auth::attempt($credentials);

        if (!$token) {
            throw new HttpResponseException(response([
                'errors' => [
                    'auth' => [
                            'Unauthorized.'
                        ]
                    ]
            ], 403));

        }

        $user = Auth::user();

        return response()->json([
            'message' => 'Login success.',
            'data' => new UserResource($user)
        ])->setStatusCode(200)->cookie(
            'token', $token, 30
        );
    }

    public function register(UserRegisterRequest $request){
        $request->validated();

        if (User::where([
            ['username', $request['username']],
            ['is_admin', true]
        ])->count() == 1) {
            throw new HttpResponseException(response([
                'errors' => [
                    'username' => [
                            'This username is already taken.'
                        ]
                    ]
            ], 400));
        }


        $user = User::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'is_admin' => true
        ]);

        return response()->json([
            'message' => 'Register success.',
            'data' => new UserResource($user)
        ])->setStatusCode(200);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'message' => 'Logout success.',
        ]);
    }

    public function verify()
    {
        return response()->json([
            'message' => 'Welcome.',
            'user' => [
                'name' => 'name'
            ]
        ]);
    }

    public function refresh()
    {
        return response()->setStatusCode(200)->cookie(
            'token', Auth::refresh(), 30
        );;
    }
}
