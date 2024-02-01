import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {IGenre} from '../@types/IGenre';
import {IMovie} from '../@types/IMovie';
import {APIConstants} from '../constants/APIConstants';
import {current} from '@reduxjs/toolkit';

const createFullAPIPath: (path: string) => string = path => {
  return (
    APIConstants.API_URL +
    path +
    (path.includes('?') ? '&' : '?') +
    'api_key=' +
    APIConstants.API_KEY
  );
};

async function makeAPICall<T>(path: string): Promise<T> {
  console.log(createFullAPIPath(path));
  const response = await fetch(createFullAPIPath(path));
  return response.json() as Promise<T>;
}

// const getGenres = async (): Promise<Array<IGenre>> => {
//   let resultData : Array<IGenre> = [];
//   try{
//     const data = await makeAPICall<{genres:Array<IGenre>}>('genre/movie/list');
//     resultData = data.genres;
//   }catch(e){
//     console.log(e);
//   }
//   return resultData;
// };

const getMovieByGenreId = async (genreId: number): Promise<Array<IMovie>> => {
  let data: Array<IMovie> = [];
  try {
    const response = await makeAPICall<{
      page: number;
      results: Array<IMovie>;
    }>('discover/movie?with_genres=' + genreId);
    data = response.results;
  } catch (e) {
    console.log(e);
  }
  return data;
};

// const getMovieById = async (movieId: number): Promise<IMovie | undefined> => {
//   try {
//     const response = await makeAPICall<IMovie | undefined>('movie/' + movieId);
//     console.log(response);
//     return response;
//   } catch (e) {
//     console.log(e);
//   }
// };

// export {getMovieByGenreId, getMovieById};

type ApiResponse<T = any> = {
  data: T;
  status: number;
};
type ListResponse<T> = {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
};
type GetMovieByTitleQuery = {
  keyword: string;
  page?: number;
};
// Redux Toolkit Query version
// export const movieApi = createApi({
//   reducerPath: 'movieApi',
//   baseQuery: fetchBaseQuery({baseUrl: APIConstants.API_URL}),
//   endpoints: builder => ({
//     getGenres: builder.query<{genres:Array<IGenre>}, void>({
//       query: () => `genre/movie/list?api_key=${APIConstants.API_KEY}`
//     }),
//     getMoviesByGenreId: builder.query<{results:Array<IMovie>},number>({
//       query:(genreId) => `discover/movie?with_genres=${genreId}&api_key=${APIConstants.API_KEY}`
//     }),
//     getMovieById: builder.query<IMovie | undefined, number>({
//       query:(movieId)=> `movie/${movieId}`
//     })
//   }),
// });

const baseQuery: BaseQueryFn = fetchBaseQuery({baseUrl: APIConstants.API_URL});

const loggingFetchBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  const startTime = Date.now();

  try {
    // Log request details
    console.log(`API Request: ${args.url}`, args);

    const result = await baseQuery(args, api, extraOptions);
    // Log response details
    console.log(
      `API Response: ${args.url}`,
      JSON.stringify({
        data: result.data,
        duration: Date.now() - startTime,
        // Add more properties as needed
      }),
    );
    return result;
  } catch (error) {
    // Log error details
    console.error(`API Error: ${args.url}`, error);
    return {error};
  }
};

export const movieApi = createApi({
  reducerPath: 'movieApi',
  // baseQuery: loggingFetchBaseQuery,
  baseQuery: baseQuery,
  endpoints: builder => ({
    getGenres: builder.query<{genres: Array<IGenre>}, void>({
      query: () => `/genre/movie/list?api_key=${APIConstants.API_KEY}`,
    }),
    getMoviesByGenreId: builder.query<{results: Array<IMovie>}, number>({
      query: genreId =>
        `discover/movie?with_genres=${genreId}&api_key=${APIConstants.API_KEY}`,
      // keepUnusedDataFor:0.0001,//disables caching
    }),
    getMovieById: builder.query<IMovie | undefined, number>({
      query: movieId => `movie/${movieId}`,
    }),
    getMovieByTitle: builder.query<{results: Array<IMovie>}, string>({
      query: title =>
        `search/movie?query=${title}&api_key=${APIConstants.API_KEY}`,
    }),
    getMovieByTitlePaged: builder.query<
      ListResponse<IMovie>,
      GetMovieByTitleQuery
    >({
      query: params =>
        `search/movie?query=${params.keyword}&page=${
          params.page ?? 1
        }&api_key=${APIConstants.API_KEY}`,
        
      serializeQueryArgs: ({queryArgs}) => {
        const newArgs = {...queryArgs};
        if (newArgs.page) {
          delete newArgs.page;
        }
        console.log('queryargs:', newArgs);
        return newArgs;
      },
      merge: (currentCache, newItems) => {
        console.log('in merge, currCache:',JSON.stringify(currentCache),' \n\nnewitems:',JSON.stringify(newItems) );
        if(currentCache.page >= newItems.page){
          return newItems
        }
        
        if (
          !currentCache ||
          !currentCache.results ||
          currentCache.page > newItems.page
        ) {
          return newItems;
        }
        return {
          ...newItems,
          results: [...currentCache.results, ...newItems.results],
        };
      },
      forceRefetch({currentArg, previousArg}) {
        console.log('forceRefetch curkey:',currentArg?.keyword,' prevkey:',previousArg?.keyword);
        console.log('forceRefetch curpage:',currentArg?.page,' prevpage:',previousArg?.page);
        return currentArg?.page !== previousArg?.page
      },
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesByGenreIdQuery,
  useGetMovieByTitleQuery,
  useGetMovieByTitlePagedQuery,
} = movieApi;
