<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repository\IUserRepository;
use Illuminate\Support\Facades\View;

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
}
