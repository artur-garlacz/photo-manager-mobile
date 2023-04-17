import { fetcher } from 'src/api';
import { Album } from 'src/types';

export type GetAlbumsArgs = Partial<Pick<Album, 'userId'>>;

export const albumsApi = {
  getAlbums: () => {
    return fetcher({ method: 'GET', queryURL: 'albums' });
  },
} as const;
