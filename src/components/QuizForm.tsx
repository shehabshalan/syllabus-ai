"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Quiz } from "../../global";

interface Answers {
  [key: string]: string;
}

interface QuizFormProps {
  questions: Quiz[];
}
const QuizForm = ({ questions }: QuizFormProps) => {
  const FormSchema = z.object(
    questions.reduce(
      (schema, _, index) => ({
        ...schema,
        [`answer_${index}`]: z.string(),
      }),
      {}
    )
  );
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const checkAnswers = (answers: Answers) => {
    let score = 0;
    questions.forEach((question, index) => {
      const answer = parseInt(answers[`answer_${index}`]);
      if (question.correctOptionIndex === answer) {
        score += 100 / questions.length;
      }
    });
    setScore(score);
    setSubmitted(true);
  };
  function onSubmit(data: z.infer<typeof FormSchema>) {
    checkAnswers(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {questions.map((question, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`answer_${index}` as never}
            render={({ field }) => (
              <>
                <FormItem className="space-y-3">
                  <FormLabel>{question.question}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="flex flex-col space-y-1"
                    >
                      {question.options.map((option, optionIndex) => (
                        <FormItem
                          key={optionIndex}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={optionIndex.toString()} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
        ))}
        {!submitted && <Button type="submit">Submit</Button>}

        {submitted && (
          <div className="flex flex-row  space-x-4 items-center">
            <Button type="button" onClick={() => setSubmitted(false)}>
              Try Again
            </Button>
            <div className="bg-green-600 text-white px-4 py-2 rounded-md">
              <p className="text-base font-bold">
                You scored {score.toFixed(2)}% on the quiz.
              </p>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
};

export default QuizForm;
