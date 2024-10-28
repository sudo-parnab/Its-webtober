<?php

use Illuminate\Support\Facades\Route;

Route::get('/', [\App\Http\Controllers\GithubProjectController::class, 'index']);
Route::post('fetch-projects', [\App\Http\Controllers\GithubProjectController::class, 'fetchProjects'])->name('fetchProjects');
Route::post('saveUsername', [\App\Http\Controllers\GithubProjectController::class, 'saveUsername'])->name('save.username');