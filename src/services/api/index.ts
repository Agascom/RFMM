import { mockUser, featuredEvent, featuredPodcasts, coachingSessions, nowPlaying, books, mainNewsArticle, libraryItems, completedItems } from './mockData';

export const getUser = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(mockUser), 500));
};

export const getFeaturedEvent = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(featuredEvent), 500));
};

export const getFeaturedPodcasts = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(featuredPodcasts), 500));
};

export const getCoachingSessions = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(coachingSessions), 500));
};

export const getNowPlaying = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(nowPlaying), 500));
};

export const getBooks = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(books), 500));
};

export const getNewsArticle = async (id: string) => {
  return new Promise((resolve) => setTimeout(() => resolve(mainNewsArticle), 500));
};

export const getLibraryItems = async () => {
    return new Promise((resolve) => setTimeout(() => resolve({ inProgress: libraryItems, completed: completedItems }), 500));
}
