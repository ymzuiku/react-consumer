import * as React from 'react';
import { IHistory } from './createHistory';
export interface IRouteProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    component?: any;
    delay?: number;
    keep?: boolean;
    leaveTime?: number;
    path: string;
}
/**
 *  Route 使用 history.listen 而不使用 consumer 是因为 Route 属于非常固定的模式.
 *  Route 会常驻 ReactNode 对象树，使用 listen 可以有效减少不必要的 consumer 订阅。
 */
export declare function createRoute<S>(history: IHistory): {
    new (props: IRouteProps): {
        animeTimer: any;
        realChild: any;
        state: {
            isRenderChild: null;
            realChild: null;
            style: {
                display: string;
                position: string;
                zIndex: number;
            };
        };
        unListen: () => any;
        componentDidMount(): void;
        componentWillUnmount(): void;
        onHistoryUpdate: () => void;
        render(): JSX.Element | null;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<IRouteProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<IRouteProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    defaultProps: {
        sync: string;
        keep: boolean;
        animeTime: number;
    };
    contextType?: React.Context<any> | undefined;
};
