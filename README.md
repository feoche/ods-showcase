# ODS Sandbox

A frontend project using Vite, TypeScript, React and npm, using all ODS React components (`@ovhcloud/ods-react` 20.0.0).

## Pages

### Home (`/`)
Showcases all ODS React components of the pinned ODS version (currently 20.0.0).

The WCAG Design Tokens page (contrast combinations of the ODS palettes) moved to its own repository, `ods-wcag-tokens`.

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

## Deployment

This project is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` or `master` branch.

### GitHub Pages Setup

The deployment is handled by a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:
1. Checks out the code
2. Installs dependencies
3. Builds the project (`npm run build`)
4. Deploys the `dist` folder to GitHub Pages

### First-Time Setup

To enable GitHub Pages for your repository:

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages**
3. Under **Build and deployment**, select **Source**: `GitHub Actions`
4. Push a commit to the `main` or `master` branch to trigger the deployment

The site will be available at: `https://feoche.github.io/ods-showcase/`

### Manual Deployment

You can also manually trigger the deployment:
1. Go to the **Actions** tab in your GitHub repository
2. Select the **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

## Code Quality

This project uses:
- Biome for linting and formatting
- TypeScript for type checking
- Vitest for testing
