import {IMovie} from '../@types/IMovie';
import { IUser } from '../@types/IUser';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';


const initialState = {name:'Jack',favs:{}} as IUser;
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
//TODO: Currently, selector function not working becuase of circular dependency between RootStore.ts
// export const selectAllFavs = (state:RootState) => {state.user.favs}//Selector Function to use 

export const {addFav,removeFav} = userSlice.actions
export default userSlice.reducer

//Create selector functions to comfortably edit when changes are made in State structures



