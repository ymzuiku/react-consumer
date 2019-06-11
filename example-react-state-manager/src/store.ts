import createReactConsumer from '@nuage/react-consumer';
import createRoute, { urlTools } from '@nuage/react-consumer/createRoute';

interface State {
  route: {
    path: string;
    params: string;
  };
  user: {
    info: {
      num: number;
    };
  };
}

const initState: State = {
  route: {
    path: urlTools.defaultPath('/app'),
    params: urlTools.params(),
  },
  user: {
    info: {
      num: 0,
    },
  },
};

const { Provider, Consumer, store } = createReactConsumer<State>(initState);

const Route = createRoute(Consumer, (v: State) => v.route.path, (v: State) => v.route.params);

export { Provider, Consumer, store, Route };
