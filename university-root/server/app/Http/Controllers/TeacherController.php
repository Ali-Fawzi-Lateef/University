<?php

namespace App\Http\Controllers;

use App\Models\Grades;
use App\Repositories\Interfaces\ITeacherRepository;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    use HttpResponses;
    public $teacher;

    public function __construct(ITeacherRepository $teacher)
    {
        $this->teacher = $teacher;
    }
    public function getStudentGrades()
    {
        return response()->json($this->teacher->getAllStudents());
    }
    public function manageGrades(Request $request)
    {
        $validated = $request->validate([
            'subject1' => ['required', 'integer', 'between:0,100'],
            'subject2' => ['required', 'integer', 'between:0,100'],
            'subject3' => ['required', 'integer', 'between:0,100'],
            'subject4' => ['required', 'integer', 'between:0,100'],
            'subject5' => ['required', 'integer', 'between:0,100'],
            'Year' => ['required', 'integer', 'between:1,4'],
        ]);
        return $this->teacher->manageGrades($request)?
        $this->success(null,"Grades Updated successfully") :
        $this->error(null,500,"failed to Update Grades");
    }
}
