import * as React from 'react';

// tslint:disable max-classes-per-file

interface IMemoHiddenProps {
  children: any;
  isShow: boolean;
}

/** 控制 display, 如果显示就不拦截更新，否则根据isShow是否改变来判断是否更新 */
class MemoDisplay extends React.Component<IMemoHiddenProps> {
  public lastShow: boolean = this.props.isShow;

  public render() {
    const { children, isShow } = this.props;

    return <div style={{ display: isShow ? undefined : 'none' }}>{children}</div>;
  }

  public shouldComponentUpdate = (nextProps: IMemoHiddenProps) => {
    const { isShow } = nextProps;

    let isNeedUpdate = isShow;

    if (this.lastShow !== isShow) {
      isNeedUpdate = true;
    }

    this.lastShow = isShow;

    return isNeedUpdate;
  };
}

export { MemoDisplay };
