/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * SyllabusAI API
 * AI powered learning
 * OpenAPI spec version: 1.0.0
 */
import {
  useMutation
} from '@tanstack/react-query'
import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query'
import type {
  ChaptersGenerationResponse,
  GenerateChapterRequest,
  GenerateChapterResponse,
  GenerateChaptersRequest,
  GenerateQuizRequest,
  GenerateQuizResponse,
  HTTPValidationError
} from '../../apiSchemas'
import { apiFetcher } from '../../apiFetcher';
import type { ErrorType } from '../../apiFetcher';


type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];


/**
 * @summary Generate Chapters
 */
export const generateChapters = (
    generateChaptersRequest: GenerateChaptersRequest,
 options?: SecondParameter<typeof apiFetcher>,) => {
      
      
      return apiFetcher<ChaptersGenerationResponse>(
      {url: `/generation/chapters`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: generateChaptersRequest
    },
      options);
    }
  


export const getGenerateChaptersMutationOptions = <TError = ErrorType<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof generateChapters>>, TError,{data: GenerateChaptersRequest}, TContext>, request?: SecondParameter<typeof apiFetcher>}
): UseMutationOptions<Awaited<ReturnType<typeof generateChapters>>, TError,{data: GenerateChaptersRequest}, TContext> => {
const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof generateChapters>>, {data: GenerateChaptersRequest}> = (props) => {
          const {data} = props ?? {};

          return  generateChapters(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type GenerateChaptersMutationResult = NonNullable<Awaited<ReturnType<typeof generateChapters>>>
    export type GenerateChaptersMutationBody = GenerateChaptersRequest
    export type GenerateChaptersMutationError = ErrorType<HTTPValidationError>

    /**
 * @summary Generate Chapters
 */
export const useGenerateChapters = <TError = ErrorType<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof generateChapters>>, TError,{data: GenerateChaptersRequest}, TContext>, request?: SecondParameter<typeof apiFetcher>}
): UseMutationResult<
        Awaited<ReturnType<typeof generateChapters>>,
        TError,
        {data: GenerateChaptersRequest},
        TContext
      > => {

      const mutationOptions = getGenerateChaptersMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * @summary Generate Chapter
 */
export const generateChapter = (
    generateChapterRequest: GenerateChapterRequest,
 options?: SecondParameter<typeof apiFetcher>,) => {
      
      
      return apiFetcher<GenerateChapterResponse>(
      {url: `/generation/chapter`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: generateChapterRequest
    },
      options);
    }
  


export const getGenerateChapterMutationOptions = <TError = ErrorType<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof generateChapter>>, TError,{data: GenerateChapterRequest}, TContext>, request?: SecondParameter<typeof apiFetcher>}
): UseMutationOptions<Awaited<ReturnType<typeof generateChapter>>, TError,{data: GenerateChapterRequest}, TContext> => {
const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof generateChapter>>, {data: GenerateChapterRequest}> = (props) => {
          const {data} = props ?? {};

          return  generateChapter(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type GenerateChapterMutationResult = NonNullable<Awaited<ReturnType<typeof generateChapter>>>
    export type GenerateChapterMutationBody = GenerateChapterRequest
    export type GenerateChapterMutationError = ErrorType<HTTPValidationError>

    /**
 * @summary Generate Chapter
 */
export const useGenerateChapter = <TError = ErrorType<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof generateChapter>>, TError,{data: GenerateChapterRequest}, TContext>, request?: SecondParameter<typeof apiFetcher>}
): UseMutationResult<
        Awaited<ReturnType<typeof generateChapter>>,
        TError,
        {data: GenerateChapterRequest},
        TContext
      > => {

      const mutationOptions = getGenerateChapterMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * @summary Generate Quiz
 */
export const generateQuiz = (
    generateQuizRequest: GenerateQuizRequest,
 options?: SecondParameter<typeof apiFetcher>,) => {
      
      
      return apiFetcher<GenerateQuizResponse>(
      {url: `/generation/quiz`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: generateQuizRequest
    },
      options);
    }
  


export const getGenerateQuizMutationOptions = <TError = ErrorType<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof generateQuiz>>, TError,{data: GenerateQuizRequest}, TContext>, request?: SecondParameter<typeof apiFetcher>}
): UseMutationOptions<Awaited<ReturnType<typeof generateQuiz>>, TError,{data: GenerateQuizRequest}, TContext> => {
const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof generateQuiz>>, {data: GenerateQuizRequest}> = (props) => {
          const {data} = props ?? {};

          return  generateQuiz(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type GenerateQuizMutationResult = NonNullable<Awaited<ReturnType<typeof generateQuiz>>>
    export type GenerateQuizMutationBody = GenerateQuizRequest
    export type GenerateQuizMutationError = ErrorType<HTTPValidationError>

    /**
 * @summary Generate Quiz
 */
export const useGenerateQuiz = <TError = ErrorType<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof generateQuiz>>, TError,{data: GenerateQuizRequest}, TContext>, request?: SecondParameter<typeof apiFetcher>}
): UseMutationResult<
        Awaited<ReturnType<typeof generateQuiz>>,
        TError,
        {data: GenerateQuizRequest},
        TContext
      > => {

      const mutationOptions = getGenerateQuizMutationOptions(options);

      return useMutation(mutationOptions);
    }
    