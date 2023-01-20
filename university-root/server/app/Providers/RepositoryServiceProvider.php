<?php

namespace App\Providers;

use App\Repositories\UserRepository;
use App\Repositories\Interfaces\IUserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(
            IUserRepository::class, 
            UserRepository::class
        );
    }
}