import { IComment } from "../components/comments/CommentsList";
import { api } from "./api";

interface QueryResult {
    comments: IComment[]
  }

const extendedApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getComments: builder.query({
            query: (postID) => `/posts/${postID}/comments`,
            providesTags: (result?: QueryResult) => {
                if (result) {
                    return [
                        ...result.comments.map(comment => ({ type: 'Posts' as const, id: comment._id })),
                        { type: 'Comments' as const, id: 'LIST' }
                    ];
                }
                return [{ type: 'Comments' as const, id: 'LIST' }];
            }
        }),
        createComment: builder.mutation({
            query: ({ postID, commentData }) => ({
                url: '/posts/' + postID + '/comments',
                method: 'POST',
                body: commentData
            }),
            invalidatesTags: [{ type: 'Comments', id: 'LIST' }]
        }),
        updateComment: builder.mutation({
            query: ({ commentID, commentData }) => ({
                url: '/comments/' + commentID,
                method: 'PATCH',
                body: commentData
            }),
            invalidatesTags: (result) => {
                if (result) {
                    console.log(result)
                  return [{ type: 'Comments' as const, id: 'LIST' }];
              }
              return [];
              }
        }),
        deleteComment: builder.mutation({
            query: (commentID) => ({
                url: '/comments/' + commentID,
                method: 'DELETE',
            }),
            invalidatesTags: (result) => {
                if (result) {
                  return [{ type: 'Comments' as const, id: 'LIST' }];
              }
              return [];
              }
        })
    })
})

export const { useGetCommentsQuery,
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useUpdateCommentMutation } = extendedApiSlice