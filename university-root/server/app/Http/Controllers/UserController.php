<?php

namespace App\Http\Controllers;

use App\Models\teacher;
use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use App\Repositories\Interfaces\IUserRepository;

class UserController extends Controller
{
    /**
     * custom Trait to handle Responses messages.
     */
    use HttpResponses;
    public $user;

    public function __construct(IUserRepository $user)
    {
        $this->user = $user;
    }
    public function deleteUser(Request $request)
    {
        return $this->user->deleteUser($request->id) ?
        $this->success(null,"User deleted successfully") :
        $this->error(null,500,"failed to delete user");
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
        $this->success(null,"User added successfully") :
        $this->error(null,500,"failed to add user");
    }
    public function editUser(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email'],
            'name' => ['required', 'string'],
            'username' => ['required', 'string'],
            'user_type' => ['required', 'string'],
            ]);
        return $this->user->editUser($request) ?
        $this->success(null,"User edited successfully") :
        $this->error(null,500,"failed to edit user");
    }
}
