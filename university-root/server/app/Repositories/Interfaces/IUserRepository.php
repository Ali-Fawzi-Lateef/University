<?php

namespace App\Repositories\Interfaces;

use Illuminate\Http\Request;

interface IUserRepository {

    public function getAllUsers();

    public function getUserById($id);

    public function addUser(Request $request);

    public function editUser(Request $request);

    public function deleteUser($id);
}