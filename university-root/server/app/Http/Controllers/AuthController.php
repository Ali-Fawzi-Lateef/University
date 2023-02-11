<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Hash;
use Illuminate\Routing\Controller;

class AuthController extends Controller
{
    /**
     * custom Trait to handle Responses messages.
     */
    use HttpResponses;

    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();

        return $this->success([
            'message' => 'You have successfully been logged out and your token has been removed'
        ]);
    }

    public function login(Request $request){

        $validated = $request->validate([
        'email' => ['required', 'string', 'email'],
        'password' => ['required', 'string', 'min:8'],
        ]);
        if(!Auth::attempt($request->only(['email', 'password']))) {
            return $this->error('',  401, 'Credentials do not match');
        }
        $user = User::where('email', $request->email)->first();

        return $this->success([
            'user_type' => $user->user_type,
            'name' => $user->name,
            'token' => $user->createToken('API Token',[$user->user_type])->plainTextToken
        ]);
    }

}
