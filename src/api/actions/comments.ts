import { fetcher } from 'src/api';
import { Post } from 'src/types';

type GetCommentsArgs = {
  postId: Post['id'];
};

export const commentApi = {
  getComments: (params: GetCommentsArgs) => {
    return fetcher({
      method: 'GET',
      queryURL: `comments?postId=${params.postId}`,
    });
  },
  createComment: (comment: Partial<Comment>) => {
    return fetcher({
      method: 'POST',
      queryURL: 'comments',
      payload: comment,
    });
  },
  deleteComment: async (commentId: number) => {
    const response = await fetcher({
      method: 'DELETE',
      queryURL: `comments/${commentId}`,
    });

    return { success: response.ok, id: commentId };
  },
} as const;
