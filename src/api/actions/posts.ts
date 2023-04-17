import { fetcher } from 'src/api';
import { Post } from 'src/types';

export type GetPostsArgs = Partial<Pick<Post, 'userId'>>;

export const postsApi = {
  getPosts: () => {
    return fetcher({ method: 'GET', queryURL: 'posts' });
  },
  getPost: (id: Post['id']) => {
    return fetcher({ method: 'GET', queryURL: `posts/${id}` });
  },
  createPost: (post: Partial<Post>) => {
    return fetcher({
      method: 'POST',
      queryURL: 'posts',
      payload: post,
    });
  },
  deletePost: async (postId: Post['id']) => {
    const response = await fetcher({
      method: 'DELETE',
      queryURL: `posts/${postId}`,
    });

    return { success: response.ok, id: postId };
  },
} as const;
