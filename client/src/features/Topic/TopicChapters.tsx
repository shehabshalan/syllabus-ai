import { Chapter } from '@/api/apiSchemas';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { useNavigate, useParams } from 'react-router';
import { Button } from '../../components/ui/button';
import { useGenerateChapter } from '@/api/apiHooks/llm-generation/llm-generation';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

type TopicChaptersProps = {
  chapters: Chapter[];
};
const TopicChapters = ({ chapters }: TopicChaptersProps) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { mutate: generateChatper, isPending } = useGenerateChapter();
  const queryClinet = useQueryClient();
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 py-4 mt-4">
        {chapters.map((chapter, index) => (
          <Card
            key={index}
            className={`transition-all duration-200 ${
              activeCardId
                ? activeCardId === chapter.id
                  ? 'ring-2 ring-primary shadow-lg'
                  : 'opacity-50'
                : ''
            }`}
          >
            <CardHeader>
              <CardTitle>{chapter.title}</CardTitle>
              <CardDescription>{chapter.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setActiveCardId(chapter.id);
                  generateChatper(
                    {
                      data: {
                        id: chapter.id,
                        title: chapter.title,
                        description: chapter.description,
                      },
                    },
                    {
                      onSuccess: (data) => {
                        queryClinet.invalidateQueries({
                          queryKey: [`/user/topic/${id}`],
                        });
                        navigate(`/chapter/${data.id}`);
                        setActiveCardId(null);
                      },
                      onError: () => {
                        console.error('Error generating chapter');
                        setActiveCardId(null);
                      },
                    }
                  );
                }}
              >
                {chapter.content
                  ? 'View'
                  : isPending && activeCardId === chapter.id
                  ? 'Generating...'
                  : 'Generate'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default TopicChapters;
