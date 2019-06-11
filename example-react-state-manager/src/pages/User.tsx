import * as React from 'react';
import { Consumer } from '../store';
import * as dispatchs from '../dispatchs';

const User: React.FC = () => {
  return (
    <div>
      <header>
        <h3>User Page</h3>
      </header>
      <section>
        <Consumer>{state => <div>{state.user.info.num}</div>}</Consumer>
        <button onClick={dispatchs.addNumber}>add number</button>
        <button onClick={() => dispatchs.routeBack()}>Go Back</button>
      </section>
    </div>
  );
};

export default User;
