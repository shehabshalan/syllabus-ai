import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChapterCard from "@/components/ChapterCard";
import { Sparkles } from "lucide-react";
import CardSkeleton from "@/components/CardSkeleton";
import { CHAPTER_FUNCTION } from "@/utils/openaiFunctions";
import { Chapter } from "../../global";
import { ENDPOINTS } from "@/utils/endpoints";
import request from "@/utils/request";
import { TASK } from "@/utils/tasks";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  const { t } = useTranslation();
  const [query, setQuery] = useState<string>("");
  const [searchCount, setSearchCount] = useState<number>(0);
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [error, setError] = useState<boolean>(false);

  const handleQuery = async () => {
    if (searchCount < 5) {
      setChapters([]);
      setError(false);
      setIsQuerying(true);
      try {
        const response = await request.post(ENDPOINTS.GENERATE_CHAPTERS, {
          functionCall: CHAPTER_FUNCTION,
          query,
          task: TASK.CHAPTER,
        });
        console.log("response", response);
        setChapters(response.data);
        localStorage.setItem("chapters", JSON.stringify(response.data));
        setSearchCount(searchCount + 1);
        localStorage.setItem("cntr", (searchCount + 1).toString());
      } catch (e) {
        alert(e);
        setError(true);
      } finally {
        setIsQuerying(false);
      }
    }
  };

  useEffect(() => {
    const chapters = localStorage.getItem("chapters");
    if (chapters) {
      setChapters(JSON.parse(chapters));
    }
    const storedCount = localStorage.getItem("cntr");
    if (storedCount) {
      setSearchCount(parseInt(storedCount));
    }
  }, []);

  return (
    <section className="container mt-12 gap-6 pb-8 pt-6 md:py-10">
      {searchCount < 5 ? (
        <div className="flex max-w-[700px] mx-auto flex-col items-center justify-center gap-6">
          <h1 className="text-xl md:text-4xl sm:text-lg font-bold leading-tight tracking-tighter">
            {/* Learn <span className="underline">anything</span> with SyllabusAI */}
            {t("home.title")}
          </h1>

          <p>
            ({searchCount}/<span className="font-bold ">5</span>){" "}
            {t("home.queries")}
          </p>
          <div className="flex w-full items-center space-x-2">
            <div className="relative flex-grow">
              <Input
                className="h-12 pr-12 "
                type="text"
                placeholder={t("home.placeholder")}
                value={query}
                disabled={isQuerying}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button
                className="absolute top-0 right-0 h-full px-4 rounded-tl-none rounded-bl-none"
                type="submit"
                disabled={isQuerying || query.length === 0}
                onClick={handleQuery}
              >
                <Sparkles className="mr-2 h-4 w-4" /> {t("home.learn")}
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{t("home.hint")}</p>
        </div>
      ) : (
        <div className="flex max-w-[700px] mx-auto flex-col items-center justify-center gap-6">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl ">
            {t("home.limit")}
          </h1>
        </div>
      )}
      {isQuerying || chapters.length > 0 ? (
        <section
          id="features"
          className="container space-y-6 bg-zinc-50 py-8 dark:bg-transparent md:py-12 lg:py-12 mt-12"
        >
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {isQuerying ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : null}

            {chapters && chapters.length > 0
              ? chapters.map((chapter) => (
                  <ChapterCard key={chapter.slug} chapter={chapter} />
                ))
              : null}
          </div>
          <div className="mx-auto text-center md:max-w-[58rem]">
            <p className="text-sm text-muted-foreground">
              {t("home.disclaimer")}
            </p>
          </div>
        </section>
      ) : null}

      {/* error display */}
      {error ? (
        <div className="flex flex-col items-center justify-center mt-12">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl mb-4 ">
            {t("home.notfound")}
          </h1>
        </div>
      ) : null}
    </section>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
}
