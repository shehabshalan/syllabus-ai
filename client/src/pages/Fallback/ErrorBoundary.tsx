import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <PageLayout>
          <div className="flex flex-col items-center justify-center h-[calc(100vh-65px)] text-center bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-900">Oops!</h1>
            <p className="my-4 text-xl text-gray-600">
              Sorry, something went wrong. Don't worry, it's not your fault.
            </p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Reload Page
            </Button>
          </div>
        </PageLayout>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
