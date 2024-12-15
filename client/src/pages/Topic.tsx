import { useGetTopicChapters } from '@/api/apiHooks/user/user';
import { StateWrapper } from '@/components/StateWrapper';
import TopicChapters from '@/components/topic/TopicChapters';
import Container from '@/components/ui/container';
import { useParams } from 'react-router';

const Topic = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetTopicChapters(Number(id));
  const invalidId = isNaN(Number(id));

  return (
    <StateWrapper
      isLoading={isLoading}
      isError={isError || invalidId}
      isEmpty={!data}
      loadingMessage="We are loading your topic..."
      errorMessage={
        invalidId ? 'Oops! Invalid topic id.' : 'Oops! An error occurred.'
      }
      emptyMessage="Oops! No chapters found for this topic."
    >
      <Container className=" mt-12 gap-6 pb-8 pt-6 md:py-10">
        <h1 className="text-xl md:text-4xl sm:text-lg font-bold leading-tight tracking-tighter ">
          {data?.title} - ({data?.chapters.length} chapters)
        </h1>
        <TopicChapters chapters={data?.chapters || []} />
      </Container>
    </StateWrapper>
  );
};

export default Topic;
