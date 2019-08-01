import * as React from 'react';

// tslint:disable max-classes-per-file

interface IProps {
  children: any;
  memo?: any[];
}

/** 单纯的memo组件，根据 memo 拦截 */
class Memo extends React.Component<IProps> {
  public lastMemo: any[] = this.props.memo ? this.props.memo : [];

  public render() {
    return this.props.children;
  }

  public shouldComponentUpdate = (nextProps: IProps) => {
    const { memo } = nextProps;
    if (!memo) {
      return false;
    }

    let isNeedUpdate = false;

    for (let i = 0; i < this.lastMemo.length; i++) {
      if (this.lastMemo[i] !== memo[i]) {
        isNeedUpdate = true;
        break;
      }
    }

    this.lastMemo = [...memo];

    return isNeedUpdate;
  };
}

export { Memo };