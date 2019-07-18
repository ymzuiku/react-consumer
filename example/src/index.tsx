import * as React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { App } from './pages/App';
import { InfiniteList } from './pages/InfiniteList';
import { User } from './pages/User';
import * as serviceWorker from './serviceWorker';
import { dispatchRoute, Route } from './store';

const Root: React.FC = () => {
  React.useEffect(() => {
    dispatchRoute.initRoute('/app');
  }, []);

  return (
    <>
      <Route path="/app" keep={true}>
        <App />
      </Route>
      <Route path="/user">
        <User />
      </Route>
      <Route path="/infinite-list" keep={true}>
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
