<?php

namespace App\Filament\Resources\CmsPages\Schemas;

use App\Models\CmsPage;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\KeyValue;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CmsPageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Basic Information')
                    ->schema([
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
                    ])
                    ->columns(2),
                
                Section::make('Content')
                    ->schema([
                        static::getContentFields(),
                    ])
                    ->visible(fn ($get) => $get('page_type') !== null),
                
                Section::make('Meta Data')
                    ->schema([
                        KeyValue::make('meta_data')
                            ->label('Meta Data (SEO)')
                            ->keyLabel('Key')
                            ->valueLabel('Value')
                            ->helperText('Add SEO metadata like meta_title, meta_description, etc.')
                    ])
                    ->collapsible()
                    ->collapsed(),
            ]);
    }

    protected static function getContentFields(): array
    {
        return [
            TextInput::make('content.phone')
                ->label('Phone')
                ->tel()
                ->visible(fn ($get) => $get('page_type') === 'footer')
                ->placeholder('+1 234 567 890'),
            
            TextInput::make('content.email')
                ->label('Email')
                ->email()
                ->visible(fn ($get) => $get('page_type') === 'footer')
                ->placeholder('info@empireoholidays.com'),
            
            TextInput::make('content.whatsapp')
                ->label('WhatsApp Number')
                ->visible(fn ($get) => $get('page_type') === 'footer')
                ->placeholder('1234567890'),
            
            Textarea::make('content.business_hours')
                ->label('Business Hours')
                ->rows(3)
                ->visible(fn ($get) => $get('page_type') === 'footer')
                ->placeholder('Monday - Saturday: 9:00 AM - 7:00 PM\nSunday: 10:00 AM - 5:00 PM'),
            
            Textarea::make('content.address')
                ->label('Address')
                ->rows(3)
                ->visible(fn ($get) => $get('page_type') === 'footer')
                ->placeholder('Your business address here'),
            
            // Generic content field for other page types
            KeyValue::make('content')
                ->label('Content')
                ->keyLabel('Key')
                ->valueLabel('Value')
                ->visible(fn ($get) => $get('page_type') !== 'footer' && $get('page_type') !== null)
                ->helperText('Add content fields as key-value pairs'),
        ];
    }
}
