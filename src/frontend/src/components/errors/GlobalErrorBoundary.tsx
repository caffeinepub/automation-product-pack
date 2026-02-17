import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application error caught by boundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <Card className="max-w-md w-full shadow-lg">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl">Something went wrong</CardTitle>
                <CardDescription className="text-base">
                  We encountered an unexpected error. Please try reloading the page.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={this.handleReload}
                className="w-full gap-2"
                size="lg"
              >
                <RefreshCw className="h-4 w-4" />
                Reload Page
              </Button>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-xs text-muted-foreground bg-muted p-3 rounded-md">
                  <summary className="cursor-pointer font-medium mb-2">
                    Error Details (Development Only)
                  </summary>
                  <pre className="whitespace-pre-wrap break-words">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
