import { Route } from 'react-router';
import { Home } from './pages/Home.page';
import { DesignTokens } from './pages/DesignTokens.page';

export const Routing = (
  <Route>
    <Route element={<Home />} index />
    <Route element={<DesignTokens />} path="/design-tokens" />
  </Route>
);
