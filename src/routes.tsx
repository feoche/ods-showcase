import { Route } from 'react-router';
import { Home } from './pages/Home.page';
import { Sandbox } from './pages/Sandbox.page';

export const Routing = (
  <Route>
    <Route element={<Home />} index />
    <Route element={<Sandbox />} path="/sandbox" />
  </Route>
);

