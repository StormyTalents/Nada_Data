import React, { ReactNode, ErrorInfo } from 'react';

interface Props {
  onError?: (error: Error, info: ErrorInfo) => void;
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ExamErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    this.props.onError?.(error, info);
  }

  render() {
    // if (this.state.hasError) {
    //   // You can render any custom fallback UI
    //   return <h1>Something went wrong.</h1>;
    // }
    return this.props.children;
  }
}

export default ExamErrorBoundary;
