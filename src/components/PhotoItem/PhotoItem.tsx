import React from "react";
import { useNavigate } from "react-router-dom";

import "./PhotoItem.scss";

interface IPhotoItem {
  src: string;
  alt: string;
  id: number;
}

const PhotoItem: React.FC<IPhotoItem> = ({ src, alt, id }) => {
  const navigate = useNavigate();
  const handleItemClick = () => {
    navigate(`/${id}`);
  };

  return (
    <div onClick={handleItemClick} className="PhotoItem">
      <img loading="lazy" src={src} alt={alt} />
    </div>
  );
};

export default React.memo(PhotoItem);

// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import "./PhotoItem.scss";

// interface IPhotoItem {
//   src: string;
//   alt: string;
//   id: number;
// }

// const PhotoItem: React.FC<IPhotoItem> = ({ src, alt, id }) => {
//   const navigate = useNavigate();
//   const [isVisible, setIsVisible] = useState(false);
//   const itemRef = useRef<HTMLDivElement>(null);

//   const handleItemClick = () => {
//     navigate(`/${id}`);
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const [entry] = entries;
//         setIsVisible(entry.isIntersecting);
//       },
//       {
//         root: null,
//         threshold: 0.3,
//       }
//     );

//     const currentRef = itemRef.current;
//     if (currentRef) {
//       observer.observe(currentRef);
//     }

//     return () => {
//       if (currentRef) {
//         observer.unobserve(currentRef);
//       }
//     };
//   }, []);

//   return (
//     <div onClick={handleItemClick} className="PhotoItem" ref={itemRef}>
//       {isVisible && <img loading="lazy" src={src} alt={alt} />}
//     </div>
//   );
// };

// export default React.memo(PhotoItem);
