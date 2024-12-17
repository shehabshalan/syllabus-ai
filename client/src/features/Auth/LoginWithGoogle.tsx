import { useToast } from '../../components/ui/use-toast';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { Button } from '../../components/ui/button';
import { useAuth } from '@/api/apiHooks/user/user';

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
  const handleCallbackResponse = (response: TokenResponse) => {
    const token = response.access_token;
    mutate(
      {
        data: {
          token: token,
        },
      },
      {
        onSuccess(data) {
          if (data.token) {
            toast({
              variant: 'default',
              title: 'Success',
              description: 'You have successfully logged in.',
            });
            localStorage.setItem('token', data.token);
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        },
        onError(e: Error & { response?: any }) {
          toast({
            variant: 'destructive',
            title: e.response?.data?.detail || 'An error occurred',
            description: 'There was a problem with your request. Try again.',
          });
        },
      }
    );
  };

  return <Button onClick={() => login()}>Sign in</Button>;
};

export default LoginWithGoogle;
