<?php
namespace App\Repositories;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use App\Repositories\Interfaces\IUserRepository;

class UserRepository implements IUserRepository{

    protected $user = null;

    public function getAllUsers()
    {
        return User::all();
    }

    public function getUserById($id)
    {
        return User::find($id);
    }

    public function addUser(Request $request)
    {
        
        $user = new User;
        $user->name=$request->name;
        $user->password = Hash::make($request->password);
        $user->username=$request->username;
        $user->email=$request->email;
        $user->user_type=$request->user_type;
        $user->verified_at=Carbon::now()->toDateTimeString();
        $user->registered_at=Carbon::now()->toDateTimeString();
        $user->birthdate=$request->birthdate;
        return $user->save();
    }
    public function editUser(Request $request)
    {
        $user = User::find($request->id);
        $user->name=$request->name;
        $user->username=$request->username;
        $user->email=$request->email;
        $user->user_type=$request->user_type;
        $user->birthdate=$request->birthdate;
        return $user->save();
    }

    public function deleteUser($id)
    {
        return  User::destroy($id);
    }
}