import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Character from './index';
import { CharacterType } from './type';

const mockCharacter: CharacterType = {
    id: 1,
    name: 'Luke Skywalker',
    image: 'https://via.placeholder.com/300',
    homePlanet: 'Tatooine',
    gender: 'Male',
    isFavourite: false,
    onClick: jest.fn(),
    children: null
};

describe('Character Component', () => {
    it('renders character information correctly', () => {
        render(
            <Router>
                <Character {...mockCharacter} />
            </Router>
        );

        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.getByText('Home planet')).toBeInTheDocument();
        expect(screen.getByText('Tatooine')).toBeInTheDocument();
        expect(screen.getByText('gender')).toBeInTheDocument();
        expect(screen.getByText('Male')).toBeInTheDocument();
        expect(screen.getByText('Add Favourite')).toBeInTheDocument();
    });

    it('calls onClick handler when favourite button is clicked', () => {
        render(
            <Router>
                <Character {...mockCharacter} />
            </Router>
        );

        const button = screen.getByText('Add Favourite');
        fireEvent.click(button);

        expect(mockCharacter.onClick).toHaveBeenCalledWith({ name: 'Luke Skywalker', gender: 'Male', homePlanet: 'Tatooine' });
    });

    it('renders the link to character details correctly', () => {
        render(
            <Router>
                <Character {...mockCharacter} />
            </Router>
        );

        const link = screen.getByText('Character details');
        expect(link).toBeInTheDocument();
        expect(link.closest('a')).toHaveAttribute('href', '/1');
    });

    it('renders children when provided', () => {
        const childText = 'Additional Info';
        render(
            <Router>
                <Character {...mockCharacter}>
                    <div>{childText}</div>
                </Character>
            </Router>
        );

        expect(screen.getByText(childText)).toBeInTheDocument();
    });
});