import { useGetTopics } from '@/api/apiHooks/user/user';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router';
import { Progress } from '../ui/progress';
import { LoadingSpinner } from '../ui/loading-spinner';
import Container from '../ui/container';

const UserTopics = () => {
  const { data, isLoading, isError } = useGetTopics();
  const navigate = useNavigate();

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
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 py-4 mt-4">
      {data?.map((topic) => (
        <Card key={topic.id}>
          <CardHeader>
            <CardTitle>{topic.title}</CardTitle>

            <CardDescription>
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {topic.chapter_count} chapters
                </p>
                {topic.progress > 0 && <Progress value={topic.progress} />}
                <p className="text-xs text-muted-foreground">
                  {topic.progress === 0
                    ? 'Ready to start'
                    : `${topic.progress}% completed`}
                </p>
              </div>
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => {
                navigate(`/topic/${topic.id}`);
              }}
            >
              View
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default UserTopics;
