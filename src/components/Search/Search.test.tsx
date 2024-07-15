import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Search from "./index";

describe("Search Component", () => {
    const mockOnSearch = jest.fn();
    const query = "test query";

    beforeEach(() => {
        render(<Search query={query} onSearch={mockOnSearch} />);
    });

    it("renders the search input with the correct value", () => {
        const inputElement = screen.getByPlaceholderText('Search character by name');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveValue(query);
    });

    it("calls onSearch function when the input value changes", () => {
        const inputElement = screen.getByPlaceholderText('Search character by name');
        fireEvent.change(inputElement, { target: { value: 'new query' } });
        expect(mockOnSearch).toHaveBeenCalledTimes(1);
    });
});
