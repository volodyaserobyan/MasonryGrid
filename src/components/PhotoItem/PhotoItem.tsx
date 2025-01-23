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
