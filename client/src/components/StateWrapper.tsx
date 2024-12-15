import Container from './ui/container';
import { LoadingSpinner } from './ui/loading-spinner';

type StateWrapperProps = {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  loadingMessage?: string;
  errorMessage?: string;
  emptyMessage?: string;
  children: React.ReactNode;
};

export const StateWrapper = ({
  isLoading,
  isError,
  isEmpty,
  loadingMessage = 'Loading...',
  errorMessage = 'Oops! An error occurred.',
  emptyMessage = 'No data found.',
  children,
}: StateWrapperProps) => {
  if (isLoading) {
    return <LoadingSpinner message={loadingMessage} />;
  }

  if (isError) {
    return (
      <Container className="mt-12 gap-6 pb-8 pt-6 md:py-10">
        <h1 className="text-xl md:text-4xl sm:text-lg font-bold leading-tight tracking-tighter text-center">
          {errorMessage}
        </h1>
      </Container>
    );
  }

  if (isEmpty) {
    return (
      <Container className="mt-12 gap-6 pb-8 pt-6 md:py-10">
        <h1 className="text-xl md:text-4xl sm:text-lg font-bold leading-tight tracking-tighter text-center">
          {emptyMessage}
        </h1>
      </Container>
    );
  }

  return <>{children}</>;
};
