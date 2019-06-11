import './index.css';
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import User from './pages/User';
import * as serviceWorker from './serviceWorker';
import { Provider, Route } from './store';

const Root: React.FC = () => {
  return (
    <Provider>
      <Route path="/app">
        <App />
      </Route>
      <Route path="/user">
        <User />
      </Route>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
