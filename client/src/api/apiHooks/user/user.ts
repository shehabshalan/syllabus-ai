/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * SyllabusAI API
 * AI powered learning
 * OpenAPI spec version: 1.0.0
 */
import {
  useMutation,
  useQuery
} from '@tanstack/react-query'
import type {
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type {
  AuthRequest,
  GetTopicChaptersResponse,
  HTTPValidationError,
  UserResponse,
  UserTopics
} from '../../apiSchemas'
import { apiFetcher } from '../../apiFetcher';
import type { ErrorType } from '../../apiFetcher';


type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];


/**
 * @summary Auth
 */
export const auth = (
    authRequest: AuthRequest,
 options?: SecondParameter<typeof apiFetcher>,) => {
      
      
      return apiFetcher<UserResponse>(
      {url: `/user/auth`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: authRequest
    },
      options);
    }
  


export const getAuthMutationOptions = <TError = ErrorType<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof auth>>, TError,{data: AuthRequest}, TContext>, request?: SecondParameter<typeof apiFetcher>}
): UseMutationOptions<Awaited<ReturnType<typeof auth>>, TError,{data: AuthRequest}, TContext> => {
const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof auth>>, {data: AuthRequest}> = (props) => {
          const {data} = props ?? {};

          return  auth(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type AuthMutationResult = NonNullable<Awaited<ReturnType<typeof auth>>>
    export type AuthMutationBody = AuthRequest
    export type AuthMutationError = ErrorType<HTTPValidationError>

    /**
 * @summary Auth
 */
export const useAuth = <TError = ErrorType<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof auth>>, TError,{data: AuthRequest}, TContext>, request?: SecondParameter<typeof apiFetcher>}
): UseMutationResult<
        Awaited<ReturnType<typeof auth>>,
        TError,
        {data: AuthRequest},
        TContext
      > => {

      const mutationOptions = getAuthMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * @summary Me
 */
export const me = (
    
 options?: SecondParameter<typeof apiFetcher>,signal?: AbortSignal
) => {
      
      
      return apiFetcher<UserResponse>(
      {url: `/user/me`, method: 'GET', signal
    },
      options);
    }
  

export const getMeQueryKey = () => {
    return [`/user/me`] as const;
    }

    
export const getMeQueryOptions = <TData = Awaited<ReturnType<typeof me>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof me>>, TError, TData>>, request?: SecondParameter<typeof apiFetcher>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getMeQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof me>>> = ({ signal }) => me(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof me>>, TError, TData> & { queryKey: QueryKey }
}

export type MeQueryResult = NonNullable<Awaited<ReturnType<typeof me>>>
export type MeQueryError = ErrorType<unknown>


export function useMe<TData = Awaited<ReturnType<typeof me>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof me>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof me>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof apiFetcher>}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey }
export function useMe<TData = Awaited<ReturnType<typeof me>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof me>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof me>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof apiFetcher>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey }
export function useMe<TData = Awaited<ReturnType<typeof me>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof me>>, TError, TData>>, request?: SecondParameter<typeof apiFetcher>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey }
/**
 * @summary Me
 */

export function useMe<TData = Awaited<ReturnType<typeof me>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof me>>, TError, TData>>, request?: SecondParameter<typeof apiFetcher>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getMeQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary Get Topic Chapters
 */
export const getTopicChapters = (
    id: number,
 options?: SecondParameter<typeof apiFetcher>,signal?: AbortSignal
) => {
      
      
      return apiFetcher<GetTopicChaptersResponse>(
      {url: `/user/topic/${id}`, method: 'GET', signal
    },
      options);
    }
  

export const getGetTopicChaptersQueryKey = (id: number,) => {
    return [`/user/topic/${id}`] as const;
    }

    
export const getGetTopicChaptersQueryOptions = <TData = Awaited<ReturnType<typeof getTopicChapters>>, TError = ErrorType<HTTPValidationError>>(id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTopicChapters>>, TError, TData>>, request?: SecondParameter<typeof apiFetcher>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetTopicChaptersQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTopicChapters>>> = ({ signal }) => getTopicChapters(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getTopicChapters>>, TError, TData> & { queryKey: QueryKey }
}

export type GetTopicChaptersQueryResult = NonNullable<Awaited<ReturnType<typeof getTopicChapters>>>
export type GetTopicChaptersQueryError = ErrorType<HTTPValidationError>


export function useGetTopicChapters<TData = Awaited<ReturnType<typeof getTopicChapters>>, TError = ErrorType<HTTPValidationError>>(
 id: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTopicChapters>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getTopicChapters>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof apiFetcher>}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey }
export function useGetTopicChapters<TData = Awaited<ReturnType<typeof getTopicChapters>>, TError = ErrorType<HTTPValidationError>>(
 id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTopicChapters>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getTopicChapters>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof apiFetcher>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey }
export function useGetTopicChapters<TData = Awaited<ReturnType<typeof getTopicChapters>>, TError = ErrorType<HTTPValidationError>>(
 id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTopicChapters>>, TError, TData>>, request?: SecondParameter<typeof apiFetcher>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey }
/**
 * @summary Get Topic Chapters
 */

export function useGetTopicChapters<TData = Awaited<ReturnType<typeof getTopicChapters>>, TError = ErrorType<HTTPValidationError>>(
 id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTopicChapters>>, TError, TData>>, request?: SecondParameter<typeof apiFetcher>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetTopicChaptersQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary Get Topics
 */
export const getTopics = (
    
 options?: SecondParameter<typeof apiFetcher>,signal?: AbortSignal
) => {
      
      
      return apiFetcher<UserTopics[]>(
      {url: `/user/topics`, method: 'GET', signal
    },
      options);
    }
  

export const getGetTopicsQueryKey = () => {
    return [`/user/topics`] as const;
    }

    
export const getGetTopicsQueryOptions = <TData = Awaited<ReturnType<typeof getTopics>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTopics>>, TError, TData>>, request?: SecondParameter<typeof apiFetcher>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetTopicsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTopics>>> = ({ signal }) => getTopics(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getTopics>>, TError, TData> & { queryKey: QueryKey }
}

export type GetTopicsQueryResult = NonNullable<Awaited<ReturnType<typeof getTopics>>>
export type GetTopicsQueryError = ErrorType<unknown>


export function useGetTopics<TData = Awaited<ReturnType<typeof getTopics>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTopics>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getTopics>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof apiFetcher>}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey }
export function useGetTopics<TData = Awaited<ReturnType<typeof getTopics>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTopics>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getTopics>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof apiFetcher>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey }
export function useGetTopics<TData = Awaited<ReturnType<typeof getTopics>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTopics>>, TError, TData>>, request?: SecondParameter<typeof apiFetcher>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey }
/**
 * @summary Get Topics
 */

export function useGetTopics<TData = Awaited<ReturnType<typeof getTopics>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTopics>>, TError, TData>>, request?: SecondParameter<typeof apiFetcher>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetTopicsQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



