import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer, { removeFavourite } from '../../features/favourites/favouritesSlice';
import Favourites from './index';

const renderWithProviders = (ui: React.ReactElement, { preloadedState }: any = {}) => {
    const store = configureStore({
        reducer: {
            favourites: favouritesReducer
        },
        preloadedState
    });

    return render(
        <Provider store={store}>
            <Router>
                {ui}
            </Router>
        </Provider>
    );
};

describe('Favourites Component', () => {
    it('renders favourites correctly', () => {
        const preloadedState = {
            favourites: {
                favourites: [
                    { name: 'Luke Skywalker', gender: 'Male', homePlanet: 'Tatooine' },
                    { name: 'Leia Organa', gender: 'Female', homePlanet: 'Alderaan' }
                ]
            }
        };

        renderWithProviders(<Favourites />, { preloadedState });

        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.getByText('Leia Organa')).toBeInTheDocument();
    });

    it('renders NoData when there are no favourites', () => {
        const preloadedState = {
            favourites: {
                favourites: []
            }
        };

        renderWithProviders(<Favourites />, { preloadedState });

        expect(screen.getByText('It looks like there is nothing to display here')).toBeInTheDocument();
    });

    it('calls removeFavourite when the remove button is clicked', () => {
        const preloadedState = {
            favourites: {
                favourites: [
                    { name: 'Luke Skywalker', gender: 'Male', homePlanet: 'Tatooine' }
                ]
            }
        };
        const store = configureStore({
            reducer: {
                favourites: favouritesReducer
            },
            preloadedState
        });
        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <Router>
                    <Favourites />
                </Router>
            </Provider>
        );

        const removeButton = screen.getByText('Remove Favourite');
        fireEvent.click(removeButton);

        expect(store.dispatch).toHaveBeenCalledWith(removeFavourite(preloadedState.favourites.favourites[0]));
    });
});
