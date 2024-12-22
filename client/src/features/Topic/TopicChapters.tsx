import { Chapter } from '@/api/apiSchemas';
import { CheckCircle } from 'lucide-react';

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
import { useToast } from '@/components/ui/use-toast';

type TopicChaptersProps = {
  chapters: Chapter[];
};
const TopicChapters = ({ chapters }: TopicChaptersProps) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { mutateAsync: generateChatper, isPending } = useGenerateChapter();
  const queryClinet = useQueryClient();
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleGenerateChapter = async (chapter: Chapter) => {
    setActiveCardId(chapter.id);
    await generateChatper(
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
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Error generating chapter',
          });
          setActiveCardId(null);
        },
      }
    );
  };

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 py-4 mt-4">
        {chapters.map((chapter, index) => (
          <Card
            key={index}
            className={`relative transition-all duration-200 ${
              activeCardId
                ? activeCardId === chapter.id
                  ? 'ring-2 ring-primary shadow-lg'
                  : 'opacity-50'
                : ''
            }`}
          >
            {chapter.is_read && (
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                <div className="absolute top-[6px] right-[-35px] rotate-45 bg-primary text-white text-xs px-8 py-1 shadow-sm flex items-center gap-1.5 font-medium">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Done
                </div>
              </div>
            )}

            <CardHeader>
              <CardTitle>{chapter.title}</CardTitle>
              <CardDescription>{chapter.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => handleGenerateChapter(chapter)}
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
