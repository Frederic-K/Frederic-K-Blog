import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (postData) => ({
        url: "/post/createPost",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Post"],
    }),
    getPosts: builder.query({
      query: (params) => ({
        url: "/post/getPosts",
        params,
      }),
      providesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: ({ postId, userId }) => ({
        url: `/post/deletePost/${postId}/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: ({ postId, userId, ...updateData }) => ({
        url: `/post/updatePost/${postId}/${userId}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["Post"],
    }),
    likePost: builder.mutation({
      query: (postId) => ({
        url: `/post/likePost/${postId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Post"],
    }),
    getAuthor: builder.query({
      query: (userId) => `/user/public/${userId}`,
      providesTags: ["User"],
    }),
  }),
})

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useLikePostMutation,
  useGetAuthorQuery,
} = postApi
