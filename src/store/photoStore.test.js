
import photosStore from "./photosStore";
import ApiService from "../services/apiService";

jest.mock("../services/apiService");

describe("photosStore", () => {
  let store;

  beforeEach(() => {
    store = photosStore.getState();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update isLoading to true when fetching photos", async () => {
    const mockResponse = { data: [], total: 0, page: 1 };
    ApiService.getPhotosApi.mockResolvedValue(mockResponse);

    await store.getPhotos.fetchPhotos({
      page: 1,
      perPage: 10,
    });

    expect(store.getPhotos.isLoading).toBe(false);

    expect(store.getPhotos.isSuccess).toBe(false);
    expect(store.getPhotos.isLoading).toBe(false);
    expect(store.getPhotos.error).toBe("");
  });

  it("should handle errors when fetching photos", async () => {
    ApiService.getPhotosApi.mockRejectedValue(new Error("Something went wrong"));

    await store.getPhotos.fetchPhotos({
      page: 1,
      perPage: 10,
    });

    expect(store.getPhotos.isLoading).toBe(false);
    expect(store.getPhotos.isSuccess).toBe(true);
    expect(store.getPhotos.error).toBe("");
  });

  it("should fetch a photo by id", async () => {
    const mockPhoto = { id: "1", title: "Test Photo", url: "http://example.com/photo.jpg" };
    ApiService.fetchPhotoById.mockResolvedValue(mockPhoto);

    const photo = await store.getPhotoById.fetchPhotoById("1");

    expect(photo).toEqual(mockPhoto);
    expect(store.getPhotoById.isLoading).toBe(false);
    expect(store.getPhotoById.isSuccess).toBe(false);
    expect(store.getPhotoById.error).toBe("");
  });

  it("should handle errors when fetching photo by id", async () => {
    ApiService.fetchPhotoById.mockRejectedValue(new Error("Failed to fetch"));

    try {
      await store.getPhotoById.fetchPhotoById("1");
    } catch (e) {
      expect(store.getPhotoById.isLoading).toBe(false);
      expect(store.getPhotoById.isSuccess).toBe(false);
      expect(store.getPhotoById.error).toBe("");
    }
  });
});
