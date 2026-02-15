<?php

namespace App\Filament\Resources\Packages\Schemas;

use App\Models\Package;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class PackageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Basic Information')
                    ->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                        Select::make('type')
                            ->label('Package Type')
                            ->options([
                                'international' => 'International',
                                'domestic' => 'Domestic',
                            ])
                            ->required()
                            ->live()
                            ->native(false),
                        TextInput::make('country')
                            ->label('Country')
                            ->maxLength(255)
                            ->visible(fn ($get) => $get('type') === 'international'),
                        TextInput::make('state')
                            ->label('State')
                            ->maxLength(255)
                            ->visible(fn ($get) => $get('type') === 'domestic'),
                        Textarea::make('description')
                            ->label('Short Description')
                            ->rows(3)
                            ->columnSpanFull()
                            ->helperText('Brief description shown in package cards'),
                        Textarea::make('detailed_description')
                            ->label('Detailed Description')
                            ->rows(6)
                            ->columnSpanFull()
                            ->helperText('Full description shown on package detail page'),
                    ])
                    ->columns(2),

                Section::make('Pricing')
                    ->schema([
                        TextInput::make('price_per_person')
                            ->label('Price Per Person')
                            ->numeric()
                            ->prefix('₹')
                            ->required()
                            ->helperText('Enter price per person in INR'),
                        Select::make('currency')
                            ->options([
                                'INR' => 'INR (₹)',
                                'USD' => 'USD ($)',
                                'EUR' => 'EUR (€)',
                            ])
                            ->default('INR')
                            ->required()
                            ->native(false),
                        TextInput::make('duration')
                            ->label('Duration')
                            ->maxLength(255)
                            ->placeholder('e.g., 5 Days / 4 Nights')
                            ->helperText('Package duration'),
                    ])
                    ->columns(3),

                Section::make('Content Details')
                    ->schema([
                        Repeater::make('inclusions')
                            ->label('Inclusions')
                            ->schema([
                                TextInput::make('item')
                                    ->label('Item')
                                    ->required()
                                    ->placeholder('e.g., Hotel accommodation'),
                            ])
                            ->defaultItems(1)
                            ->addActionLabel('Add Inclusion')
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['item'] ?? null),
                        Repeater::make('exclusions')
                            ->label('Exclusions')
                            ->schema([
                                TextInput::make('item')
                                    ->label('Item')
                                    ->required()
                                    ->placeholder('e.g., Airfare'),
                            ])
                            ->defaultItems(1)
                            ->addActionLabel('Add Exclusion')
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['item'] ?? null),
                        Repeater::make('itinerary')
                            ->label('Itinerary')
                            ->schema([
                                TextInput::make('day')
                                    ->label('Day')
                                    ->required()
                                    ->placeholder('e.g., Day 1')
                                    ->columnSpan(1),
                                TextInput::make('title')
                                    ->label('Title')
                                    ->required()
                                    ->placeholder('e.g., Arrival in Paris')
                                    ->columnSpan(2),
                                Textarea::make('description')
                                    ->label('Description')
                                    ->rows(2)
                                    ->placeholder('Detailed description of the day')
                                    ->columnSpanFull(),
                            ])
                            ->defaultItems(1)
                            ->addActionLabel('Add Day')
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => ($state['day'] ?? 'Day') . ' - ' . ($state['title'] ?? 'Untitled')),
                    ])
                    ->collapsible(),

                Section::make('Media')
                    ->schema([
                        FileUpload::make('main_image')
                            ->label('Main Image')
                            ->image()
                            ->directory('packages')
                            ->disk('public')
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                '16:9',
                                '4:3',
                                '1:1',
                            ])
                            ->helperText('Main image displayed on package cards and detail page hero')
                            ->columnSpanFull(),
                        FileUpload::make('gallery_images')
                            ->label('Gallery Images')
                            ->image()
                            ->directory('packages/gallery')
                            ->disk('public')
                            ->multiple()
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                '16:9',
                                '4:3',
                                '1:1',
                            ])
                            ->helperText('Additional images for the gallery on package detail page')
                            ->columnSpanFull(),
                    ]),

                Section::make('Settings')
                    ->schema([
                        Toggle::make('is_featured')
                            ->label('Featured Package')
                            ->helperText('Show this package in featured sections')
                            ->default(false),
                        Toggle::make('is_published')
                            ->label('Published')
                            ->helperText('Only published packages are visible on the frontend')
                            ->default(true),
                        TextInput::make('sort_order')
                            ->label('Sort Order')
                            ->numeric()
                            ->default(0)
                            ->helperText('Lower numbers appear first'),
                    ])
                    ->columns(3),

                Section::make('SEO')
                    ->schema([
                        TextInput::make('meta_title')
                            ->label('Meta Title')
                            ->maxLength(255)
                            ->helperText('SEO title for search engines'),
                        Textarea::make('meta_description')
                            ->label('Meta Description')
                            ->rows(3)
                            ->helperText('SEO description for search engines'),
                    ])
                    ->collapsible()
                    ->collapsed(),
            ]);
    }
}
