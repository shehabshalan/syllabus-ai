import { useGenerateChapters } from '@/api/apiHooks/llm-generation/llm-generation';
import { useMe } from '@/api/apiHooks/user/user';
import AuthWrapper from '@/components/AuthWrapper/AuthWrapper';
import { useSearchLimit } from '@/components/hooks/useSearchLimit';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Container from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const { data: user, isLoading } = useMe();
  const {
    mutateAsync: generateChatpers,
    data,
    isPending,
  } = useGenerateChapters();

  const handleSubmit = async () => {
    if (!topic || !user) {
      return;
    }

    await generateChatpers({
      data: {
        topic: topic,
        user_id: user?.id,
      },
    });
  };

  return (
    <Container className=" mt-12 gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[700px] mx-auto flex-col items-center justify-center gap-6">
        <>
          <h1 className="text-xl md:text-4xl sm:text-lg font-bold leading-tight tracking-tighter">
            Learn <span className="underline">anything</span> with SyllabusAI
          </h1>

          <div className="flex w-full items-center space-x-2">
            <div className="relative flex-grow">
              <Input
                className="h-12 pr-12 "
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              {!isLoading && !user ? (
                <AuthWrapper
                  trigger={
                    <Button
                      className="absolute top-0 right-0 h-full px-4 rounded-tl-none rounded-bl-none"
                      type="submit"
                      disabled={!topic || isPending}
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
                  disabled={!topic || isPending}
                >
                  <Sparkles className="mr-2 h-4 w-4" /> Learn
                </Button>
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Hint: Try topics like “Programming”, “Philosophy“, or “Music Theory”
          </p>
        </>
      </div>
      {data && data?.chapters.length > 0 && (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4">
          {data?.chapters.map((chapter, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{chapter.name}</CardTitle>

                <CardDescription>{chapter.description}</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate(`/chapter/${chapter.slug}`);
                  }}
                >
                  View
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Home;
