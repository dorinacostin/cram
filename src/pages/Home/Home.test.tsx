import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Home from './index';
import charactersReducer from '../../features/characters/charactersSlice';
import favouritesReducer from '../../features/favourites/favouritesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

jest.mock('../../store/hooks');
jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  fetchMultipleDetails: jest.fn()
}));

const mockDispatch = jest.fn();
const mockUseAppSelector = useAppSelector as jest.Mock;
const mockUseAppDispatch = useAppDispatch as jest.Mock;

const renderWithProviders = (ui: React.ReactElement, { preloadedState }: any = {}) => {
    const store = configureStore({
        reducer: {
            characters: charactersReducer,
            favourites: favouritesReducer,
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

describe('Home Component', () => {
    beforeEach(() => {
        mockUseAppDispatch.mockReturnValue(mockDispatch);
        mockUseAppSelector.mockImplementation((callback) => callback({
            characters: {
                characters: { results: [], count: 0 },
                planets: { results: [] },
                loading: false,
                error: null
            },
            favourites: { favourites: [] }
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the Home component correctly', () => {
        renderWithProviders(<Home />);

        expect(screen.getByPlaceholderText('Search character by name')).toBeInTheDocument();
        expect(screen.getByText('No results found. Please try a different search term')).toBeInTheDocument();
    });

    it('renders Character components when there are search results', () => {
        const preloadedState = {
            characters: {
                characters: {
                    results: [
                        { name: 'Luke Skywalker', gender: 'Male', url: 'https://swapi.dev/api/people/1/', homeworld: 'https://swapi.dev/api/planets/1/' }
                    ],
                    count: 1
                },
                planets: {
                    results: [
                        { name: 'Tatooine', url: 'https://swapi.dev/api/planets/1/' }
                    ]
                },
                loading: false,
                error: null
            },
            favourites: { favourites: [] }
        };

        mockUseAppSelector.mockImplementation((callback) => callback(preloadedState));

        renderWithProviders(<Home />, { preloadedState });

        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.getByText('Tatooine')).toBeInTheDocument();
    });
});