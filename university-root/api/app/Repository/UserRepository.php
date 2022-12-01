<?php
namespace App\Repository;
use App\Models\User;

use App\Repository\IUserRepository;
use Illuminate\Support\Facades\Hash;

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

    public function createOrUpdate($id = null, $collection = [])
    {
        // if(is_null($id)){
        //     $user = new User;
        //     $user->name=$collection['name'];
        //     $user->user_name=$collection['user_name'];
        //     $user->email=$collection['email'];
        //     $user->password = Hash::make('password');
        //     $user->verified_at=$collection['verified_at'];
        //     $user->registered_at=$collection['registered_at'];
        //     $user->birthdate=$collection['birthdate'];
        //     $user->profile_photo_url=$collection['profile_photo_url'];
        //     $user->category_id=$collection['category_id']; // ! manualy for now !!!
        //     return $user->save();

        // }
        // $user = User::find($id);
        // $user->name=$collection['name'];
        // $user->user_name=$collection['user_name'];
        // $user->email=$collection['email'];
        // $user->password = Hash::make('password');
        // $user->verified_at=$collection['verified_at'];
        // $user->registered_at=$collection['registered_at'];
        // $user->birthdate=$collection['birthdate'];
        // $user->profile_photo_url=$collection['profile_photo_url'];
        // $user->category_id=$collection['category_id']; // ! manualy for now !!!
        // return $user->save();

        if(is_null($id)){
            $user = new User;
        } else {
            $user = User::find($id);
        }
        $user->name=$collection['name'];
        $user->user_name=$collection['user_name'];
        $user->email=$collection['email'];
        $user->password = Hash::make('password');
        $user->verified_at=$collection['verified_at'];
        $user->registered_at=$collection['registered_at'];
        $user->birthdate=$collection['birthdate'];
        $user->profile_photo_url=$collection['profile_photo_url'];
        $user->category_id=$collection['category_id']; // ! manualy for now !!!
        return $user->save();
    }

    public function deleteUser($id)
    {
        return  User::destroy($id);
    }
}