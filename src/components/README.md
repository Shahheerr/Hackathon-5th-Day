# Components Structure

This directory contains all the React components used throughout the application.

## Directory Structure

- `layout/`: Components that make up the main layout of the application
  - Header
  - Footer
  - Navigation

- `ui/`: Reusable UI components
  - Buttons
  - Cards
  - Forms
  - Input fields

- `features/`: Feature-specific components
  - Cart
  - WishList
  - Authentication
  - Product management

- `sections/`: Page-specific sections
  - Hero sections
  - Product listings
  - Category displays
  - Flash sales

## Best Practices

1. Each component should be in its own directory with:
   - Main component file (index.tsx)
   - Styles (if needed)
   - Types (types.ts)
   - Utils (utils.ts)
   - Tests

2. Use TypeScript interfaces for props
3. Add JSDoc comments for component documentation
4. Follow atomic design principles
