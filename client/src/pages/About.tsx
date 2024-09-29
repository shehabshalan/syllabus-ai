import Container from '@/components/ui/container';
import { APP_FEATURES } from '@/utils/constants';
import { Sparkles } from 'lucide-react';

const About = () => {
  return (
    <Container className="py-16">
      <div className="text-center">
        <Sparkles className="w-16 h-16 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to SyllabusAI
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-12">
          Your Ultimate Learning Companion
        </h2>
        <p className="text-lg max-w-full mx-auto mb-12">
          At SyllabusAI, we're on a mission to empower learners of all kinds to
          unlock the full potential of their minds and passions. Our platform is
          not just a tool; it's your personal learning companion on the path to
          knowledge. We believe that learning should be a dynamic, engaging, and
          enriching experience, and we've harnessed state-of-the-art Generative
          AI to make that vision a reality.
        </p>
      </div>

      <div className="cmx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <h2 className="text-2xl md:text-3xl font-bold col-span-full mb-4 text-center">
          Features
        </h2>
        {APP_FEATURES.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </Container>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => (
  <div className="p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p>{description}</p>
  </div>
);

export default About;
