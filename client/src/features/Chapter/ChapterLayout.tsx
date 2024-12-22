import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GetChapterResponse } from '@/api/apiSchemas';
import FormattedMarkDown from '@/components/common/FormattedMarkDown';

type ChapterLayoutProps = {
  chapter: GetChapterResponse | undefined;
};
const ChapterLayout = ({ chapter }: ChapterLayoutProps) => {
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
    </Card>
  );
};

export default ChapterLayout;
