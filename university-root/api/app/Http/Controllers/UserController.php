<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Interfaces\IUserRepository;

class UserController extends Controller
{   
    public $user;
    
    public function __construct(IUserRepository $user)
    {
        $this->user = $user;
    }
    public function deleteUser(Request $request)
    {
        $this->user->deleteUser(request(['id']));
    }
    public function getAllUsers()
    {
        return response()->json($this->user->getAllUsers());
    }
}