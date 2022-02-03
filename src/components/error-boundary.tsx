import React from "react";

type IFullbackRender = (props: { eror: Error | null }) => React.ReactElement;

//错误边界处理
//https://github.com/bvaughn/react-error-boundary
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: IFullbackRender }>,
  { eror: Error | null }
> {
  state = { eror: null };

  static getDerivedStateFromError(eror: Error) {
    return { eror }; // 返回的error 将赋值给state
  }

  render() {
    const { eror } = this.state;
    const { fallbackRender, children } = this.props;
    if (eror) {
      return fallbackRender({ eror });
    }
    return children;
  }
}
