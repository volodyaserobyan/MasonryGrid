import { create } from "zustand";
import ApiService from "../services/apiService";
import {
  IGetPhotosApiPayload,
  IPhoto,
  IPhotosResponse,
} from "../common/constants";

interface IGetPhotos {
  isSuccess: boolean;
  isLoading: boolean;
  error: string;
  fetchPhotos: (payload: IGetPhotosApiPayload) => void;
}

interface IFetchPhotoById {
  isSuccess: boolean;
  isLoading: boolean;
  error: string;
  fetchPhotoById: (id: string) => Promise<IPhoto>;
}

type photosState = {
  photosResponse: IPhotosResponse | null;
  getPhotos: IGetPhotos;
  getPhotoById: IFetchPhotoById;
};

const photosStore = create<photosState>((set) => ({
  photosResponse: null,
  getPhotos: {
    isSuccess: false,
    isLoading: false,
    error: "",
    fetchPhotos: async (payload: IGetPhotosApiPayload) => {
      set((state) => ({
        ...state,
        getPhotos: {
          ...state?.getPhotos,
          isLoading: true,
        },
      }));
      try {
        const data = await ApiService.getPhotosApi(payload);
        set((state) => ({
          ...state,
          photosResponse: data,
          getPhotos: {
            ...state?.getPhotos,
            isLoading: false,
            isSuccess: true,
          },
        }));
      } catch (e) {
        set((state) => ({
          ...state,
          getPhotos: {
            ...state?.getPhotos,
            isLoading: false,
            isSuccess: false,
            error: "Something went wrong !!!",
          },
        }));
      }
    },
  },
  getPhotoById: {
    isSuccess: false,
    isLoading: false,
    error: "",
    fetchPhotoById: async (id: string) => {
      return new Promise((resolve, reject) => {
        set((state) => ({
          ...state,
          fetchPhotoById: {
            ...state?.getPhotoById,
            isLoading: true,
          },
        }));

        ApiService.fetchPhotoById(id)
          .then((data) => {
            set((state) => ({
              ...state,
              photo: data,
              fetchPhotoById: {
                ...state?.getPhotoById,
                isLoading: false,
                isSuccess: true,
              },
            }));
            resolve(data);
          })
          .catch((e) => {
            set((state) => ({
              ...state,
              fetchPhotoById: {
                ...state?.getPhotoById,
                isLoading: false,
                isSuccess: false,
                error: "Something went wrong !!!",
              },
            }));
            reject(e);
          });
      });
    },
  },
}));

export default photosStore;
