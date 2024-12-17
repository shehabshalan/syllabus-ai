import { cn } from '@/lib/utils';
import Container from '../ui/container';

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  message?: string;
}

export const LoadingSpinner = ({
  size = 24,
  className,
  message,
  ...props
}: ISVGProps) => {
  return (
    <Container className=" mt-12 gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          {...props}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn('animate-spin', className)}
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        {message && (
          <p className="text-sm text-muted-foreground animate-fade-in">
            {message}
          </p>
        )}
      </div>
    </Container>
  );
};
