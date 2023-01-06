<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

use App\Traits\HttpResponeses;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Hash;
use Illuminate\Routing\Controller;

class AuthController extends Controller
{
    /**
     * custum Trait to hanlde Responeses messages.
     */
    use HttpResponeses;

    public function register(Request $request) 
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string', 'min:8'],
            'name' => ['required', 'string']
            ]);
        $request->validated($request->only(['name', 'email', 'password']));

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            
        ]);

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API Token')->plainTextToken
        ]);
    }

    public function logout() 
    {
        Auth::user()->currentAccessToken()->delete();

        return $this->success([
            'message' => 'You have succesfully been logged out and your token has been removed'
        ]);
    }

    public function login(Request $request){

        $validated = $request->validate([
        'email' => ['required', 'string', 'email'],
        'password' => ['required', 'string', 'min:8'],
        ]);
        if(!Auth::attempt($request->only(['email', 'password'] ,$request->rememberMe ?? false))) {
            return $this->error('', 'Credentials do not match', 401);
        }
        $user = User::where('email', $request->email)->first();

        if(!is_null($user->verified_at))
        return $this->success([
            'user_type' => $user->user_type,
            'token' => $user->createToken('API Token',[$user->user_type])->plainTextToken
        ]); 
        return $this->error('', 'User is not verified',401);
    }

}