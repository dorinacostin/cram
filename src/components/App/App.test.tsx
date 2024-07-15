import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom/extend-expect";
import App from "./index";

jest.mock('../../pages/Home', () => () => <div>Home Page</div>);
jest.mock('../../pages/Favourites', () => () => <div>Favourites Page</div>);
jest.mock('../../pages/Description', () => () => <div>Description Page</div>);

describe("App Component", () => {
    it("renders Home component for the default route", () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText('Home Page')).toBeInTheDocument();
    });

    it("renders Favourites component for the /favourites route", () => {
        render(
            <MemoryRouter initialEntries={['/favourites']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText('Favourites Page')).toBeInTheDocument();
    });

    it("renders Description component for a dynamic /:id route", () => {
        render(
            <MemoryRouter initialEntries={['/1']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText('Description Page')).toBeInTheDocument();
    });
});