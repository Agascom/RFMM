import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { styled } from 'nativewind';
import { MaterialIcons } from '@expo/vector-icons';
import { getBooks } from '../services/api';
import { Book } from '../services/api/types';
import { useNavigation } from '@react-navigation/native';

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledImageBackground = styled(ImageBackground);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function StoreScreen() {
  const navigation = useNavigation<any>();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  const newReleases = books.slice(0, 2);
  const bestSellers = books.filter(b => b.isBestSeller);
  const trending = books.slice(2, 4);

  return (
    <ScreenWrapper>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <StyledView className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-white/10">
            <MaterialIcons name="search" size={28} color="gray" />
            <StyledText className="text-xl font-bold tracking-tight dark:text-white font-display">Bookstore</StyledText>
            <StyledTouchableOpacity className="w-10 h-10 rounded-full bg-white/10 items-center justify-center relative" onPress={() => navigation.navigate('Checkout')}>
                <MaterialIcons name="shopping-cart" size={24} color="gray" />
                <StyledView className="absolute top-0 right-0 w-4 h-4 bg-primary rounded-full items-center justify-center">
                    <StyledText className="text-[10px] font-bold text-black">2</StyledText>
                </StyledView>
            </StyledTouchableOpacity>
        </StyledView>

        {/* Categories */}
        <StyledView className="px-4 mt-2">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="border-b border-gray-200 dark:border-white/10">
                <StyledTouchableOpacity className="border-b-2 border-primary pb-3 pt-2 px-3">
                    <StyledText className="text-sm font-bold text-primary">All Items</StyledText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="border-b-2 border-transparent pb-3 pt-2 px-3">
                    <StyledText className="text-sm font-bold text-gray-500 dark:text-gray-400">Audiobooks</StyledText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="border-b-2 border-transparent pb-3 pt-2 px-3">
                    <StyledText className="text-sm font-bold text-gray-500 dark:text-gray-400">E-books</StyledText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="border-b-2 border-transparent pb-3 pt-2 px-3">
                    <StyledText className="text-sm font-bold text-gray-500 dark:text-gray-400">News</StyledText>
                </StyledTouchableOpacity>
            </ScrollView>
        </StyledView>

        {/* Featured Banner */}
        <StyledView className="px-4 pt-6">
            <StyledView className="relative h-48 w-full rounded-xl overflow-hidden bg-primary/20">
                <StyledImageBackground
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1tJ-Wy2qhlI6vWxTjRzQ0xYlg_FA2Vn3yiwysyEQ3DxDxXtcdf-fTX834BtDztrY4t7pknZGRwWuvbNM4sMBz_HXzecOgVXnDMeS0pmV8wboZ77cBFraZ6T5xM6UnZHXYz7S0N6ecn7RXYFepxGlhurfJLrXd1kAUXiy4XRkj94MqsYoL7zTmOQXgqngYz60j8hIdzuwFVIs9UFUmgmRBn2qh6vJ1IoFHSlZHRdKatQFc9jft_gQ-jHhYczS2ijBGCt6ulpXMZAvI' }}
                    className="flex-1 p-6 justify-center"
                    imageStyle={{ opacity: 0.6 }}
                >
                    <StyledView className="max-w-[70%]">
                        <StyledText className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Featured Release</StyledText>
                        <StyledText className="text-2xl font-bold leading-tight mb-3 dark:text-white font-display">The Anointing of Wisdom</StyledText>
                        <StyledTouchableOpacity className="bg-primary px-5 py-2 rounded-full self-start">
                            <StyledText className="text-black text-sm font-bold">Learn More</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledImageBackground>
            </StyledView>
        </StyledView>

        {/* New Releases */}
        <StyledView className="pt-8 px-4">
            <StyledView className="flex-row justify-between items-center mb-4">
                <StyledText className="text-xl font-bold dark:text-white font-display">New Releases</StyledText>
                <StyledTouchableOpacity>
                    <StyledText className="text-primary text-sm font-bold">See All</StyledText>
                </StyledTouchableOpacity>
            </StyledView>
            <StyledView className="flex-row gap-4">
                {newReleases.map(book => (
                    <StyledTouchableOpacity key={book.id} className="flex-1 bg-white dark:bg-white rounded-xl p-3 shadow-lg" onPress={() => navigation.navigate('Checkout')}>
                        <StyledView className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 mb-3">
                            <StyledImage source={{ uri: book.imageUrl }} className="w-full h-full" />
                            <StyledView className="absolute top-2 right-2 bg-background-dark/80 p-1.5 rounded-full">
                                <MaterialIcons name={book.type === 'audiobook' ? 'headset' : 'menu-book'} size={14} color="#f2d00d" />
                            </StyledView>
                        </StyledView>
                        <StyledText className="text-background-dark text-sm font-bold line-clamp-1 font-display" numberOfLines={1}>{book.title}</StyledText>
                        <StyledText className="text-gray-500 text-xs mb-2">{book.author}</StyledText>
                        <StyledView className="flex-row items-center justify-between mt-auto">
                            <StyledText className="text-background-dark font-bold text-sm">${book.price}</StyledText>
                            <StyledView className="bg-primary px-3 py-1.5 rounded-full">
                                <StyledText className="text-background-dark text-[10px] font-bold uppercase">Buy</StyledText>
                            </StyledView>
                        </StyledView>
                    </StyledTouchableOpacity>
                ))}
            </StyledView>
        </StyledView>

        {/* Bestsellers */}
        <StyledView className="pt-10">
            <StyledView className="flex-row justify-between items-center px-4 mb-4">
                <StyledText className="text-xl font-bold dark:text-white font-display">Bestsellers</StyledText>
                <StyledTouchableOpacity>
                    <StyledText className="text-primary text-sm font-bold">See All</StyledText>
                </StyledTouchableOpacity>
            </StyledView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}>
                {bestSellers.map((book, index) => (
                    <StyledTouchableOpacity key={book.id} className="w-[260px] bg-white dark:bg-white rounded-xl p-3 flex-row gap-4 shadow-lg border border-primary/20" onPress={() => navigation.navigate('Checkout')}>
                        <StyledImage source={{ uri: book.imageUrl }} className="w-24 aspect-[3/4] rounded-lg bg-gray-100" />
                        <StyledView className="flex-1 py-1 justify-between">
                            <StyledView>
                                <StyledView className="flex-row items-center gap-1 mb-1">
                                    <MaterialIcons name={book.type === 'audiobook' ? 'headset' : 'menu-book'} size={14} color="#f2d00d" />
                                    <StyledText className="text-[10px] text-gray-400 font-bold uppercase">{book.type === 'audiobook' ? 'Audiobook' : 'E-Book'}</StyledText>
                                </StyledView>
                                <StyledText className="text-background-dark text-sm font-bold font-display" numberOfLines={2}>{book.title}</StyledText>
                                <StyledText className="text-gray-400 text-xs">Best Seller #{index + 1}</StyledText>
                            </StyledView>
                            <StyledView className="gap-2">
                                <StyledText className="text-background-dark font-bold text-lg leading-none">${book.price}</StyledText>
                                <StyledView className="bg-primary px-4 py-2 rounded-full self-start">
                                    <StyledText className="text-background-dark text-[10px] font-bold uppercase">Buy Now</StyledText>
                                </StyledView>
                            </StyledView>
                        </StyledView>
                    </StyledTouchableOpacity>
                ))}
            </ScrollView>
        </StyledView>

        {/* Trending E-pubs (Using filtered/sliced list) */}
        <StyledView className="pt-8 mb-6 px-4">
             <StyledView className="flex-row justify-between items-center mb-4">
                <StyledText className="text-xl font-bold dark:text-white font-display">Trending E-pubs</StyledText>
            </StyledView>
            <StyledView className="flex-row gap-4">
                {trending.map(book => (
                     <StyledTouchableOpacity key={book.id} className="flex-1 bg-white dark:bg-white rounded-xl p-3 shadow-lg" onPress={() => navigation.navigate('Checkout')}>
                        <StyledView className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 mb-3">
                            <StyledImage source={{ uri: book.imageUrl }} className="w-full h-full" />
                            <StyledView className="absolute top-2 right-2 bg-background-dark/80 p-1.5 rounded-full">
                                <MaterialIcons name={book.type === 'audiobook' ? 'headset' : 'menu-book'} size={14} color="#f2d00d" />
                            </StyledView>
                        </StyledView>
                        <StyledText className="text-background-dark text-sm font-bold line-clamp-1 font-display" numberOfLines={1}>{book.title}</StyledText>
                        <StyledText className="text-gray-500 text-xs mb-2">{book.author}</StyledText>
                        <StyledView className="flex-row items-center justify-between mt-auto">
                            <StyledText className="text-background-dark font-bold text-sm">${book.price}</StyledText>
                            <StyledView className="bg-primary px-3 py-1.5 rounded-full">
                                <StyledText className="text-background-dark text-[10px] font-bold uppercase">Buy</StyledText>
                            </StyledView>
                        </StyledView>
                    </StyledTouchableOpacity>
                ))}
            </StyledView>
        </StyledView>

      </ScrollView>
    </ScreenWrapper>
  );
}
