import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PhotoDetailsPage from "./PhotoDetailsPage";
import photosStore from "../../store/photosStore";
import React from "react";

jest.mock("../../store/photosStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    photosResponse: {
      photos: [
        {
          id: 1,
          src: { original: "test-photo-url" },
          photographer: "Test Photographer",
          alt: "A test photo description",
        },
      ],
    },
    getPhotoById: {
      fetchPhotoById: jest.fn().mockResolvedValue({
        id: 2,
        src: { original: "test-photo-url-2" },
        photographer: "Another Photographer",
        alt: "Another photo description",
      }),
      isLoading: false,
    },
  })),
}));

const Wrapper = () => (
  <MemoryRouter initialEntries={["/photos/1"]}>
    <Routes>
      <Route path="photos/:id" element={<PhotoDetailsPage />} />
    </Routes>
  </MemoryRouter>
);

describe("PhotoDetailsPage", () => {
  it("renders photo details when photo is found", async () => {
    render(<Wrapper />);

    await waitFor(() => screen.getByRole("img"));

    expect(screen.getByRole("img").src).toBe("http://localhost/test-photo-url");
    expect(
      screen.getByText(/Photographer: Test Photographer/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Description: A test photo description/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Date: Couldn't find in response 😄/)
    ).toBeInTheDocument();
  });

  it("fetches photo by ID when no photo is found in photosResponse", async () => {
    photosStore().photosResponse.photos = [];
    render(<Wrapper />);
    await waitFor(() => screen.getByRole("img"));
    waitFor(() =>
      expect(photosStore().getPhotoById.fetchPhotoById).toHaveBeenCalledTimes(1)
    );
  });

  it("navigates back when back button is clicked", () => {
    const navigate = jest.fn();
    render(<Wrapper />);
    const backButton = screen.getByText(/Back/);
    fireEvent.click(backButton);
    waitFor(() => expect(navigate).toHaveBeenCalledWith(-1));
  });
});
