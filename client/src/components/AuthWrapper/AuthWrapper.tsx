import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import LoginWithGoogle from '../Site/LoginWithGoogle';

type AuthWrapperProps = {
  trigger: React.ReactNode;
};
const AuthWrapper = ({ trigger }: AuthWrapperProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login to continue</DialogTitle>
          <DialogDescription>
            Get started by logging in to your account.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <LoginWithGoogle />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthWrapper;
