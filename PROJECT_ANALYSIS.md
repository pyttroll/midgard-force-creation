# Midgard Force Creation - Project Analysis

## Overview

**Midgard Force Creation** is a Vue 3 web application designed as a force builder tool for the "Midgard Heroic Battles" tabletop wargaming system. The application allows players to create, customize, validate, and manage army lists with comprehensive rule enforcement and point calculation.

## Technical Stack

### Frontend Framework
- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vue Router** for navigation
- **SCSS** for styling with CSS variables

### Build & Development Tools
- **Vite** as build tool and dev server
- **ESLint** with Vue and TypeScript configurations
- **Prettier** for code formatting
- **vue-tsc** for TypeScript checking
- **Yarn** as package manager

### Dependencies
- `vue` (^3.5.12) - Core framework
- `vue-multiselect` (3.1.0) - Multi-select component
- `vue-router` (^4.4.5) - Routing

## Architecture & Structure

### Core Models (`src/models/`)
- **Force.ts** - Main army container with heroes, units, and validation
- **Hero.ts** - Individual hero characters with traits and equipment
- **Unit.ts** - Military units with profiles, traits, and options
- **UnitProfile.ts** - Base unit statistics and available upgrades
- **Contingent.ts** - Tactical grouping system for army organization
- **Themes.ts** - Visual theming system

### Components (`src/components/`)
- **ForceEditor.vue** - Main force creation interface
- **ForceView.vue** - Force display and summary
- **HeroEditor/View.vue** - Hero creation and display
- **UnitEditor/View.vue** - Unit creation and display
- **ContingentSelector.vue** - Contingent assignment interface

### Views (`src/views/`)
- **ForceList.vue** - Main dashboard listing all forces
- **ForceDetailsView.vue** - Individual force details
- **ForceEditorView.vue** - Force creation/editing interface
- **PrintableForceList.vue** - Print-optimized army lists
- **SettingsView.vue** - Application configuration

## Key Features

### 1. Force Management
- Create and manage multiple army forces
- Persistent storage using local storage
- Import/export functionality through API serialization
- Comprehensive force validation engine

### 2. Army Composition
- **Heroes**: Powerful individual characters with unique traits
- **Units**: Military formations with customizable equipment
- **Point System**: Automatic calculation with validation rules
- **Reputation System**: Secondary scoring mechanism (10% of points)

### 3. Contingent System
- Organize forces into tactical contingents
- Mandatory composition rules:
  - Each contingent must have a hero leader
  - Each contingent must have at least one unit
  - Each contingent must be ≥25% of total force points
  - All units and heroes must be assigned to contingents

### 4. Validation Engine
Key game rules enforced:
- Heroes limited to ≤33% of total force points
- Rare/powerful traits limited to 1 per 350 points
- Flying units limited to 2 per 350 points
- Contingent composition requirements
- Trait compatibility and exclusions

### 5. Customization Options
- **Unit Traits**: Special abilities with point costs
- **Equipment Options**: Weapons, armor, and gear modifications
- **Custom Traits**: User-defined abilities with point costs
- **Missile Types**: Different ranged weapon systems

### 6. User Interface
- Medieval/fantasy themed design
- Responsive layout with mobile support
- Print-optimized views for gameplay
- Theme switching capability
- Breadcrumb navigation

## Data Flow

1. **Force Creation**: Users create forces through the editor interface
2. **Component Addition**: Heroes and units added with base profiles
3. **Customization**: Traits, options, and contingents assigned
4. **Validation**: Real-time rule checking and error reporting
5. **Persistence**: Forces saved to local storage via API serialization
6. **Export**: Print-ready formats for tabletop use

## Game Rules Implementation

The application implements comprehensive rules for the Midgard Heroic Battles system:

- **Point Limits**: Automatic calculation with hero/unit restrictions
- **Trait Restrictions**: Rare trait limitations and compatibility checking
- **Army Composition**: Mandatory unit types and ratios
- **Contingent Rules**: Tactical organization with balance requirements
- **Equipment Validation**: Weapon and armor compatibility

## Technical Highlights

- **Type Safety**: Comprehensive TypeScript interfaces for all game data
- **Modular Design**: Clean separation between models, views, and components
- **Validation System**: Centralized rule engine with detailed error reporting
- **State Management**: Reactive Vue 3 composition with persistent storage
- **Performance**: Efficient rendering with computed properties and minimal re-renders

## File Structure Summary

```
src/
├── models/           # Game data models and business logic
├── components/       # Reusable Vue components
├── views/           # Page-level components
├── assets/          # Static assets and styling
└── router/          # Application routing configuration
```

## Development Commands

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn lint` - Run ESLint
- `yarn type-check` - TypeScript validation

This application represents a sophisticated digital tool for tabletop gaming, combining complex game rule validation with an intuitive user interface for army list creation and management.