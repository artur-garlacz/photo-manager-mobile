import { api } from 'src/services/api';
import { Comment, Post } from 'src/types';

type GetCommentsArgs = {
  postId: Post['id'];
};

export const commentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query<Comment[], GetCommentsArgs>({
      query: ({ postId }: GetCommentsArgs) => ({
        url: 'comments',
        params: { postId },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Comments', id } as const)),
              { type: 'Comments', id: 'LIST' },
            ]
          : [{ type: 'Comments', id: 'LIST' }],
    }),
    createComment: build.mutation<Comment, Partial<Comment>>({
      query(body) {
        return {
          url: `comments`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Comments'],
    }),
    deleteComment: build.mutation<
      { success: boolean; id: Comment['id'] },
      Comment['id']
    >({
      query(id) {
        return {
          url: `comments/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (comment) => [{ type: 'Comments', id: comment?.id }],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useDeleteCommentMutation,
  useCreateCommentMutation,
} = commentsApi;
