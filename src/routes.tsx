import { Route } from 'react-router';
import { ErrorBoundary } from './pages/Error.page';
import { Home } from './pages/Home.page';
import { Layout } from './pages/Layout.page';

export const Routing = (
  <Route ErrorBoundary={ErrorBoundary} element={<Layout />}>
    <Route element={<Home />} index />
  </Route>
);
