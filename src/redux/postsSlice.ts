import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPagination, IPost, IPostsState } from '../types';

const initialState: IPostsState = {
  posts: [],
  pagination: {
    page: 1,
    totalPages: 1,
    totalPosts: 2,
    limit: 5,
    search: ''
  },
  status: 'idle',
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = [...action.payload]
    },
    addPosts: (state, action: PayloadAction<IPost[]>) => {
      if (Array.isArray(action.payload)) {
        state.posts.push(...action.payload);
      } else {
        state.posts.push(action.payload);
      }
    },
    setPagination: (state, action: PayloadAction<IPagination>) => {
      state.pagination = action.payload;
    },
    removePosts: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((e) => e.id !== action.payload);
    },
    editPosts: (state, action: PayloadAction<IPost>) => {
      state.posts = state.posts.map((e) => e.id !== action.payload.id ? e : action.payload);
    },
  },
});

export const { setPosts, removePosts, editPosts, setPagination, addPosts } = postsSlice.actions;
export default postsSlice.reducer;
