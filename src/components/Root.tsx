import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import { Store } from 'redux';
import { RootState } from '../reducers';
import { History } from 'history';

import { Routes } from './Routes';

interface RootProps {
  store: Store<RootState>,
  history: History,
}

export const Root: React.SFC<RootProps> = (props) => (
  <Provider store={props.store}>
    <Router history={props.history}>
      <Routes />
    </Router>
  </Provider>
);
