import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App.jsx";
import { describe, expect, it, vi } from "vitest";
import "../setupTests.js";

describe("App Component", () => {
    it("renders the Join Button component", () => {
        render(<App />);

        const joinButtonElement = screen.getByText(/Unir/i);
        expect(joinButtonElement).toBeInTheDocument();
    });

    it("renders the refresh button", () => {
        const mockSelected = vi.fn();
        render(<App />);
        const refreshButton = screen.getByText(/Refrescar/i);
        expect(refreshButton).toBeInTheDocument();
        fireEvent.click(refreshButton);
    });
});
