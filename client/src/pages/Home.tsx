import { useGenerateChapters } from '@/api/apiHooks/llm-generation/llm-generation';
import { useMe } from '@/api/apiHooks/user/user';
import AuthWrapper from '@/features/Auth/AuthWrapper';
import { Button } from '@/components/ui/button';

import Container from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useToast } from '@/components/ui/use-toast';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';
import useSearch from '@/hooks/useSearch';

const HINT_TOPICS = [
  'Javascript',
  'Philosophy',
  'Music Theory',
  'Writing Fiction',
];

const Home = () => {
  const { value, deleteSearch, handleInputChange, setSearch } =
    useSearch('topic');
  const navigate = useNavigate();

  const { data: user, isLoading } = useMe();
  const { mutate: generateChatpers, isPending } = useGenerateChapters();
  const { toast } = useToast();
  const handleSubmit = async () => {
    if (!value || !user) {
      return;
    }

    generateChatpers(
      {
        data: {
          topic: value,
        },
      },
      {
        onSuccess: (data) => {
          navigate(`/topic/${data?.id}`);
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: 'An error occurred',
            description: `We could not generate chapters for this ${value}.`,
          });
        },
      }
    );
  };

  return (
    <Container className=" mt-12 gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[700px] mx-auto flex-col items-center justify-center gap-6">
        <>
          <h1 className="text-xl md:text-4xl sm:text-lg font-bold leading-tight tracking-tighter">
            Learn <span className="underline">anything</span> with SyllabusAI
          </h1>
          <p className="text-lg text-center text-muted-foreground">
            Get started by entering a topic you want to learn about.
          </p>
          <div className="flex w-full items-center space-x-2">
            <div className="relative flex-grow">
              <Input
                className="h-12 pr-12 "
                type="text"
                value={value}
                onChange={(e) => handleInputChange(e.target.value)}
              />
              {!isLoading && !user ? (
                <AuthWrapper
                  trigger={
                    <Button
                      className="absolute top-0 right-0 h-full px-4 rounded-tl-none rounded-bl-none"
                      type="submit"
                      disabled={!value || isPending}
                    >
                      <Sparkles className="mr-2 h-4 w-4" /> Learn
                    </Button>
                  }
                />
              ) : (
                <Button
                  className="absolute top-0 right-0 h-full px-4 rounded-tl-none rounded-bl-none"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!value || isPending}
                >
                  <Sparkles className="mr-2 h-4 w-4" /> Learn
                </Button>
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Hint: Try topics</p>
          <div className="flex gap-2 flex-wrap items-center justify-center">
            {HINT_TOPICS.map((hint, index) => (
              <Button
                key={index}
                variant={value === hint ? 'outline' : 'ghost'}
                onClick={() => {
                  if (value === hint) {
                    deleteSearch();
                    return;
                  }
                  setSearch(hint);
                }}
                disabled={isPending}
              >
                {hint}
              </Button>
            ))}
          </div>
        </>
        {isPending && (
          <LoadingSpinner message="Generating chapters for this topic..." />
        )}
      </div>
    </Container>
  );
};

export default Home;
