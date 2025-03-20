import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost, IPagination } from '../types';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<{ posts: IPost[]; pagination: IPagination }, { page: number; search?: string }>({
      query: ({ page, search = '' }) => `/posts?page=${page}&search=${search}`,
      keepUnusedDataFor: 300,  // Cache data for 5 minutes
    }),
    createPost: builder.mutation<IPost, IPost>({
      query: (data) => ({
        url: '/posts',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
      // Optimistically update the cache when a post is created
      onQueryStarted: async (newPost, { dispatch, queryFulfilled }) => {
        // Optimistically update the cache without a refetch
        const patchResult = dispatch(
          postsApi.util.updateQueryData('getPosts', { page: 1 }, (draft) => {
            draft.posts.unshift(newPost); // Add the new post to the list
          })
        );
        try {
          // Wait for the mutation to complete
          await queryFulfilled;
        } catch (error) {
          // If the request fails, revert the optimistic update
          patchResult.undo();
        }
      },
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/post/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
      // Optimistically update the cache when a post is deleted
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        // Optimistically remove the post from the cache
        const patchResult = dispatch(
          postsApi.util.updateQueryData('getPosts', { page: 1 }, (draft) => {
            draft.posts = draft.posts.filter(post => post.id !== id); // Remove the post by its id
          })
        );
        try {
          // Wait for the mutation to complete
          await queryFulfilled;
        } catch (error) {
          // If the request fails, revert the optimistic update
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostMutation, useDeletePostMutation } = postsApi;
