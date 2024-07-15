import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from 'react-router-dom';
import Header from "./index";

describe("Header Component", () => {
    it("renders the header with title and links", () => {
        const title = "Star Wars Characters";
        render(
            <BrowserRouter>
                <Header title={title} />
            </BrowserRouter>
        );
        
        const headerTitle = screen.getByTestId('header-title');
        expect(headerTitle).toBeInTheDocument();
        expect(headerTitle).toHaveTextContent(title);

        const homeLink = screen.getByTestId('home-link');
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute('href', '/');
        expect(homeLink).toHaveTextContent('Home');

        const favouritesLink = screen.getByTestId('favourites-link');
        expect(favouritesLink).toBeInTheDocument();
        expect(favouritesLink).toHaveAttribute('href', '/favourites');
        expect(favouritesLink).toHaveTextContent('Favourites');
    });
});
