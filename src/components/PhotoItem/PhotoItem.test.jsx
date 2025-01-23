import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import PhotoItem from './PhotoItem';
import React from "react";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("PhotoItem Component", () => {
  it("should render an image with the correct src and alt attributes", () => {
    const src = "https://example.com/photo.jpg";
    const alt = "A beautiful photo";
    const id = 1;

    render(
      <MemoryRouter>
        <PhotoItem src={src} alt={alt} id={id} />
      </MemoryRouter>
    );

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", src);
    expect(image).toHaveAttribute("alt", alt);
  });

  it("should navigate to the correct URL when the photo is clicked", () => {
    const navigate = jest.fn();
    const src = "https://example.com/photo.jpg";
    const alt = "A beautiful photo";
    const id = 1;

    jest.mocked(useNavigate).mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <PhotoItem src={src} alt={alt} id={id} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("img"));

    expect(navigate).toHaveBeenCalledWith(`/${id}`);
  });
});
