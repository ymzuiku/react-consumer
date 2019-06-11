import './index.css';
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './utils/serviceWorker';
import { Provider, Route } from './store';

const Root: React.FC = () => {
  return (
    <Provider>
      <Route path="/app">
        <App />
      </Route>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
