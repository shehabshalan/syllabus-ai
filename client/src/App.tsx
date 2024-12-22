import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Router from './routes/Router';
import { ThemeProvider } from './providers/ThemeProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorBoundary from './pages/Fallback/ErrorBoundary';
import PageLayout from './components/layout/PageLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000 * 60, // 5 minutes
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <BrowserRouter basename={'/syllabus-ai/'}>
              <ErrorBoundary>
                <PageLayout>
                  <Router />
                </PageLayout>
                <Toaster />
              </ErrorBoundary>
            </BrowserRouter>
          </GoogleOAuthProvider>
        </ThemeProvider>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      </QueryClientProvider>
    </QueryClientProvider>
  );
};

export default App;
