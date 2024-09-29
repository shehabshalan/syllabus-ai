import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ActionDialogProps = {
  title: string;
  description: string;
  cancelButtonText: string;
  continueButtonText: string;
  onContinue: () => void;
  children?: React.ReactNode;
};

export function ActionDialog({
  title,
  description,
  cancelButtonText,
  continueButtonText,
  children,
  onContinue,
}: ActionDialogProps) {
  const handleContinue = () => {
    onContinue();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelButtonText}</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>
            {continueButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
