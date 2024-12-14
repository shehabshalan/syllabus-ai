import { useGetTopicChapters } from '@/api/apiHooks/user/user';
import TopicChapters from '@/components/topic/TopicChapters';
import Container from '@/components/ui/container';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useParams } from 'react-router';

const Topic = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useGetTopicChapters(Number(id));

  if (isNaN(Number(id))) {
    return (
      <Container className=" mt-12 gap-6 pb-8 pt-6 md:py-10">
        <h1 className="text-xl md:text-4xl sm:text-lg font-bold leading-tight tracking-tighter text-center">
          Oops! Invalid topic id
        </h1>
      </Container>
    );
  }
  if (isLoading) {
    return <LoadingSpinner message="We are loading your topic..." />;
  }
  if (isError) {
    return (
      <Container className=" mt-12 gap-6 pb-8 pt-6 md:py-10">
        <h1 className="text-xl md:text-4xl sm:text-lg font-bold leading-tight tracking-tighter text-center">
          Oops! An error occurred
        </h1>
      </Container>
    );
  }
  if (!data) {
    return (
      <Container className=" mt-12 gap-6 pb-8 pt-6 md:py-10">
        <h1 className="text-xl md:text-4xl sm:text-lg font-bold leading-tight tracking-tighter text-center">
          Oops! No data found
        </h1>
      </Container>
    );
  }
  return (
    <Container className=" mt-12 gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-xl md:text-4xl sm:text-lg font-bold leading-tight tracking-tighter ">
        {data.title} - ({data.chapters.length} chapters)
      </h1>
      <TopicChapters chapters={data.chapters} />
    </Container>
  );
};

export default Topic;
