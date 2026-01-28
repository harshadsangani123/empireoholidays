<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

// Home page
Route::get('/', [HomeController::class, 'index'])->name('home');

// About Us page
Route::get('/about', [HomeController::class, 'about'])->name('about');

// International Holidays page
Route::get('/international', [HomeController::class, 'international'])->name('international');

// Domestic Holidays page
Route::get('/domestic', [HomeController::class, 'domestic'])->name('domestic');

// Contact Us page
Route::get('/contact', [HomeController::class, 'contact'])->name('contact');

// Package Detail page
Route::get('/package/{type}/{id}', [HomeController::class, 'packageDetail'])->name('package.detail');