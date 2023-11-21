import { createSelector, createSlice } from "@reduxjs/toolkit"
import { IPost } from "../components/posts/PostItem"
import { api } from "./api"
import { createQueryString } from "../utils/createQueryString";

interface QueryResult {
  posts: IPost[]
}

export interface PostsState {
  q: string;
  direction: string;
  limit: number;
  page: number;
  sortBy: string;
}

interface GlobalState {
  posts: PostsState
}

const initialState = {
  q: '',
  direction: 'desc',
  limit: 10,
  page: 1,
  sortBy: 'updatedAt'
}

const postsSlice = createSlice({
name: 'posts',
initialState,
reducers: {
  setSearchParams: (state, { payload }) => {
      Object.assign(state, payload)
  }
}
})

const extendedApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (queryString = "") => "/posts" + queryString,
      providesTags: (result?: QueryResult) => {
        if (result) {
            return [
                ...result.posts.map(post => ({ type: 'Posts' as const, id: post._id })),
                { type: 'Posts' as const, id: 'LIST' }
            ];
        }
        return [{ type: 'Posts' as const, id: 'LIST' }];
    }
    }),
    getPost: builder.query({
      query: (postID) => "/posts/" + postID,
      providesTags: (result) => {
        if (result) {
            return [{ type: 'Posts' as const, id: result._id }];
        }
        return [];
    } 
    }),
    createPost: builder.mutation({
      query: (postData) => ({
        url: "/posts",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST'}]
    }),
    updatePost: builder.mutation({
      query: ({ postID, postData }) => ({
        url: "/posts/" + postID,
        method: "PATCH",
        body: postData,
      }),
      invalidatesTags: (result) => {
        if (result) {
          return [{ type: 'Posts' as const, id: result._id }];
      }
      return [];
      }
    }),
    deletePost: builder.mutation({
      query: (postID) => ({
        url: "/posts/" + postID,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST'}]
    }),
  }),
})

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useUpdatePostMutation,
} = extendedApiSlice

export const { setSearchParams } = postsSlice.actions
export const getSearchParams = (state: GlobalState) => state.posts
export const getQueryString = createSelector(
  getSearchParams,
  searchParams => createQueryString(searchParams)
)

export default postsSlice.reducer
