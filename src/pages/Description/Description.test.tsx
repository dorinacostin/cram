import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import characterReducer from '../../features/caracter/caracterSlice';
import favouritesReducer, { addFavourite, removeFavourite } from '../../features/favourites/favouritesSlice';
import Description from './index';

const renderWithProviders = (ui: React.ReactElement, { preloadedState }: any = {}) => {
    const store = configureStore({
        reducer: {
            character: characterReducer,
            favourites: favouritesReducer,
        },
        preloadedState,
    });

    return render(
        <Provider store={store}>
            <Router>
                {ui}
            </Router>
        </Provider>
    );
};

describe('Description Component', () => {
    it('handles add to favourites', async () => {
        const preloadedState = {
            character: {
                loading: false,
                details: { name: 'Leia Organa', eye_color: 'brown', hair_color: 'brown', height: '150', gender: 'female' },
                planet: { name: 'Alderaan' },
                films: [{ title: 'The Empire Strikes Back' }],
                starships: [{ name: 'Millennium Falcon' }],
            },
            favourites: {
                favourites: [],
            },
        };
        const store = configureStore({
            reducer: {
                character: characterReducer,
                favourites: favouritesReducer,
            },
            preloadedState,
        });
        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <Router>
                    <Description />
                </Router>
            </Provider>
        );

        const addButton = screen.getByText('Add Favourite');
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(store.dispatch).toHaveBeenCalledWith(addFavourite({ name: 'Leia Organa', gender: 'female', homePlanet: 'Alderaan' }));
        });
    });

    it('handles remove from favourites', async () => {
        const preloadedState = {
            character: {
                loading: false,
                details: { name: 'Leia Organa', eye_color: 'brown', hair_color: 'brown', height: '150', gender: 'female' },
                planet: { name: 'Alderaan' },
                films: [{ title: 'The Empire Strikes Back' }],
                starships: [{ name: 'Millennium Falcon' }],
            },
            favourites: {
                favourites: [{ name: 'Leia Organa', gender: 'female', homePlanet: 'Alderaan' }],
            },
        };
        const store = configureStore({
            reducer: {
                character: characterReducer,
                favourites: favouritesReducer,
            },
            preloadedState,
        });
        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <Router>
                    <Description />
                </Router>
            </Provider>
        );

        const removeButton = screen.getByText('Remove Favourite');
        fireEvent.click(removeButton);

        await waitFor(() => {
            expect(store.dispatch).toHaveBeenCalledWith(removeFavourite({ name: 'Leia Organa', gender: 'female', homePlanet: 'Alderaan' }));
        });
    });
});
