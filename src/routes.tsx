import { Route } from 'react-router';
import { Home } from './pages/Home.page';

export const Routing = (
  <Route>
    <Route element={<Home />} index />
  </Route>
);
