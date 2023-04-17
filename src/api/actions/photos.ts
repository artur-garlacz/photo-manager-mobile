import { fetcher } from "src/api";
import { Photo } from "src/types";

export type GetPhotosArgs = Partial<Pick<Photo, "albumId" | "id">>;

export const photosApi = {
  getPhotos: () => {
    return fetcher({ method: "GET", queryURL: "photos" });
  },
  getPhoto: (id: Photo["id"]) => {
    return fetcher({ method: "GET", queryURL: `photos/${id}` });
  },
  createPhoto: (post: Partial<Photo>) => {
    return fetcher({
      method: "POST",
      queryURL: "photos",
      payload: post,
    });
  },
  deletePhoto: async (photoId: Photo["id"]) => {
    const response = await fetcher({
      method: "DELETE",
      queryURL: `photos/${photoId}`,
    });

    return { success: response.ok, id: photoId };
  },
} as const;
