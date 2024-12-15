import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Router from './routes/Router';
import { ThemeProvider } from './providers/ThemeProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SiteHeader from './components/layout/SiteHeader';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000 * 60, // 5 minutes
      retry: false,
    },
  },
});

const App = () => {
  console.log(import.meta.env);

  return (
    <QueryClientProvider client={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <BrowserRouter basename={'/syllabus-ai/'}>
              <SiteHeader />
              <Router />
              <Toaster />
            </BrowserRouter>
          </GoogleOAuthProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </QueryClientProvider>
  );
};

export default App;
