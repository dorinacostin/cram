import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavouriteCharacterType } from '../../type';

type FavouritesState = {
  favourites: FavouriteCharacterType[];
}

const initialState: FavouritesState = {
  favourites: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<FavouriteCharacterType>) => {
      const existing = state.favourites.find(character => character.name === action.payload.name);
      if (!existing) {
        state.favourites.push(action.payload);
      }
    },
    removeFavourite: (state, action: PayloadAction<FavouriteCharacterType>) => {
      state.favourites = state.favourites.filter(character => character.name !== action.payload.name);
    },
  },
});

export default favouritesSlice.reducer;
export const { addFavourite, removeFavourite } = favouritesSlice.actions;