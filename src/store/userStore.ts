import {create} from 'zustand';
import {IMovie} from '../@types/IMovie';
import {persist} from 'zustand/middleware';
import { IUser } from '../@types/IUser';

type UserStoreFunctions = {
  addFav: (fav: IMovie) => void;
  addFavById: (favId: number) => void;
  removeFav: (favId: number) => void;
};
export const useUserStore = create(
  persist<IUser & UserStoreFunctions>(
    (set, get) => ({
      name: 'John',
      favs: {},
      addFav: () => {},
      addFavById: () => {},
      removeFav:()=>{},
    }),
    {
      name: 'HYDRAGE::USER',
    },
  ),
);
