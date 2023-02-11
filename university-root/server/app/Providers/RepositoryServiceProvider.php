<?php

namespace App\Providers;

use App\Repositories\Interfaces\IStudentRepository;
use App\Repositories\Interfaces\ITeacherRepository;
use App\Repositories\StudentRepository;
use App\Repositories\TeacherRepositories;
use App\Repositories\UserRepository;
use App\Repositories\Interfaces\IUserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {


        $this->app->bind(
            IUserRepository::class,
            UserRepository::class,
        );
        $this->app->bind(
            ITeacherRepository::class,
            TeacherRepositories::class,
        );
        $this->app->bind(
            IStudentRepository::class,
            StudentRepository::class,
        );
    }
}
