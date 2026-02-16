# ODS Sandbox

A frontend project using Vite, TypeScript, React and npm, using all ODS React components.

## Pages

### Home (`/`)
Showcases all ODS React components.

### Design Tokens (`/design-tokens.html`)
A dedicated page for testing design tokens, displaying all color combinations from each palette that meet WCAG AA contrast ratio standards (4.5:1 minimum).

Each cell shows:
- Background token name and hex value
- Text token name and hex value
- Contrast ratio
- WCAG compliance badge (AAA, AA, or AA Large)

This page is built as a standalone HTML file and can be accessed directly at `/design-tokens.html` in both development and production builds.

## Prerequisites

- Node.js (v22 or later recommended)
- npm (v7 or later)

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ods-sandbox
   ```

2. Install dependencies using npm:
   ```bash
   npm install
   ```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run the linter
- `npm run preview` - Preview the production build locally
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run test:watch` - Run tests in watch mode

## Code Quality

This project uses:
- Biome for linting and formatting
- TypeScript for type checking
- Vitest for testing
