import { Route } from 'react-router';
import { Home } from './pages/Home.page';
import { DesignTokens } from './pages/DesignTokens.page';
import { Sandbox } from './pages/Sandbox.page';

export const Routing = (
  <Route>
    <Route element={<Home />} index />
    <Route element={<DesignTokens />} path="/design-tokens" />
    <Route element={<Sandbox />} path="/sandbox" />
  </Route>
);

