<?php

namespace App\Console\Commands;

use App\Data\Packages;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DownloadPackageImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'packages:download-images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Download main and gallery images for all holiday packages into local storage.';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Starting package image download...');

        $allPackages = [
            'international' => Packages::getInternationalPackages(),
            'domestic' => Packages::getDomesticPackages(),
        ];

        // Fallback URLs for packages that failed to download
        $fallbackUrls = [
            'Singapore' => 'https://images.unsplash.com/photo-1525625293386-3f9f5df7bf55?w=1200&h=800&fit=crop&auto=format',
            'Karnataka' => 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&auto=format',
            'Kerala' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop&auto=format',
        ];

        foreach ($allPackages as $type => $packages) {
            foreach ($packages as $pkg) {
                $slug = Str::kebab($pkg['name']);
                $basePath = "packages/{$type}/{$slug}";

                // Ensure directory exists
                Storage::disk('public')->makeDirectory($basePath);

                // Main image - try original URL first, then fallback if it doesn't exist
                $imageUrl = $pkg['image'] ?? null;
                if (! empty($imageUrl)) {
                    $downloaded = $this->downloadImage(
                        $imageUrl,
                        "{$basePath}/main.jpg",
                        "Main image for {$pkg['name']}"
                    );

                    // If download failed and we have a fallback, try it
                    if (! $downloaded && isset($fallbackUrls[$pkg['name']])) {
                        $this->line("Trying fallback URL for {$pkg['name']}...");
                        $this->downloadImage(
                            $fallbackUrls[$pkg['name']],
                            "{$basePath}/main.jpg",
                            "Main image for {$pkg['name']} (fallback)"
                        );
                    }
                }
            }
        }

        $this->info('Package image download completed.');

        return self::SUCCESS;
    }

    /**
     * Download a single image to the given path if it does not already exist.
     * Returns true if download was successful, false otherwise.
     */
    protected function downloadImage(string $url, string $path, string $label = ''): bool
    {
        if (Storage::disk('public')->exists($path)) {
            $this->line("Skipping existing {$label}: {$path}");
            return true;
        }

        try {
            $this->line("Downloading {$label}...");

            $response = Http::timeout(30)->get($url);

            if (! $response->successful()) {
                $this->warn("Failed to download {$label} from {$url}");
                return false;
            }

            Storage::disk('public')->put($path, $response->body());

            $this->line("Saved {$label} to {$path}");
            return true;
        } catch (\Throwable $e) {
            $this->warn("Error downloading {$label} from {$url}: {$e->getMessage()}");
            return false;
        }
    }
}


