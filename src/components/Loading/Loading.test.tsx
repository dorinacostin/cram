import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Loading from "./index";

describe("Loading Component", () => {
    it("renders the loading skeletons", () => {
        render(<Loading />);
        
        const rectSkeleton = screen.getByTestId('rectangular-skeleton');
        expect(rectSkeleton).toBeInTheDocument();
        expect(rectSkeleton).toHaveStyle('width: 210px');
        expect(rectSkeleton).toHaveStyle('height: 118px');
        
        const textSkeletons = screen.getAllByTestId('text-skeleton');
        expect(textSkeletons.length).toBe(2);
    });
});
