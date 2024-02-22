import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import {Header} from "../components/Header"; // Asegúrate de que la ruta al componente Header sea correcta
import "@testing-library/jest-dom";
import * as ReactRouterDom from "react-router-dom"; // Importa todo desde react-router-dom

// Ajusta el mock de react-router-dom para mantener las exportaciones originales y sobrescribir useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // Importa el módulo original
  return {
    ...actual, // Extiende todas las exportaciones originales
    useNavigate: vi.fn(), // Sobrescribe específicamente useNavigate con un mock
  };
});
vi.mock("../services/AuthService", () => ({
  logout: vi.fn(() => Promise.resolve()), // Mock de authService.logout
}));

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Limpia mocks antes de cada prueba
  });
  it("renders correctly", () => {
    render(<Header />, { wrapper: ReactRouterDom.MemoryRouter }); // Usa ReactRouterDom.MemoryRouter directamente
    expect(screen.getByText("TeamTask")).toBeInTheDocument();
    expect(
      screen.getByAltText("ver información del perfil")
    ).toBeInTheDocument();
  });

  it("navigates to home on logo click", async () => {
    const { container } = render(<Header />, {
      wrapper: ReactRouterDom.MemoryRouter,
    });
    const logoLink = container.querySelector('a[href="/home"]'); // Encuentra el enlace al home basado en su href
    expect(logoLink).toBeInTheDocument();
  });
});
