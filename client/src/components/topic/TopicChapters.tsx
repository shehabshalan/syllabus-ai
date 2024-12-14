import { Chapter } from '@/api/apiSchemas';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { useNavigate } from 'react-router';
import { Button } from '../ui/button';

type TopicChaptersProps = {
  chapters: Chapter[];
};
const TopicChapters = ({ chapters }: TopicChaptersProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 py-4 mt-4">
        {chapters.map((chapter, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{chapter.title}</CardTitle>

              <CardDescription>{chapter.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => {
                  navigate(`/chapter/${chapter.id}`);
                }}
              >
                View
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default TopicChapters;
