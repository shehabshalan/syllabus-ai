import { TaskSelector } from "@/components/TaskSelector";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import React, { useEffect, useState } from "react";
import { Chapter, Task } from "../../../global";
import { tasks } from "@/utils/tasks";
import { useRouter } from "next/router";
import ChapterSkeleton from "@/components/ChapterSkeleton";
import { generateLessonFromChapter } from "@/utils/openai";

const ChapterDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [chapter, setChapter] = useState<Chapter>();
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isQuerying, setIsQuerying] = useState<boolean>(false);

  const getChapterLesson = async (chapter: Chapter) => {
    const query = `Chapter name: ${chapter?.name}
                  Chapter description: ${chapter?.description}.`;
    try {
      const response = await generateLessonFromChapter({
        query,
        task: "lesson",
      });

      if (response) {
        setContent(response);
      }
    } catch (e) {
      setError(true);
    } finally {
      setIsQuerying(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    if (slug) {
      const chapters = JSON.parse(localStorage.getItem("chapters") || "[]");

      if (!chapters || chapters.length === 0) {
        setLoading(false);
        setError(true);
        setTimeout(() => {
          router.push("/");
        }, 2000);
        return;
      }
      const chapter = chapters?.find(
        (chapter: Chapter) => chapter.slug === slug
      );
      if (chapter) {
        getChapterLesson(chapter);
        setChapter(chapter);
        setIsQuerying(true);
      } else {
        setError(true);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    }
    setLoading(false);
  }, [slug]);

  if (loading || isQuerying) {
    return <ChapterSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold mb-4">Chapter not found</h1>
        <p className="text-lg text-zinc-500">
          Redirecting to home page in 2 seconds...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col max-h-screen space-y-6 ">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <h1 className="text-2xl font-semibold">{chapter?.name}</h1>
            <TaskSelector
              tasks={tasks}
              selectedTask={selectedTask as Task}
              setSelectedTask={setSelectedTask}
            />
          </div>
        </header>

        <div className="container flex flex-col md:flex-row gap-12">
          <main className="flex w-full flex-1 flex-col border rounded">
            <div className="flex-1 overflow-y-auto max-h-[32rem]">
              <div className="container mt-4 mdx">
                <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ChapterDetails;
