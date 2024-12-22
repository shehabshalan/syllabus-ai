import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

import { GetChapterResponse } from '@/api/apiSchemas';
import FormattedMarkDown from '@/components/common/FormattedMarkDown';
import { useUpdateChapterReadStatus } from '@/api/apiHooks/user/user';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';

type ChapterLayoutProps = {
  chapter: GetChapterResponse | undefined;
};
const ChapterLayout = ({ chapter }: ChapterLayoutProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useUpdateChapterReadStatus();
  const { toast } = useToast();

  const handleUpdateChapterReadStatus = async () => {
    if (chapter?.id) {
      await mutateAsync(
        {
          data: {
            is_read: !chapter.is_read,
          },
          id: chapter.id,
        },
        {
          onSuccess: () => {
            toast({
              variant: 'default',
              title: 'Success',
              description: `Chapter marked as ${
                chapter?.is_read ? 'unread' : 'read'
              }`,
            });
            queryClient.invalidateQueries({
              queryKey: [`/user/chapter/${chapter.id}`],
            });
          },
          onError: () => {
            toast({
              variant: 'destructive',
              title: 'An error occurred',
              description: 'Failed to mark chapter as read',
            });
          },
        }
      );
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl md:text-4xl sm:text-lg font-bold leading-tight tracking-tighter">
          {chapter?.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none px-8 ">
        <div className="overflow-x-auto space-y-4">
          <FormattedMarkDown text={chapter?.content} />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleUpdateChapterReadStatus}
          disabled={isPending}
          variant={chapter?.is_read ? 'outline' : 'default'}
          className="gap-2"
        >
          {chapter?.is_read ? (
            <>
              <XCircle className="h-4 w-4" />
              Mark as unread
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4" />
              Mark as read
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChapterLayout;
