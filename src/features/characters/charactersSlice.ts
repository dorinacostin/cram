import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ResponseCharacterType, ResponsePlanetType, ResponsType } from '../../type';

type ResultsCharacterType = ResponsType & {
    results: ResponseCharacterType[];
}

type ResultsPlanetType = ResponsType & {
    results: ResponsePlanetType[];
}

type CharactersType = {
    characters: ResultsCharacterType;
    planets: ResultsPlanetType;
    loading?: boolean;
    error?: string | null;
}

const initialState: CharactersType = {
    loading: true,
    characters: {
        count: 1,
        next: '',
        previous: '',
        results: []
    },
    planets: {
        count: 1,
        next: '',
        previous: '',
        results: []
    },
    error: null
}

export const fetchCharacters =  createAsyncThunk('characters/fetchCharacters', async ({ query, page }: { query: string, page: number }) => {
   try {
        const characters = await axios.get(`https://swapi.dev/api/people/?search=${query}&page=${page}`);
        const planets = await axios.get(`https://swapi.dev/api/planets/`);

        return {
            characters: characters.data,
            planets: planets.data,
        };
    } catch (error) {
       console.log(error)
    }
 })

 const charactersSlice = createSlice({
    name: 'characters',
    reducers: {},
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchCharacters.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchCharacters.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.characters = action.payload.characters;
            state.planets = action.payload.planets;
            state.error = null
        })
        builder.addCase(fetchCharacters.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.characters = {
                count: 1,
                next: '',
                previous: '',
                results: []
            };
            state.planets = {
                count: 1,
                next: '',
                previous: '',
                results: []
            };
            state.error = action.payload || 'Failed to fetch data';
        })
    }
})

export default charactersSlice.reducer