import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="card text-center py-12">
            <div className="text-5xl mb-4" aria-hidden="true">⚠️</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">出現了意外錯誤</h2>
            <p className="text-gray-600 mb-6">
              頁面載入時遇到問題，請嘗試重新整理。
            </p>
            <button
              onClick={this.handleReset}
              className="btn-primary min-h-[44px]"
            >
              重試
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
