import { useGenerateChapters } from '@/api/apiHooks/llm-generation/llm-generation';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';

const Home = () => {
  const [topic, setTopic] = useState('');
  const { mutate } = useGenerateChapters();

  const handleSubmit = () => {
    mutate({
      data: {
        topic: topic,
      },
    });
  };

  const searchCount = 0;
  return (
    <Container className=" mt-12 gap-6 pb-8 pt-6 md:py-10">
      {searchCount < 5 ? (
        <div className="flex max-w-[700px] mx-auto flex-col items-center justify-center gap-6">
          <h1 className="text-xl md:text-4xl sm:text-lg font-bold leading-tight tracking-tighter">
            Learn <span className="underline">anything</span> with SyllabusAI
          </h1>

          <p>
            (0/<span className="font-bold ">5</span>) Queries
          </p>
          <div className="flex w-full items-center space-x-2">
            <div className="relative flex-grow">
              <Input
                className="h-12 pr-12 "
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <Button
                className="absolute top-0 right-0 h-full px-4 rounded-tl-none rounded-bl-none"
                type="submit"
                onClick={handleSubmit}
              >
                <Sparkles className="mr-2 h-4 w-4" /> Learn
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Hint: Try topics like “Programming”, “Philosophy“, or “Music Theory”
          </p>
        </div>
      ) : (
        <div className="flex max-w-[700px] mx-auto flex-col items-center justify-center gap-6">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl ">
            You have reached your limit. Login to continue.
          </h1>
        </div>
      )}
    </Container>
  );
};

export default Home;
