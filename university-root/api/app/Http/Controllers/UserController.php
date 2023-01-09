<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\HttpResponeses;
use App\Repositories\Interfaces\IUserRepository;

class UserController extends Controller
{   
    /**
     * custum Trait to hanlde Responeses messages.
     */
    use HttpResponeses;
    public $user;
    
    public function __construct(IUserRepository $user)
    {
        $this->user = $user;
    }
    public function deleteUser(Request $request)
    {
        return $this->user->deleteUser($request->id) ? 
        $this->success(null,"User deleted succseefuly") : 
        $this->error(null,"failed to delete user",500);
    }
    public function getAllUsers()
    {
        return response()->json($this->user->getAllUsers());
    }
    public function addUser(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email','unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'name' => ['required', 'string'],
            'username' => ['required', 'string','unique:users'],
            'user_type' => ['required', 'string'],
            'birthdate'=> ['date_format:Y-m-d']
            ]);
        return $this->user->addUser($request)? 
        $this->success(null,"User added succseefuly") : 
        $this->error(null,"failed to add user",500);
    }
    public function editUser(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email'],
            'name' => ['required', 'string'],
            'username' => ['required', 'string'],
            'user_type' => ['required', 'string'],
            'birthdate'=> ['nullable','date_format:Y-m-d']
            ]);
        return $this->user->editUser($request) ? 
        $this->success(null,"User edited succseefuly") : 
        $this->error(null,"failed to edit user",500);
    }
}