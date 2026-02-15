<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page
     */
    public function index()
    {
        return Inertia::render('Home', [
            'featuredInternational' => Package::international()
                ->published()
                ->featured()
                ->orderBy('sort_order')
                ->limit(4)
                ->get()
                ->map(fn($pkg) => $this->formatPackageForFrontend($pkg)),
            'featuredDomestic' => Package::domestic()
                ->published()
                ->featured()
                ->orderBy('sort_order')
                ->limit(4)
                ->get()
                ->map(fn($pkg) => $this->formatPackageForFrontend($pkg)),
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
            'packages' => Package::international()
                ->published()
                ->orderBy('sort_order')
                ->get()
                ->map(fn($pkg) => $this->formatPackageForFrontend($pkg)),
        ]);
    }

    /**
     * Display the domestic holidays page
     */
    public function domestic()
    {
        return Inertia::render('Domestic', [
            'packages' => Package::domestic()
                ->published()
                ->orderBy('sort_order')
                ->get()
                ->map(fn($pkg) => $this->formatPackageForFrontend($pkg)),
        ]);
    }

    /**
     * Display the contact us page
     */
    public function contact()
    {
        return Inertia::render('Contact');
    }

    /**
     * Display package detail page
     */
    public function packageDetail(string $type, int $id)
    {
        $package = Package::where('type', $type)
            ->where('id', $id)
            ->published()
            ->first();

        if (!$package) {
            abort(404, 'Package not found');
        }

        return Inertia::render('PackageDetail', [
            'package' => $this->formatPackageForDetail($package),
        ]);
    }

    /**
     * Format package data for frontend (card view)
     */
    private function formatPackageForFrontend(Package $package): array
    {
        return [
            'id' => $package->id,
            'name' => $package->name,
            'country' => $package->country,
            'state' => $package->state,
            'description' => $package->description,
            'image' => $package->main_image_url ?? $package->image,
            'price_per_person' => $package->price_per_person,
            'currency' => $package->currency,
            'duration' => $package->duration,
            'type' => $package->type,
        ];
    }

    /**
     * Format package data for detail page
     */
    private function formatPackageForDetail(Package $package): array
    {
        return [
            'id' => $package->id,
            'name' => $package->name,
            'country' => $package->country,
            'state' => $package->state,
            'description' => $package->description,
            'detailedDescription' => $package->getDetailedDescription(),
            'image' => $package->main_image_url ?? $package->image,
            'photos' => $package->photos,
            'price_per_person' => $package->price_per_person,
            'currency' => $package->currency,
            'duration' => $package->duration,
            'inclusions' => $package->inclusions ?? [],
            'exclusions' => $package->exclusions ?? [],
            'itinerary' => $package->itinerary ?? [],
            'type' => $package->type,
        ];
    }
}

