import { bindRouteManager } from './bindRouteManager';
import { createHistory, IHistory as IHistory_ } from './createHistory';
import { createRoute, IRouteProps as IRouteProps_ } from './createRoute';
import { createStateManager, IConsumerProps as IConsumerProps_ } from './createStateManager';

export interface IHistory extends IHistory_ {}
export interface IRouteProps extends IRouteProps_ {}
export interface IConsumerProps<T> extends IConsumerProps_<T> {}

export { bindRouteManager, createHistory, createRoute, createStateManager };
