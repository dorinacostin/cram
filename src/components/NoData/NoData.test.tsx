import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NoData from "./index";

jest.mock('@mui/icons-material/ManageSearch', () => {
    return function MockIcon() {
        return <div data-testid="manage-search-icon"></div>;
    };
});

describe("NoData Component", () => {
    it("renders the ManageSearchIcon", () => {
        render(<NoData message="No data available" />);
        const iconElement = screen.getByTestId("manage-search-icon");
        expect(iconElement).toBeInTheDocument();
    });

    it("renders the message", () => {
        const message = "No data available";
        render(<NoData message={message} />);
        const messageElement = screen.getByText(message);
        expect(messageElement).toBeInTheDocument();
        expect(messageElement).toHaveTextContent(message);
    });

    it("renders children correctly", () => {
        const message = "No data available";
        render(
            <NoData message={message}>
                <div data-testid="child">Child Content</div>
            </NoData>
        );
        const childElement = screen.getByTestId("child");
        expect(childElement).toBeInTheDocument();
        expect(childElement).toHaveTextContent("Child Content");
    });
});
