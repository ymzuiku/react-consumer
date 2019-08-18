import * as React from 'react';

import { IHistory } from './createHistory';

export interface IRouteProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  /* children */
  // children?: React.ReactNode;
  component?: any;
  display?: string;
  /* 如果历史路由中包含path，使用 div包裹子组件，并设置 dispatch=none 代替 return null */
  keep?: boolean;
  /* 用于校验路由的路径 */
  path: string;
  sync?: 'sync' | 'async' | 'preload' | string;
}

export function createRoute<S>(store: any, history: IHistory) {
  return class Route extends React.Component<IRouteProps> {
    public static defaultProps = {
      display: 'block',
      sync: 'sync',
      keep: true,
    };
    public haveChild = false;
    public state = {
      display: 'none',
      realChild: null,
      isRenderChild: false,
    };
    public constructor(props: IRouteProps) {
      super(props);
      history.listen(this.onHistoryUpdate);

      const { sync, component: Comp } = this.props;

      // 预先加载
      if (sync && sync.indexOf('preload') === 0) {
        const time = sync.split(':')[1];
        if (time) {
          setTimeout(() => {
            Comp();
          }, Number(time) * 1000);
        } else {
          Comp();
        }
      }
    }

    public hiddenChild = () => {
      if (this.state.display !== 'none') {
        this.setState({
          display: 'none',
        });
      }
    };

    public onHistoryUpdate = () => {
      const { path, sync, component: Comp, display, keep } = this.props;
      const { isRenderChild } = this.state;
      const [match, stackMatch] = history.checkPathMatch(
        path,
        store.state.paths,
      );

      if (!this.haveChild) {
        if (match) {
          this.haveChild = true;
          if (sync === 'sync') {
            this.setState({
              display,
              isRenderChild: true,
              realChild: <Comp />,
            });
          } else {
            Comp().then((V: any) => {
              this.setState({
                display,
                isRenderChild: true,
                realChild: <V />,
              });
            });
          }
        } else {
          this.hiddenChild();
        }
      } else if (isRenderChild) {
        if (match) {
          this.showChild();
        } else {
          if (stackMatch && keep) {
            this.hiddenChild();
          } else {
            this.haveChild = false;

            if (isRenderChild) {
              this.setState({
                display: 'none',
                isRenderChild: false,
              });
            }
          }
        }
      } else {
        this.hiddenChild();
      }
    };

    public render() {
      const { realChild, display, isRenderChild } = this.state;

      if (!isRenderChild) {
        return null;
      }

      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            display,
          }}
        >
          {realChild}
        </div>
      );
    }

    public showChild = () => {
      const { display } = this.props;
      if (this.state.display !== display) {
        this.setState({
          display,
        });
      }
    };
  };
}
