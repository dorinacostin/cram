import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from 'react-router-dom';
import Layout from "./index";

describe("Layout Component", () => {
    it("renders the layout with header and children", () => {
        const title = "Test Title";
        const children = <div>Test Children</div>;

        render(
            <BrowserRouter>
                <Layout title={title}>
                    {children}
                </Layout>
            </BrowserRouter>
        );

        const layoutContainer = screen.getByTestId('layout-container');
        expect(layoutContainer).toBeInTheDocument();

        const headerTitle = screen.getByTestId('header-title');
        expect(headerTitle).toBeInTheDocument();
        expect(headerTitle).toHaveTextContent(title);

        const layoutChildren = screen.getByTestId('layout-children');
        expect(layoutChildren).toBeInTheDocument();
        expect(layoutChildren).toHaveTextContent('Test Children');
    });
});
