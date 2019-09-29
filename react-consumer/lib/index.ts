import { bindRouteManager } from './bindRouteManager';
import { IHistory as IHistory_ } from './createHistory';
import { createStateManager, IConsumerProps as IConsumerProps_ } from './createStateManager';

interface IHistory extends IHistory_ {}
interface IConsumerProps<T> extends IConsumerProps_<T> {}

const ReactConsumer = { bindRouteManager, createStateManager };

export { bindRouteManager, createStateManager, IHistory, IConsumerProps };

export default ReactConsumer;
