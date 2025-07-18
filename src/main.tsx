import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createHashRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router';
import './index.css';
import { Routing } from './routes';

const queryClient = new QueryClient();
const router = createHashRouter(createRoutesFromElements(Routing));
const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  );
}
