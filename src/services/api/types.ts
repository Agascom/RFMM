export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Event {
  id: string;
  title: string;
  date: string; // ISO string or display string
  description: string;
  imageUrl: string;
  isLive: boolean;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  episodeNumber: number;
  seriesTitle?: string; // e.g. "Path to Grace"
  imageUrl: string;
  duration?: string;
  progress?: number; // 0-1
}

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
  type: 'ebook' | 'audiobook';
  isBestSeller?: boolean;
  bestSellerRank?: number;
  rating?: number;
}

export interface CoachingSession {
  id: string;
  category: string;
  title: string;
  imageUrl: string;
  progress: number; // 0-100
  isNew?: boolean;
  moduleCount?: number;
  type?: 'video' | 'audio';
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  publishedAt: string;
  readTime: string; // "5 min read"
  imageUrl: string;
  author: string;
  content: string; // HTML or Markdown or plain text
  relatedArticles?: NewsArticle[];
}
