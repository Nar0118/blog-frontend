import axios from 'axios';
import { IPagination, IPost } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchPosts = async (pagination: IPagination, search = "", signal?: AbortSignal) => {
  try {
    const response = await api.get(`/posts?page=${pagination.page}&search=${search}`, { signal });
    return response.data;
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.log("Request canceled");
    } else {
      throw error;
    }
  }
};

export const fetchPostById = async (id: string) => {
  const response = await api.get(`/post/${id}`);
  return response.data;
};

export const createPost = async (data: IPost) => {
  const response = await api.post('/posts', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const editPost = async (id: number, data: Omit<IPost, "id">) => {
  const response = await api.put(`/post/${id}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const deletePost = async (id: number) => {
  const response = await api.delete(`/post/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};
