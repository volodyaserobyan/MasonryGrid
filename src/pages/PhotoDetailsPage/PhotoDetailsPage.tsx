import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IPhoto } from "../../common/constants";
import photosStore from "../../store/photosStore";
import "./PhotoDetailsPage.scss";

const PhotoDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [item, setItem] = useState<IPhoto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { photosResponse, getPhotoById } = photosStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchPhotoDetails(Number(id));
    }
  }, [id]);

  const fetchPhotoDetails = async (photoId: number) => {
    try {
      const foundPhoto = photosResponse?.photos.find((el) => el.id === photoId);
      if (foundPhoto) {
        setItem(foundPhoto);
      } else {
        const fetchedPhoto = await getPhotoById.fetchPhotoById(String(photoId));
        setItem(fetchedPhoto);
      }
    } catch (err) {
      setError("Failed to fetch photo details. Please try again later.");
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (getPhotoById.isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!item) {
    return <div>Photo not found</div>;
  }

  return (
    <div className="PhotoDetailsPage">
      <button className="backButton" onClick={handleBackClick}>
        &larr; Back
      </button>
      <div className="PhotoDetailsPage-cont">
        <img src={item.src.original} alt={item.alt} />
        <div className="PhotoDetailsPage-cont__texts">
          <p>Photographer: {item.photographer}</p>
          <p>Description: {item.alt}</p>
          <p>Date: Couldn't find in response 😄</p>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailsPage;
