import { useGetChapter } from '@/api/apiHooks/user/user';
import Container from '@/components/ui/container';
import { useParams } from 'react-router';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { StateWrapper } from '@/components/StateWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Chapter = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetChapter(Number(id));
  const invalidId = isNaN(Number(id));

  return (
    <StateWrapper
      isLoading={isLoading}
      isError={isError || invalidId}
      isEmpty={!data}
      loadingMessage="We are loading your chapter..."
      errorMessage={
        invalidId ? 'Oops! Invalid chapter id.' : 'Oops! An error occurred.'
      }
      emptyMessage="Oops! No content for this chapter found."
    >
      <Container className="mt-12 gap-6 pb-8 pt-6 md:py-10">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl md:text-4xl sm:text-lg font-bold leading-tight tracking-tighter">
              {data?.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none px-8 ">
            <div className="overflow-x-auto space-y-4">
              <Markdown
                remarkPlugins={[remarkGfm]}
                className="break-words text-base leading-relaxed"
                components={{
                  pre: ({ children }) => (
                    <pre className="overflow-x-auto p-4 bg-muted rounded-md my-4">
                      {children}
                    </pre>
                  ),
                  code: ({ children }) => (
                    <code className="overflow-x-auto whitespace-pre-wrap bg-muted px-1.5 py-0.5 rounded">
                      {children}
                    </code>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-4 border rounded-md">
                      <table className="w-full">{children}</table>
                    </div>
                  ),
                  p: ({ children }) => (
                    <p className="my-4 leading-7">{children}</p>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-semibold mt-6 mb-3">
                      {children}
                    </h2>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 my-4 space-y-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 my-4 space-y-2">
                      {children}
                    </ol>
                  ),
                }}
              >
                {data?.content}
              </Markdown>
            </div>
          </CardContent>
        </Card>
      </Container>
    </StateWrapper>
  );
};

export default Chapter;
