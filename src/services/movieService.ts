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

async function makeAPICall<T>(path: string): Promise<T>{
  console.log(createFullAPIPath(path));
  const response = await fetch(createFullAPIPath(path));
  return response.json() as Promise<T>;

};

const genres: IGenre[] = require('../../assets/data/genres.json');
const movies: IMovie[] = require('../../assets/data/movies.json');

const getGenres = (): Array<IGenre> => {
  return genres;
};

const getMovies = (): Array<IMovie> => {
  return movies;
};

const getMovieByGenreId = (genreId: number): Array<IMovie> => {
  return movies.filter(movie => movie.genre_ids.indexOf(genreId) > -1);
};

const getMovieById = (movieId: number): IMovie | undefined => {
  return movies.find(movie => movie.id === movieId);
};

export {getGenres, getMovies, getMovieByGenreId, getMovieById};
