<?php

namespace App\Repositories;

use App\Models\Grades;
use App\Models\User;
use App\Repositories\Interfaces\ITeacherRepository;
use Illuminate\Http\Request;

class TeacherRepositories implements ITeacherRepository
{
    protected $teacher = null;

    public function getAllStudents()
    {
        return Grades::all();
    }
    public function manageGrades(Request $request)
    {
        $grades = Grades::find($request->id);
        $grades->subject1=$request->subject1;
        $grades->subject2=$request->subject2;
        $grades->subject3=$request->subject3;
        $grades->subject4=$request->subject4;
        $grades->subject5=$request->subject5;
        $grades->Year=$request->Year;
        return $grades->save();
    }
}
