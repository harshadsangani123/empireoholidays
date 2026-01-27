<?php

namespace App\Http\Controllers;

use App\Data\Packages;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page
     */
    public function index()
    {
        return Inertia::render('Home', [
            'featuredInternational' => Packages::getFeaturedInternational(4),
            'featuredDomestic' => Packages::getFeaturedDomestic(4),
        ]);
    }

    /**
     * Display the about us page
     */
    public function about()
    {
        return Inertia::render('About');
    }

    /**
     * Display the international holidays page
     */
    public function international()
    {
        return Inertia::render('International', [
            'packages' => Packages::getInternationalPackages(),
        ]);
    }

    /**
     * Display the domestic holidays page
     */
    public function domestic()
    {
        return Inertia::render('Domestic', [
            'packages' => Packages::getDomesticPackages(),
        ]);
    }

    /**
     * Display the contact us page
     */
    public function contact()
    {
        return Inertia::render('Contact');
    }
}

