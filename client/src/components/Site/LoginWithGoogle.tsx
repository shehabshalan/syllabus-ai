import { useToast } from '../ui/use-toast';
import { useAuth } from '@/services/useAuth';
import { ROUTES } from '@/routes/Routes';
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '../ui/button';

const LoginWithGoogle = () => {
  const { toast } = useToast();
  const { mutate } = useAuth();
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      handleCallbackResponse(tokenResponse);
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: error.error_description,
      });
    },
  });
  const handleCallbackResponse = (response: any) => {
    const token = response.credential;
    mutate(token, {
      onSuccess(data) {
        if (data.token) {
          localStorage.setItem('token', data.token);
          window.location.href = ROUTES.HOME;
        }
      },
      onError(e: Error & { response?: any }) {
        toast({
          variant: 'destructive',
          title: e.response?.data?.detail || 'An error occurred',
          description: 'There was a problem with your request. Try again.',
        });
      },
    });
  };

  return <Button onClick={() => login()}>Sign in with Google 🚀</Button>;
};

export default LoginWithGoogle;
