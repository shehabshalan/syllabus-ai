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
import { openAiUnstructuredResponse } from "@/utils/openai";

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
      // const response = await openAiUnstructuredResponse({
      //   query,
      //   task: TASK.LESSON,
      // });
      const response = await request.post(ENDPOINTS.GENERATE_LESSON, {
        query,
        task: TASK.LESSON,
      });
      if (response) {
        setContent(response.data);
        localStorage.setItem(chapter.slug, response.data);
      }
    } catch (e) {
      console.log("error", e);
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
      <header className="sticky top-0 border-b ">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
            {chapter?.name}
          </h1>
          <TaskSelector
            tasks={tasks}
            selectedTask={selectedTask as Task}
            setSelectedTask={setSelectedTask}
          />
        </div>
      </header>
      <div className="pt-8 pb-6 md:py-10v">
        <div className="container flex flex-col space-y-6">
          <main className="border rounded">
            <div className="overflow-y-auto max-h-[32rem]">
              <div className="container px-6 py-8">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          </main>
        </div>
      </div>
      {selectedTask && quiz && (
        <div className="container pb-6">
          <h1 className="text-2xl font-semibold  pb-6">Quiz</h1>
          <div className=" border rounded overflow-hidden">
            <div className="px-6 py-8 ">
              <QuizForm questions={quiz} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChapterDetails;
