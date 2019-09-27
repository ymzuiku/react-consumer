import { bindRouteManager } from './bindRouteManager';
import { IHistory as IHistory_ } from './createHistory';
import { createStateManager, IConsumerProps as IConsumerProps_ } from './createStateManager';

export interface IHistory extends IHistory_ {}
export interface IConsumerProps<T> extends IConsumerProps_<T> {}

const ReactConsumer = { bindRouteManager, createStateManager };

export default ReactConsumer;
