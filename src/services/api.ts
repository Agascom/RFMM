import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {
    AuthResponse,
    Book,
    CoachingProgram,
    News,
    PaginatedResponse,
    SingleResponse,
    Comment,
    User
} from '../types/api';

const BASE_URL = 'https://rfmm.alwaysdata.net/api';
const TOKEN_KEY = 'auth_token';

// Configuration de l'instance Axios
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 10000,
});

// Intercepteur pour ajouter le token
api.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Services
export const authService = {
    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', {
            email,
            password,
            device_name: 'mobile_app'
        });
        if (response.data.success) {
            await SecureStore.setItemAsync(TOKEN_KEY, response.data.data.token);
        }
        return response.data;
    },

    async register(data: any): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', {
            ...data,
            device_name: 'mobile_app'
        });
        if (response.data.success) {
            await SecureStore.setItemAsync(TOKEN_KEY, response.data.data.token);
        }
        return response.data;
    },

    async logout(): Promise<void> {
        try {
            await api.post('/auth/logout');
        } finally {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
        }
    },

    async getUser(): Promise<SingleResponse<User>> {
        const response = await api.get<SingleResponse<User>>('/user');
        return response.data;
    },

    async updateProfile(data: Partial<User>): Promise<SingleResponse<User>> {
        const response = await api.put<SingleResponse<User>>('/user/profile', data);
        return response.data;
    }
};

export const booksService = {
    async getBooks(params?: { page?: number; category?: string; search?: string }): Promise<PaginatedResponse<Book>> {
        const response = await api.get<PaginatedResponse<Book>>('/books', { params });
        return response.data;
    },

    async getBook(id: string): Promise<SingleResponse<Book>> {
        const response = await api.get<SingleResponse<Book>>(`/books/${id}`);
        return response.data;
    },

    async getTopRated(): Promise<PaginatedResponse<Book>> {
        const response = await api.get<PaginatedResponse<Book>>('/books/top-rated');
        return response.data;
    }
};

export const coachingService = {
    async getPrograms(params?: { page?: number; category?: string }): Promise<PaginatedResponse<CoachingProgram>> {
        const response = await api.get<PaginatedResponse<CoachingProgram>>('/coaching', { params });
        return response.data;
    },

    async getProgram(id: string): Promise<SingleResponse<CoachingProgram>> {
        const response = await api.get<SingleResponse<CoachingProgram>>(`/coaching/${id}`);
        return response.data;
    }
};

export const newsService = {
    async getNews(page: number = 1): Promise<PaginatedResponse<News>> {
        const response = await api.get<PaginatedResponse<News>>('/news', { params: { page } });
        return response.data;
    },

    async getArticle(id: string): Promise<SingleResponse<News>> {
        const response = await api.get<SingleResponse<News>>(`/news/${id}`);
        return response.data;
    }
};

export const libraryService = {
    async getMyLibrary(type?: 'audiobook' | 'ebook' | 'coaching'): Promise<PaginatedResponse<Book | CoachingProgram>> {
        const response = await api.get<PaginatedResponse<Book | CoachingProgram>>('/library', { params: { type } });
        return response.data;
    },

    async getInProgress(): Promise<PaginatedResponse<Book | CoachingProgram>> {
        const response = await api.get<PaginatedResponse<Book | CoachingProgram>>('/library/in-progress');
        return response.data;
    },

    async getCompleted(): Promise<PaginatedResponse<Book | CoachingProgram>> {
        const response = await api.get<PaginatedResponse<Book | CoachingProgram>>('/library/completed');
        return response.data;
    }
};

export const searchService = {
    async search(query: string): Promise<{ books: Book[], coaching: CoachingProgram[], news: News[] }> {
        const response = await api.get('/search', { params: { query } });
        return response.data;
    }
};

export const notificationService = {
    async getAll(): Promise<any[]> { // Typage faible pour l'instant
        const response = await api.get('/notifications');
        return response.data.data;
    },

    async markAsRead(id: string): Promise<void> {
        await api.post(`/notifications/${id}/read`);
    }
};

export const playerService = {
    async updateProgress(id: string, progress: number, type: 'book' | 'coaching'): Promise<void> {
        await api.post('/player/progress', { id, progress, type });
    }
};

export const orderService = {
    async createOrder(items: { id: string, type: 'book' | 'coaching' }[]): Promise<{ success: boolean; order_id: string; payment_url?: string }> {
        const response = await api.post('/orders', { items });
        return response.data;
    }
};

export default api;
