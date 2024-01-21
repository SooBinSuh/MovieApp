import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IGenre} from '../@types/IGenre';
import {IMovie} from '../@types/IMovie';
import {APIConstants} from '../constants/APIConstants';

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

// Redux Toolkit Query version
export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({baseUrl: APIConstants.API_URL}),
  endpoints: builder => ({
    getGenres: builder.query<{genres:Array<IGenre>}, void>({
      query: () => `genre/movie/list?api_key=${APIConstants.API_KEY}`
    }),
    getMoviesByGenreId: builder.query<{results:Array<IMovie>},number>({
      query:(genreId) => `discover/movie?with_genres=${genreId}&api_key=${APIConstants.API_KEY}`
    }),
    getMovieById: builder.query<IMovie | undefined, number>({
      query:(movieId)=> `movie/${movieId}`
    })
  }),
});



export const {useGetGenresQuery,useGetMoviesByGenreIdQuery} = movieApi

