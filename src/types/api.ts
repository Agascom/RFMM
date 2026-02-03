export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    icon_url?: string;
    sort_order: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar_url?: string;
    role: 'user' | 'admin';
    level: 'free' | 'premium';
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        token: string;
    };
}

export interface BookChapter {
    id: string;
    title: string;
    chapter_number: number;
    audio_url?: string;
    duration?: string;
    is_free_preview: boolean;
}

export interface Book {
    id: string;
    title: string;
    slug: string;
    author: string;
    description: string;
    type: 'audiobook' | 'ebook';

    // Prix & Business
    price: number;
    formatted_price: string;
    is_free: boolean;
    discount_percentage?: number;

    // Média
    cover_image_url: string;
    file_url?: string;

    // Métadonnées
    duration?: string;
    size?: string;
    total_chapters: number;

    // Stats & Flags
    rating: string;
    ratings_count: number;
    is_bestseller: boolean;
    is_new: boolean;
    is_featured: boolean;

    // Relations
    category?: Category;
    chapters?: BookChapter[];
    user_rating?: number;
}

export interface CoachingLesson {
    id: string;
    title: string;
    lesson_number: number;
    description?: string;
    video_url?: string;
    duration?: string;
    is_free_preview: boolean;
}

export interface CoachingProgram {
    id: string;
    title: string;
    slug: string;
    subtitle?: string;
    instructor: string;
    instructor_bio?: string;
    description: string;

    price: number;
    formatted_price: string;
    is_free: boolean;

    cover_image_url: string;
    total_lessons: number;
    duration: string;

    // Relations
    lessons?: CoachingLesson[];
    category?: Category;
}

export interface Comment {
    id: string;
    content: string;
    created_at: string;
    user: {
        id: string;
        name: string;
        avatar_url: string;
    };
    replies?: Comment[];
}

export interface News {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    image_url: string;
    author: string;
    published_at: string;

    comments_count: number;
    category?: Category;
}

export interface PaginatedResponse<T> {
    success: boolean;
    message: string;
    data: T[];
    links?: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta?: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

export interface SingleResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}
