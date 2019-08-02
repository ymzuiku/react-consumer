import * as React from 'react';
interface IMemoHiddenProps {
    children: any;
    isShow: boolean;
}
/** 控制 display, 如果显示就不拦截更新，否则根据isShow是否改变来判断是否更新 */
declare class MemoDisplay extends React.Component<IMemoHiddenProps> {
    lastShow: boolean;
    render(): JSX.Element;
    shouldComponentUpdate: (nextProps: IMemoHiddenProps) => boolean;
}
export { MemoDisplay };
