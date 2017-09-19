import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { App } from '../containers/App';
import { NotFound } from '../components/NotFound';

export const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="*" component={NotFound} />
    </Switch>
  </div>
);
