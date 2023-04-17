import { api } from 'src/services/api';
import { Photo } from 'src/types';

export type GetPhotosArgs = Partial<Pick<Photo, 'albumId' | 'id'>>;

export const photosApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPhotos: build.query<Photo[], GetPhotosArgs>({
      query: (params: GetPhotosArgs) => ({ url: 'photos', params }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Photos', id } as const)),
              { type: 'Photos', id: 'LIST' },
            ]
          : [{ type: 'Photos', id: 'LIST' }],
    }),
    createPhoto: build.mutation<Photo, Partial<Photo>>({
      query(body) {
        return {
          url: `photos`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Photos'],
    }),
    deletePhoto: build.mutation<
      { success: boolean; id: Photo['id'] },
      Photo['id']
    >({
      query(id) {
        return {
          url: `photos/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (photo) => [{ type: 'Photos', id: photo?.id }],
    }),
  }),
});

export const {
  useGetPhotosQuery,
  useCreatePhotoMutation,
  useDeletePhotoMutation,
} = photosApi;
