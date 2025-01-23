import React, { useState, useEffect, Suspense } from "react";
import useInfiniteScrollPhotos from "../../hooks/useInfiniteScrollPhotos";
import useScrollPagination from "../../hooks/useScrollPagination";
import "./MasonryGridPage.scss";

const PhotoItem = React.lazy(() => import("../../components/PhotoItem"));

const MasonryGridPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const { photos, isNextPageAvailable, isLoading } = useInfiniteScrollPhotos(
    page,
    hasNextPage
  );

  useEffect(() => {
    setHasNextPage(isNextPageAvailable);
  }, [isNextPageAvailable]);

  const onScrollCallback = () => {
    if (isLoading || !hasNextPage) return;
    setPage((prevPage) => prevPage + 1);
  };

  const sentinelRef = useScrollPagination(
    isLoading,
    hasNextPage,
    onScrollCallback
  );

  return (
    <div className="MasonryGridPage">
      <div className="MasonryGridPage-cont">
        <Suspense
          fallback={<div className="loading-spinner">Loading images...</div>}
        >
          {photos.map((photo) => (
            <PhotoItem
              key={photo.id}
              src={photo.src.original}
              alt={photo.alt}
              id={photo.id}
            />
          ))}
        </Suspense>
      </div>
      <div ref={sentinelRef} className="sentinel"></div>

      {isLoading && (
        <div className="loading-spinner">Loading more photos...</div>
      )}
    </div>
  );
};

export default MasonryGridPage;
