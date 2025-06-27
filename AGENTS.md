# Agent Guidelines for Midgard Force Creation

## Build/Test Commands
- `yarn dev` - Start development server
- `yarn build` - Build for production (runs type-check + build-only)
- `yarn type-check` - Run TypeScript type checking with vue-tsc
- `yarn lint` - Run ESLint with auto-fix
- `yarn format` - Format code with Prettier
- No test framework configured - verify changes manually

## Code Style
- **Imports**: Use `@/` alias for src imports, group by external/internal
- **Formatting**: Prettier config - no semicolons, single quotes, 100 char width
- **Types**: TypeScript strict mode disabled, interfaces prefixed with `I` (e.g. `IForceApi`)
- **Naming**: PascalCase for classes/components, camelCase for variables/functions
- **Vue**: Composition API with `<script setup>`, props via `defineProps`, emits via `defineEmits`
- **Error Handling**: Try-catch blocks with console.error for debugging
- **Classes**: Default exports for model classes, constructor with default params
- **Methods**: Use getters for computed properties, `toApi()`/`fromApi()` for serialization

## Project Structure
- Models in `src/models/` - business logic classes
- Components in `src/components/` - reusable Vue components  
- Views in `src/views/` - page-level components
- Use Yarn 4.5.3 as package manager