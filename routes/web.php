<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\InquiryController;
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
Route::post('/contact', [HomeController::class, 'submitContact'])->name('contact.submit');

// Package Inquiry routes (must be before package detail route for proper matching)
Route::get('/package/{type}/{id}/inquiry', [InquiryController::class, 'show'])->name('package.inquiry');
Route::post('/inquiry', [InquiryController::class, 'store'])->name('inquiry.store');

// Package Detail page (must be after inquiry route)
Route::get('/package/{type}/{id}', [HomeController::class, 'packageDetail'])->name('package.detail');