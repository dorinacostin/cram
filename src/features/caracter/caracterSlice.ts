import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMultipleDetails } from '../../utils';
import { CharacterDetailType, FilmType, PlanetType, StarshipType } from '../../type';

type CharacterType = {
    details: CharacterDetailType;
    planet: PlanetType;
    films: FilmType[];
    starships: StarshipType[];
    loading?: boolean;
    error?: string | null;
}

const initialState: CharacterType = {
    details: {
        name: '',
        height: '',
        mass: '',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        gender: ''
    },
    planet: {
        url: '',
        name: '',
    },
    films: [],
    starships: [],
    loading: true,
    error: null
}

export const fetchCharacterById =  createAsyncThunk('character/fetchCharacterById', async ({ id }: { id?: string }) => {
    try {
        const { data: details } = await axios.get(`https://swapi.dev/api/people/${id}`);
        const [planet, films, starships] = await Promise.all([
            axios.get(details.homeworld),
            fetchMultipleDetails(details.films),
            fetchMultipleDetails(details.starships)
        ]);
        return { details, planet: planet?.data, films, starships };
    } catch (error) {
       console.log(error)
    }
 })
 
 const characterSlice = createSlice({
    name: 'character',
    reducers: {},
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchCharacterById.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchCharacterById.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.details = action.payload?.details
            state.planet = action.payload?.planet
            state.films = action.payload?.films
            state.starships = action.payload?.starships
            state.error = ''
        })
        builder.addCase(fetchCharacterById.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.details = {
                name: '',
                height: '',
                mass: '',
                hair_color: '',
                skin_color: '',
                eye_color: '',
                gender: ''
            }
            state.error = action.payload || 'Failed to fetch data';
        })
    }
})

export default characterSlice.reducer