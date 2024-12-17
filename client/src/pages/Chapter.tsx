import { useGetChapter } from '@/api/apiHooks/user/user';
import Container from '@/components/ui/container';
import { useParams } from 'react-router';
import { StateWrapper } from '@/components/common/StateWrapper';
import ChapterLayout from '@/features/Chapter/ChapterLayout';
import ChatWithChapter from '@/features/Chapter/ChatWithChapter';

const Chapter = () => {
  const { id } = useParams<{ id: string }>();
  const { data: chapter, isLoading, isError } = useGetChapter(Number(id));
  const invalidId = isNaN(Number(id));

  return (
    <StateWrapper
      isLoading={isLoading}
      isError={isError || invalidId}
      isEmpty={!chapter}
      loadingMessage="We are loading your chapter..."
      errorMessage={
        invalidId ? 'Oops! Invalid chapter id.' : 'Oops! An error occurred.'
      }
      emptyMessage="Oops! No content for this chapter found."
    >
      <Container className="mt-12 gap-6 pb-8 pt-6 md:py-10">
        <ChapterLayout chapter={chapter} />
        <ChatWithChapter chapter={chapter} />
      </Container>
    </StateWrapper>
  );
};

export default Chapter;
