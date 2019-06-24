import * as React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { App } from './pages/App';
import { InfiniteList } from './pages/InfiniteList';
import { User } from './pages/User';
import * as serviceWorker from './serviceWorker';
import { Route } from './store';

const Root: React.FC = () => {
  return (
    <>
      <Route path="/app">
        <App />
      </Route>
      <Route path="/user">
        <User />
      </Route>
      <Route path="/infinite-list">
        <InfiniteList />
      </Route>
    </>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// Unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
