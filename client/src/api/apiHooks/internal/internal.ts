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
import { apiFetcher } from '../../apiFetcher';
import type { ErrorType } from '../../apiFetcher';


type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];


/**
 * @summary Health
 */
export const health = (
    
 options?: SecondParameter<typeof apiFetcher>,signal?: AbortSignal
) => {
      
      
      return apiFetcher<unknown>(
      {url: `/internal/health`, method: 'GET', signal
    },
      options);
    }
  

export const getHealthQueryKey = () => {
    return [`/internal/health`] as const;
    }

    
export const getHealthQueryOptions = <TData = Awaited<ReturnType<typeof health>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof health>>, TError, TData>>, request?: SecondParameter<typeof apiFetcher>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getHealthQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof health>>> = ({ signal }) => health(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof health>>, TError, TData> & { queryKey: QueryKey }
}

export type HealthQueryResult = NonNullable<Awaited<ReturnType<typeof health>>>
export type HealthQueryError = ErrorType<unknown>


export function useHealth<TData = Awaited<ReturnType<typeof health>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof health>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof health>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof apiFetcher>}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey }
export function useHealth<TData = Awaited<ReturnType<typeof health>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof health>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof health>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof apiFetcher>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey }
export function useHealth<TData = Awaited<ReturnType<typeof health>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof health>>, TError, TData>>, request?: SecondParameter<typeof apiFetcher>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey }
/**
 * @summary Health
 */

export function useHealth<TData = Awaited<ReturnType<typeof health>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof health>>, TError, TData>>, request?: SecondParameter<typeof apiFetcher>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getHealthQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary Invalidate Cache
 */
export const invalidateCache = (
    
 options?: SecondParameter<typeof apiFetcher>,) => {
      
      
      return apiFetcher<unknown>(
      {url: `/internal/cache`, method: 'POST'
    },
      options);
    }
  


export const getInvalidateCacheMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof invalidateCache>>, TError,void, TContext>, request?: SecondParameter<typeof apiFetcher>}
): UseMutationOptions<Awaited<ReturnType<typeof invalidateCache>>, TError,void, TContext> => {
const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof invalidateCache>>, void> = () => {
          

          return  invalidateCache(requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type InvalidateCacheMutationResult = NonNullable<Awaited<ReturnType<typeof invalidateCache>>>
    
    export type InvalidateCacheMutationError = ErrorType<unknown>

    /**
 * @summary Invalidate Cache
 */
export const useInvalidateCache = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof invalidateCache>>, TError,void, TContext>, request?: SecondParameter<typeof apiFetcher>}
): UseMutationResult<
        Awaited<ReturnType<typeof invalidateCache>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getInvalidateCacheMutationOptions(options);

      return useMutation(mutationOptions);
    }
    