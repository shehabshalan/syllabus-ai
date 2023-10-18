import { Sparkles } from "lucide-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <section className=" py-16">
      <div className="container mx-auto text-center">
        <Sparkles className=" w-16 h-16 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold  mb-4">
          {t("about.title")}
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold  mb-4">
          {t("about.subtitle")}
        </h2>
        <p className="text-lg text-gray-600 max-w-full mx-auto mb-10">
          {t("about.description")}
        </p>
      </div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <FeatureCard
          title={t("about.featureSyllabus")}
          description={t("about.featureSyllabusDescription")}
        />
        <FeatureCard
          title={t("about.featureQuiz")}
          description={t("about.featureQuizDescription")}
        />
        <FeatureCard
          title={t("about.featureResources")}
          description={t("about.featureResourcesDescription")}
        />
        <FeatureCard
          title={t("about.featureUpload")}
          description={t("about.featureUploadDescription")}
        />
        <FeatureCard
          title={t("about.featureCollections")}
          description={t("about.featureCollectionsDescription")}
        />
        <FeatureCard
          title={t("about.featureProgress")}
          description={t("about.featureProgressDescription")}
        />
      </div>
    </section>
  );
};

const FeatureCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold  mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default About;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
}
