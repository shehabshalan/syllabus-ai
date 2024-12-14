import UserTopics from '@/components/account/UserTopics';
import Container from '@/components/ui/container';

const Profile = () => {
  return (
    <Container className=" mt-12 gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-xl md:text-4xl sm:text-lg font-bold leading-tight tracking-tighter">
        Profile - My Topics
      </h1>
      <UserTopics />
    </Container>
  );
};

export default Profile;
