import { IGenre } from "./IGenre";
import { IMovie } from "./IMovie";

export type MainStackParamList = {
    Home: undefined;
    Genre:{
        genre: IGenre;
    };
    Movie: {
        movie: IMovie|undefined;
    };
};

export type UserStackParamList = {
    User: undefined;
    Movie: {
        movie: IMovie | undefined;
    }
}