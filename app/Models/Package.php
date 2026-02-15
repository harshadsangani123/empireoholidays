<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Package extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'type',
        'country',
        'state',
        'description',
        'detailed_description',
        'price_per_person',
        'currency',
        'duration',
        'inclusions',
        'exclusions',
        'itinerary',
        'main_image',
        'gallery_images',
        'is_featured',
        'is_published',
        'sort_order',
        'meta_title',
        'meta_description',
    ];

    protected function casts(): array
    {
        return [
            'inclusions' => 'array',
            'exclusions' => 'array',
            'itinerary' => 'array',
            'gallery_images' => 'array',
            'price_per_person' => 'decimal:2',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'sort_order' => 'integer',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeInternational($query)
    {
        return $query->where('type', 'international');
    }

    public function scopeDomestic($query)
    {
        return $query->where('type', 'domestic');
    }

    // Accessors for image URLs
    public function getMainImageUrlAttribute()
    {
        if (!$this->main_image) {
            return null;
        }

        // If it's already a full URL, return as is
        if (filter_var($this->main_image, FILTER_VALIDATE_URL)) {
            return $this->main_image;
        }

        // Otherwise, return storage URL
        return Storage::url($this->main_image);
    }

    public function getGalleryImagesUrlsAttribute()
    {
        if (!$this->gallery_images || !is_array($this->gallery_images)) {
            return [];
        }

        return array_map(function ($image) {
            // If it's already a full URL, return as is
            if (filter_var($image, FILTER_VALIDATE_URL)) {
                return $image;
            }
            // Otherwise, return storage URL
            return Storage::url($image);
        }, $this->gallery_images);
    }

    // Helper method to get photos array (for compatibility with existing frontend)
    public function getPhotosAttribute()
    {
        $photos = [];
        
        if ($this->main_image) {
            $photos[] = $this->main_image_url;
        }
        
        if ($this->gallery_images) {
            $photos = array_merge($photos, $this->gallery_images_urls);
        }
        
        return $photos;
    }

    // Helper method to get image (for compatibility with existing frontend)
    public function getImageAttribute()
    {
        if ($this->main_image) {
            return $this->main_image_url;
        }
        
        // If no main image, get first gallery image
        if ($this->gallery_images && count($this->gallery_images) > 0) {
            $firstImage = $this->gallery_images[0];
            if (filter_var($firstImage, FILTER_VALIDATE_URL)) {
                return $firstImage;
            }
            return Storage::url($firstImage);
        }
        
        return null;
    }

    // Helper method to get detailed description (for compatibility with frontend)
    public function getDetailedDescription()
    {
        return $this->detailed_description ?? $this->description;
    }
}
