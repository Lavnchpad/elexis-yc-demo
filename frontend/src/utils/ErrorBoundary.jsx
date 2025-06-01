import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, resetKey: 0 };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ errorInfo });
  }

  resetErrorBoundary = () => {
    this.setState((prevState) => ({
      hasError: false,
      error: null,
      errorInfo: null,
      // resetKey: prevState.resetKey + 1, // Change key to force remount
    }));
  };

  render() {
    const { hasError, error, errorInfo, resetKey } = this.state;
    const { fallback: FallbackComponent, children } = this.props;

    if (hasError) {
      if (FallbackComponent) {
        return (
          <FallbackComponent
            error={error}
            errorInfo={errorInfo}
            resetError={this.resetErrorBoundary}
          />
        );
      }

      return (
        <div className="p-4 bg-red-100 text-red-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Something went wrong.</h2>
          <button
            onClick={this.resetErrorBoundary}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Retry
          </button>
        </div>
      );
    }

    // Force re-render of children by changing the key
    return <React.Fragment key={resetKey}>{children}</React.Fragment>;
  }
}

export default ErrorBoundary;
