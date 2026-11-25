# ODS Sandbox

A frontend project using Vite, TypeScript, React and npm, using all ODS React components (`@ovhcloud/ods-react` 20.0.0).

## Pages

### Home (`/`)
Showcases all ODS React components of the pinned ODS version (currently 20.0.0).

The WCAG Design Tokens page (contrast combinations of the ODS palettes) moved to its own repository, `ods-wcag-tokens`.

## Creating a theme from a page

The showcase themes in `src/themes` (Terminal, Hackathon, Black Friday, Summit) map an existing page's look onto the ODS tokens. To gather a page's design without opening it yourself:

1. Open the page and scroll to the bottom, so lazy sections render.
2. Paste `scripts/extract-theme.js` into the DevTools console and press Enter.
3. It copies a JSON to the clipboard and downloads it as `theme-<host>.json`: the page's surfaces by visible area with the text colours on each, its outline from top to bottom, its cards, its controls grouped by the surface they sit on, its type scale, radii, shadows, motion and the hover and focus rules it really uses. Cookie banners and full-screen overlays are left out.

Send that JSON, with a screenshot or two for what it can't see (images, the overall feel). `tests/themes.test.ts` then holds the new theme to the ODS theme contract.

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
