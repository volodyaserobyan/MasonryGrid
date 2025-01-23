import { useEffect, useState } from "react";
import photosStore from "../../store/photosStore";
import { IPhoto } from "../../common/constants";

const useInfiniteScrollPhotos = (page: number, hasNextPage: boolean) => {
  const { getPhotos, photosResponse } = photosStore();
  const [photos, setPhotos] = useState<IPhoto[]>([]);

  useEffect(() => {
    if (getPhotos.isLoading || !hasNextPage) return;
    getPhotos.fetchPhotos({ page });
  }, [page]);

  useEffect(() => {
    if (photosResponse?.photos) {
      setPhotos((prev) => {
        const newPhotos = photosResponse.photos.filter(
          (newPhoto) => !prev.some((photo) => photo.id === newPhoto.id)
        );
        return [...prev, ...newPhotos];
      });
    }
  }, [photosResponse]);

  const isNextPageAvailable =
    (photosResponse?.photos?.length ?? 0) <
    (photosResponse?.total_results ?? 0);

  return { photos, isNextPageAvailable, isLoading: getPhotos.isLoading };
};

export default useInfiniteScrollPhotos;
