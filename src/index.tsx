import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { configureStore } from './store';
import { AppContainer } from 'react-hot-loader';
import { Root } from './components/Root';

import { Routes } from './components/Routes';

const store = configureStore();
const history = createBrowserHistory();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);


if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const { Root: NewRoot } = require('./components/Root');
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
