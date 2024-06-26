/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * III-Exhibition works-HAI
 * API specification for interactions between Frontend, Backend, and Cloud Storage.
 * OpenAPI spec version: 1.0.0
 */
import {
  useMutation,
  useQuery,
  useSuspenseQuery
} from '@tanstack/react-query'
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult
} from '@tanstack/react-query'
import axios from 'axios'
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import type {
  GetAiDrawing200,
  GetPresignedUrls200,
  PostHumanDrawing200,
  PostHumanDrawing400,
  PostHumanDrawingBody,
  PostResourcePath200,
  PostResourcePath400,
  PostResourcePathBody
} from './model'



/**
 * Upload a human drawing using the presigned URL obtained from /presigned-urls.
 * @summary Upload drawing to storage
 */
export const postHumanDrawing = (
    postHumanDrawingBody: PostHumanDrawingBody, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<PostHumanDrawing200>> => {const formData = new FormData();
formData.append('image', postHumanDrawingBody.image)
formData.append('presigned_url', postHumanDrawingBody.presigned_url)

    
    return axios.post(
      `/human-drawing`,
      formData,options
    );
  }



export const getPostHumanDrawingMutationOptions = <TError = AxiosError<PostHumanDrawing400>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postHumanDrawing>>, TError,{data: PostHumanDrawingBody}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof postHumanDrawing>>, TError,{data: PostHumanDrawingBody}, TContext> => {
const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postHumanDrawing>>, {data: PostHumanDrawingBody}> = (props) => {
          const {data} = props ?? {};

          return  postHumanDrawing(data,axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostHumanDrawingMutationResult = NonNullable<Awaited<ReturnType<typeof postHumanDrawing>>>
    export type PostHumanDrawingMutationBody = PostHumanDrawingBody
    export type PostHumanDrawingMutationError = AxiosError<PostHumanDrawing400>

    /**
 * @summary Upload drawing to storage
 */
export const usePostHumanDrawing = <TError = AxiosError<PostHumanDrawing400>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postHumanDrawing>>, TError,{data: PostHumanDrawingBody}, TContext>, axios?: AxiosRequestConfig}
): UseMutationResult<
        Awaited<ReturnType<typeof postHumanDrawing>>,
        TError,
        {data: PostHumanDrawingBody},
        TContext
      > => {

      const mutationOptions = getPostHumanDrawingMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
/**
 * Post the resource path in storage to BE.
 * @summary Resource path in storage
 */
export const postResourcePath = (
    postResourcePathBody: PostResourcePathBody, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<PostResourcePath200>> => {
    
    return axios.post(
      `/resource-path`,
      postResourcePathBody,options
    );
  }



export const getPostResourcePathMutationOptions = <TError = AxiosError<PostResourcePath400>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postResourcePath>>, TError,{data: PostResourcePathBody}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof postResourcePath>>, TError,{data: PostResourcePathBody}, TContext> => {
const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postResourcePath>>, {data: PostResourcePathBody}> = (props) => {
          const {data} = props ?? {};

          return  postResourcePath(data,axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostResourcePathMutationResult = NonNullable<Awaited<ReturnType<typeof postResourcePath>>>
    export type PostResourcePathMutationBody = PostResourcePathBody
    export type PostResourcePathMutationError = AxiosError<PostResourcePath400>

    /**
 * @summary Resource path in storage
 */
export const usePostResourcePath = <TError = AxiosError<PostResourcePath400>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postResourcePath>>, TError,{data: PostResourcePathBody}, TContext>, axios?: AxiosRequestConfig}
): UseMutationResult<
        Awaited<ReturnType<typeof postResourcePath>>,
        TError,
        {data: PostResourcePathBody},
        TContext
      > => {

      const mutationOptions = getPostResourcePathMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
/**
 * Retrieve presigned URLs for both Human and AI drawings.
 * @summary Get presigned urls
 */
export const getPresignedUrls = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<GetPresignedUrls200>> => {
    
    return axios.get(
      `/presigned-urls`,options
    );
  }


export const getGetPresignedUrlsQueryKey = () => {
    return [`/presigned-urls`] as const;
    }

    
export const getGetPresignedUrlsQueryOptions = <TData = Awaited<ReturnType<typeof getPresignedUrls>>, TError = AxiosError<void>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPresignedUrls>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetPresignedUrlsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getPresignedUrls>>> = ({ signal }) => getPresignedUrls({ signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getPresignedUrls>>, TError, TData> & { queryKey: QueryKey }
}

export type GetPresignedUrlsQueryResult = NonNullable<Awaited<ReturnType<typeof getPresignedUrls>>>
export type GetPresignedUrlsQueryError = AxiosError<void>

/**
 * @summary Get presigned urls
 */
export const useGetPresignedUrls = <TData = Awaited<ReturnType<typeof getPresignedUrls>>, TError = AxiosError<void>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPresignedUrls>>, TError, TData>>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetPresignedUrlsQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetPresignedUrlsSuspenseQueryOptions = <TData = Awaited<ReturnType<typeof getPresignedUrls>>, TError = AxiosError<void>>( options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getPresignedUrls>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetPresignedUrlsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getPresignedUrls>>> = ({ signal }) => getPresignedUrls({ signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseSuspenseQueryOptions<Awaited<ReturnType<typeof getPresignedUrls>>, TError, TData> & { queryKey: QueryKey }
}

export type GetPresignedUrlsSuspenseQueryResult = NonNullable<Awaited<ReturnType<typeof getPresignedUrls>>>
export type GetPresignedUrlsSuspenseQueryError = AxiosError<void>

/**
 * @summary Get presigned urls
 */
export const useGetPresignedUrlsSuspense = <TData = Awaited<ReturnType<typeof getPresignedUrls>>, TError = AxiosError<void>>(
  options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getPresignedUrls>>, TError, TData>>, axios?: AxiosRequestConfig}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetPresignedUrlsSuspenseQueryOptions(options)

  const query = useSuspenseQuery(queryOptions) as  UseSuspenseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Retrieve surrounding AI drawings.
 * @summary Get 4 AI-drawings
 */
export const getAiDrawing = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<GetAiDrawing200>> => {
    
    return axios.get(
      `/ai-drawing`,options
    );
  }


export const getGetAiDrawingQueryKey = () => {
    return [`/ai-drawing`] as const;
    }

    
export const getGetAiDrawingQueryOptions = <TData = Awaited<ReturnType<typeof getAiDrawing>>, TError = AxiosError<void>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAiDrawing>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetAiDrawingQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getAiDrawing>>> = ({ signal }) => getAiDrawing({ signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getAiDrawing>>, TError, TData> & { queryKey: QueryKey }
}

export type GetAiDrawingQueryResult = NonNullable<Awaited<ReturnType<typeof getAiDrawing>>>
export type GetAiDrawingQueryError = AxiosError<void>

/**
 * @summary Get 4 AI-drawings
 */
export const useGetAiDrawing = <TData = Awaited<ReturnType<typeof getAiDrawing>>, TError = AxiosError<void>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAiDrawing>>, TError, TData>>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetAiDrawingQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetAiDrawingSuspenseQueryOptions = <TData = Awaited<ReturnType<typeof getAiDrawing>>, TError = AxiosError<void>>( options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAiDrawing>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetAiDrawingQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getAiDrawing>>> = ({ signal }) => getAiDrawing({ signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAiDrawing>>, TError, TData> & { queryKey: QueryKey }
}

export type GetAiDrawingSuspenseQueryResult = NonNullable<Awaited<ReturnType<typeof getAiDrawing>>>
export type GetAiDrawingSuspenseQueryError = AxiosError<void>

/**
 * @summary Get 4 AI-drawings
 */
export const useGetAiDrawingSuspense = <TData = Awaited<ReturnType<typeof getAiDrawing>>, TError = AxiosError<void>>(
  options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAiDrawing>>, TError, TData>>, axios?: AxiosRequestConfig}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetAiDrawingSuspenseQueryOptions(options)

  const query = useSuspenseQuery(queryOptions) as  UseSuspenseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




