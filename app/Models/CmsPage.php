<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CmsPage extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'page_type',
        'content',
        'meta_data',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'content' => 'array',
            'meta_data' => 'array',
            'is_published' => 'boolean',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    // Auto-generate slug from title
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            if (empty($model->slug)) {
                $model->slug = \Str::slug($model->title);
            }
        });
    }

    // Scope for published pages
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    // Get page type labels
    public static function getPageTypes()
    {
        return [
            'privacy_policy' => 'Privacy Policy',
            'terms_condition' => 'Terms & Conditions',
            'partner_with_us' => 'Partner With Us',
            'corporate' => 'Corporate',
            'about' => 'About',
            'home' => 'Home',
            'membership' => 'Membership',
            'gift_vouchers' => 'Gift Vouchers',
            'contact' => 'Contact',
            'footer' => 'Footer',
        ];
    }

    // Get content field by key
    public function getContentField($key, $default = null)
    {
        return $this->content[$key] ?? $default;
    }

    // Get meta data field by key
    public function getMetaField($key, $default = null)
    {
        return $this->meta_data[$key] ?? $default;
    }
}
