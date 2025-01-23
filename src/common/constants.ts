export interface IGetPhotosApiPayload {
  page: number;
}

export interface IPhotoSrc {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface IPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: IPhotoSrc;
  liked: boolean;
  alt: string;
}

export interface IPhotosResponse {
  page: number;
  per_page: number;
  photos: IPhoto[];
  total_results: number;
  next_page: string;
}
