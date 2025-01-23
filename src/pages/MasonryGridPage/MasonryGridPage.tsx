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

// import React, { useState, useEffect } from "react";
// import PhotoItem from "../../components/PhotoItem";
// import useInfiniteScrollPhotos from "../../hooks/useInfiniteScrollPhotos";
// import useScrollPagination from "../../hooks/useScrollPagination";
// import {
//   Masonry,
//   CellMeasurer,
//   CellMeasurerCache,
//   WindowScroller,
// } from "react-virtualized";
// import "./MasonryGridPage.scss";
// const cache = new CellMeasurerCache({
//   fixedWidth: true,
//   defaultHeight: 300,
// });
// const MasonryGridPage: React.FC = () => {
//   const [page, setPage] = useState<number>(1);
//   const [hasNextPage, setHasNextPage] = useState<boolean>(true);
//   const { photos, isNextPageAvailable, isLoading } = useInfiniteScrollPhotos(
//     page,
//     hasNextPage
//   );
//   useEffect(() => {
//     setHasNextPage(isNextPageAvailable);
//   }, [isNextPageAvailable]);
//   const onScrollCallback = () => {
//     if (isLoading || !hasNextPage) return;
//     setPage((prevPage) => prevPage + 1);
//   };
//   const sentinelRef = useScrollPagination(
//     isLoading,
//     hasNextPage,
//     onScrollCallback
//   );
//   const columnWidth = 300;
//   const columnCount = Math.floor(window.innerWidth / columnWidth);
//   const cellPositioner = (index: number) => {
//     const columnIndex = index % columnCount;
//     const rowIndex = Math.floor(index / columnCount);
//     return {
//       top: rowIndex * 300,
//       left: columnIndex * columnWidth,
//     };
//   };
//   return (
//     <div className="MasonryGridPage">
//       <div className="MasonryGridPage-cont">
//         <WindowScroller>
//           {({ height, isScrolling, scrollTop }) => (
//             <Masonry
//               autoHeight
//               cellCount={photos.length}
//               cellMeasurerCache={cache}
//               cellPositioner={cellPositioner}
//               cellRenderer={({ index, key, parent, style }) => {
//                 const photo = photos[index];
//                 return (
//                   <CellMeasurer
//                     key={key}
//                     cache={cache}
//                     columnIndex={0}
//                     rowIndex={index}
//                     parent={parent}
//                   >
//                     <div style={style}>
//                       <PhotoItem
//                         key={photo.id}
//                         src={photo.src.original}
//                         alt={photo.alt}
//                         id={photo.id}
//                       />
//                     </div>
//                   </CellMeasurer>
//                 );
//               }}
//               height={height}
//               isScrolling={isScrolling}
//               scrollTop={scrollTop}
//               width={window.innerWidth}
//             />
//           )}
//         </WindowScroller>
//       </div>
//       <div ref={sentinelRef} className="sentinel"></div>
//       {isLoading && <div className="loading-spinner">Loading...</div>}
//     </div>
//   );
// };
// export default MasonryGridPage;
