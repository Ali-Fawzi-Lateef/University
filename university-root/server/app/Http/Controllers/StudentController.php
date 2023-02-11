<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\IStudentRepository;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentController extends Controller
{
    use HttpResponses;
    public $student;
    public function __construct(IStudentRepository $student)
    {
        $this->student = $student;
    }
    public function getGrades()
    {
        return response()->json($this->student->getGrades());
    }
}
