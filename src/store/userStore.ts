import {create} from 'zustand';
import {IMovie} from '../@types/IMovie';
import {persist} from 'zustand/middleware';
import { IUser } from '../@types/IUser';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// type UserStoreFunctions = {
//   addFav: (fav: IMovie) => void;
//   addFavById: (favId: number) => void;
//   removeFav: (favId: number) => void;
// };
// export const useUserStore = create(
//   persist<IUser & UserStoreFunctions>(
//     (set, get) => ({
//       name: 'John',
//       favs: {},
//       addFav: () => {},
//       addFavById: () => {},
//       removeFav:()=>{},
//     }),
//     {
//       name: 'HYDRAGE::USER',
//     },
//   ),
// );

//reducer for user
// export const user = {
//   name:'Jack',
//   favs:{},
  
// }
const initialState = {name:'Jack',favs:{}} as IUser
const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    addFav: (state,action:PayloadAction<IMovie>) => {
      if (state.favs[action.payload.id] === undefined){
        state.favs[action.payload.id] = action.payload;
      }
    },
    removeFav:(state,action:PayloadAction<number>)=>{
      if(state.favs[action.payload] !== undefined){
        delete state.favs[action.payload];
      }
    }
  }
})

export const {addFav,removeFav} = userSlice.actions
export default userSlice.reducer