import { configureStore } from "@reduxjs/toolkit"
import charactersReducer from '../features/characters/charactersSlice'
import favouritesReducer from '../features/favourites/favouritesSlice'
import characterReducer from '../features/caracter/caracterSlice'

const store = configureStore({
    reducer: {
        characters: charactersReducer,
        favourites: favouritesReducer, 
        character: characterReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch