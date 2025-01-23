import useInfiniteScrollPhotos from './useInfiniteScrollPhotos'
import photosStore from '../../store/photosStore';
import { renderHook, act } from '@testing-library/react';

jest.mock('../../store/photosStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    getPhotos: {
      isLoading: false,
      fetchPhotos: jest.fn(),
    },
    photosResponse: null,
  })),
}));

describe('useInfiniteScrollPhotos', () => {
  let mockGetPhotos;
  let mockPhotosStore;

  beforeEach(() => {
    mockGetPhotos = {
      isLoading: false,
      fetchPhotos: jest.fn(),
    };
    mockPhotosStore = {
      getPhotos: mockGetPhotos,
      photosResponse: null,
    };
    photosStore.mockReturnValue(mockPhotosStore);
  });

  test('should return initial state correctly', () => {
    const { result } = renderHook(() => useInfiniteScrollPhotos(1, true));

    expect(result.current.photos).toEqual([]);
    expect(result.current.isNextPageAvailable).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  test('should fetch photos when page changes and there are more pages', async () => {
    mockPhotosStore.photosResponse = {
      photos: [{ id: 1, url: 'photo1.jpg' }],
      total_results: 2,
    };

    const { result, rerender } = renderHook(() =>
      useInfiniteScrollPhotos(1, true)
    );

    act(() => {
      mockGetPhotos.fetchPhotos.mockImplementationOnce(() => {
        mockPhotosStore.photosResponse = {
          photos: [{ id: 1, url: 'photo1.jpg' }],
          total_results: 2,
        };
      });
      rerender();
    });

    expect(result.current.photos).toEqual([{ id: 1, url: 'photo1.jpg' }]);
    expect(result.current.isNextPageAvailable).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  test('should not fetch photos if loading or no next page', () => {
    mockGetPhotos.isLoading = true;

    const { result } = renderHook(() => useInfiniteScrollPhotos(1, true));

    expect(result.current.isLoading).toBe(true);
    expect(mockGetPhotos.fetchPhotos).not.toHaveBeenCalled();
  });

  test('should stop fetching if there are no more pages', async () => {
    mockPhotosStore.photosResponse = {
      photos: [{ id: 1, url: 'photo1.jpg' }],
      total_results: 1,
    };

    const { result } = renderHook(() => useInfiniteScrollPhotos(1, false));

    expect(result.current.photos).toEqual([{ id: 1, url: 'photo1.jpg' }]);
    expect(result.current.isNextPageAvailable).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  test('should append new photos to existing ones', async () => {
    mockPhotosStore.photosResponse = {
      photos: [{ id: 1, url: 'photo1.jpg' }],
      total_results: 3,
    };

    const { result, rerender } = renderHook(() =>
      useInfiniteScrollPhotos(1, true)
    );

    expect(result.current.photos).toEqual([{ id: 1, url: 'photo1.jpg' }]);

    mockPhotosStore.photosResponse = {
      photos: [
        { id: 2, url: 'photo2.jpg' },
        { id: 3, url: 'photo3.jpg' },
      ],
      total_results: 3,
    };

    act(() => {
      rerender();
    });

    expect(result.current.photos).toEqual([
      { id: 1, url: 'photo1.jpg' },
      { id: 2, url: 'photo2.jpg' },
      { id: 3, url: 'photo3.jpg' },
    ]);
  });
});
