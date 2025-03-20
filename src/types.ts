export interface IPost {
    id: number;
    title: string;
    content: string;
    createdAt?: string;
}

export interface IPagination {
    page: number,
    totalPages: number,
    totalPosts: number,
    limit: number
    search: string
}

export interface IPostsState {
    posts: IPost[];
    pagination: IPagination,
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
    lastFetched: number
}

export interface IAuthState {
    isAuthenticated: boolean;
    token: string | null;
}

export type PostInputTypes = {
    title: string
    content: string
}

export type LoginInputTypes = {
    username: string
    password: string
}