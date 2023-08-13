import React, { useEffect, useState } from "react";
import { TaskSelector } from "@/components/TaskSelector";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Chapter, Quiz, Task } from "../../../global";
import { TASK, tasks } from "@/utils/tasks";
import { useRouter } from "next/router";
import ChapterSkeleton from "@/components/ChapterSkeleton";
import { QUIZ_FUNCTION } from "@/utils/openaiFunctions";
import QuizForm from "@/components/QuizForm";
import request from "@/utils/request";
import { ENDPOINTS } from "@/utils/endpoints";

const ChapterDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [chapter, setChapter] = useState<Chapter>();
  const [content, setContent] = useState<string>("");
  const [quiz, setQuiz] = useState<Quiz[]>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isQuerying, setIsQuerying] = useState<boolean>(false);

  const getChapterLesson = async (chapter: Chapter) => {
    setError(false);
    const query = `Chapter name: ${chapter?.name}
                  Chapter description: ${chapter?.description}.`;
    try {
      const response = await request.post(ENDPOINTS.GENERATE_LESSON, {
        query,
        task: TASK.LESSON,
      });
      setContent(response.data);
      localStorage.setItem(chapter.slug, response.data);
    } catch (e) {
      setError(true);
    } finally {
      setIsQuerying(false);
    }
  };

  const getQuiz = async () => {
    setError(false);
    const query = content;
    const quizSlug = `${chapter?.slug}-quiz`;
    const cachedQuiz = JSON.parse(localStorage.getItem(quizSlug) || "[]");

    if (cachedQuiz.length) {
      setQuiz(cachedQuiz);
      setIsQuerying(false);
      return;
    }

    try {
      const response = await request.post(ENDPOINTS.GENERATE_QUIZ, {
        functionCall: QUIZ_FUNCTION,
        query,
        task: TASK.QUIZ,
      });
      setQuiz(response?.data);
      localStorage.setItem(quizSlug, JSON.stringify(response.data));
    } catch (e) {
      setError(true);
    } finally {
      setIsQuerying(false);
    }
  };

  const getChapter = async (slug: string) => {
    setLoading(true);
    const chapters = JSON.parse(localStorage.getItem("chapters") || "[]");
    if (!chapters.length) {
      setLoading(false);
      setError(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
      return;
    }

    const chapter = chapters?.find((chapter: Chapter) => chapter.slug === slug);

    if (chapter) {
      setChapter(chapter);
      const chapterExists = localStorage.getItem(chapter.slug);

      if (chapterExists) {
        setContent(chapterExists);
        setLoading(false);
        return;
      }

      setIsQuerying(true);
      getChapterLesson(chapter);
    } else {
      setError(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (slug) {
      getChapter(slug as string);
    }
  }, [slug, router]);

  useEffect(() => {
    if (selectedTask && chapter) {
      setIsQuerying(true);
      getQuiz();
    }
  }, [selectedTask]);

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
      <div className=" pb-8 pt-6 md:py-10v">
        <div className="flex flex-col space-y-6">
          <div className="container flex flex-col md:flex-row gap-12">
            <main className="flex w-full flex-1 flex-col border rounded">
              <div className="flex-1 overflow-y-auto max-h-[32rem]">
                <div className="container mt-4 mdx">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                  </ReactMarkdown>
                </div>
              </div>
            </main>
          </div>
        </div>
        {selectedTask && quiz && (
          <div className="container mb-4 mt-4">
            <h1 className="text-2xl font-semibold mb-4">Quiz</h1>
            <div className=" flex flex-col md:flex-row gap-12 border rounded">
              <div className="flex-1 overflow-y-auto max-h-[32rem]">
                <div className="container py-5 mdx">
                  <QuizForm questions={quiz} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChapterDetails;
