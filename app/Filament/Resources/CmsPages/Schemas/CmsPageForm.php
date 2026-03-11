<?php

namespace App\Filament\Resources\CmsPages\Schemas;

use App\Models\CmsPage;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CmsPageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(function (string $operation, $state, callable $set) {
                        if ($operation !== 'create') {
                            return;
                        }
                        $set('slug', Str::slug($state));
                    }),
                TextInput::make('slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(CmsPage::class, 'slug', ignoreRecord: true)
                    ->alphaDash(),
                Select::make('page_type')
                    ->label('Page Type')
                    ->options(CmsPage::getPageTypes())
                    ->required()
                    ->searchable()
                    ->live()
                    ->afterStateUpdated(function ($state, callable $set) {
                        // Reset content when page type changes
                        $set('content', []);
                    }),
                Toggle::make('is_published')
                    ->label('Published')
                    ->default(true),

                // Content fields (vary based on page type)
                ...static::getContentFields(),

                // Meta data (SEO)
                KeyValue::make('meta_data')
                    ->label('Meta Data (SEO)')
                    ->keyLabel('Key')
                    ->valueLabel('Value')
                    ->helperText('Add SEO metadata like meta_title, meta_description, etc.'),
            ]);
    }

    protected static function getContentFields(): array
    {
        return [
            TextInput::make('content.phone')
                ->label('Phone')
                ->tel()
                ->visible(fn ($get) => in_array($get('page_type'), ['footer', 'contact'], true))
                ->placeholder('+1 234 567 890'),
            
            TextInput::make('content.email')
                ->label('Email')
                ->email()
                ->visible(fn ($get) => in_array($get('page_type'), ['footer', 'contact'], true))
                ->placeholder('info@empireoholidays.com'),
            
            TextInput::make('content.whatsapp')
                ->label('WhatsApp Number')
                ->visible(fn ($get) => in_array($get('page_type'), ['footer', 'contact'], true))
                ->placeholder('1234567890'),

            TextInput::make('content.facebook')
                ->label('Facebook URL')
                ->url()
                ->visible(fn ($get) => in_array($get('page_type'), ['footer', 'contact'], true))
                ->placeholder('https://www.facebook.com/your-page'),

            TextInput::make('content.instagram')
                ->label('Instagram URL')
                ->url()
                ->visible(fn ($get) => in_array($get('page_type'), ['footer', 'contact'], true))
                ->placeholder('https://www.instagram.com/your-profile'),

            TextInput::make('content.linkedin')
                ->label('LinkedIn URL')
                ->url()
                ->visible(fn ($get) => in_array($get('page_type'), ['footer', 'contact'], true))
                ->placeholder('https://www.linkedin.com/company/your-company'),
            
            Textarea::make('content.business_hours')
                ->label('Business Hours')
                ->rows(3)
                ->visible(fn ($get) => in_array($get('page_type'), ['footer', 'contact'], true))
                ->placeholder('Monday - Sunday: 9:00 AM - 8:00 PM'),
            
            Textarea::make('content.address')
                ->label('Address')
                ->rows(3)
                ->visible(fn ($get) => in_array($get('page_type'), ['footer', 'contact'], true))
                ->placeholder('Your business address here'),

            FileUpload::make('content.hero_background')
                ->label('Home Hero Background Images')
                ->image()
                ->multiple()
                ->directory('home')
                ->disk('public')
                ->maxSize(2048)
                ->helperText('Upload one or more images for the home page hero slider.')
                ->visible(fn ($get) => $get('page_type') === 'home'),
            
            // Generic content field for other page types
            KeyValue::make('content')
                ->label('Content')
                ->keyLabel('Key')
                ->valueLabel('Value')
                ->visible(fn ($get) => $get('page_type') !== null && ! in_array($get('page_type'), ['footer', 'contact', 'home'], true))
                ->helperText('Add content fields as key-value pairs'),
        ];
    }
}
