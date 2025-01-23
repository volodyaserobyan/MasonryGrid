import { axiosClient } from "../common/axiosInstance";
import {
  IGetPhotosApiPayload,
  IPhoto,
  IPhotosResponse,
} from "../common/constants";

export default class ApiService {
  static async getPhotosApi({
    page,
  }: IGetPhotosApiPayload): Promise<IPhotosResponse> {
    const response = axiosClient().get(`curated?page=${page}&per_page=40`);
    const { data } = await response;
    return data;
  }

  static async fetchPhotoById(id: string): Promise<IPhoto> {
    const response = axiosClient().get(`photos/${id}`);
    const { data } = await response;
    return data;
  }
}
