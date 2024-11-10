import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App.jsx";
import { describe, expect, it, vi } from "vitest";
import "../setupTests.js";

describe("App Component", () => {
    it("renders the Join Button component", () => {
        render(<App />);

        const joinButtonElement = screen.getByText(/Join Button test/i);
        expect(joinButtonElement).toBeInTheDocument();
    });

    it("joins the match with id=12 when JoinButton is clicked", () => {
        const mockSelected = vi.fn();
        render(<App Match={{ id: 12 }} />);

        const joinButton = screen.getByRole("button");
        fireEvent.click(joinButton);

        expect(mockSelected).toHaveBeenCalled();
        expect(mockSelected).toHaveBeenCalledWith({ id: 12 });
    });
});
