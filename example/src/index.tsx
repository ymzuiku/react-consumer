import { cssin } from 'cssin';
import * as React from 'react';
import ReactDOM from 'react-dom';

import { App } from './pages/App';
import { InfiniteList } from './pages/InfiniteList';
import { User } from './pages/User';
import * as serviceWorker from './serviceWorker';
import { history, Route } from './store';

cssin`
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

button {
  margin: 8px;
  padding: 8px;
  border: none;
  background-color: #f2f3f3;
  outline: none;
}

button:hover {
  background-color: #aff;
}

button:active {
  background-color: #8ff;
}

`;

const Root: React.FC = () => {
  React.useEffect(() => {
    history.init('/App');
  }, []);

  return (
    <>
      <Route path="/App" component={App} />
      <Route path="/User" component={User} />
      <Route path="/InfiniteList" component={InfiniteList} />
    </>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// Unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
