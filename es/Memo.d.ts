import * as React from 'react';
interface IProps {
    children: any;
    memo?: any[];
}
/** 单纯的memo组件，根据 memo 拦截 */
declare class Memo extends React.Component<IProps> {
    lastMemo: any[];
    render(): any;
    shouldComponentUpdate: (nextProps: IProps) => boolean;
}
export { Memo };
