import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { styled } from 'nativewind';
import { MaterialIcons } from '@expo/vector-icons';
import { getLibraryItems } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function LibraryScreen() {
  const navigation = useNavigation<any>();
  const [items, setItems] = useState<{ inProgress: any[], completed: any[] }>({ inProgress: [], completed: [] });

  useEffect(() => {
    getLibraryItems().then(setItems);
  }, []);

  return (
    <ScreenWrapper>
      {/* Top Bar */}
      <StyledView className="flex-row items-center justify-between p-4 border-b border-black/10 dark:border-white/10 bg-background-light dark:bg-background-dark">
        <StyledTouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 items-center justify-center">
             <MaterialIcons name="arrow-back-ios" size={24} color="gray" />
        </StyledTouchableOpacity>
        <StyledText className="text-xl font-bold font-display dark:text-white">My Library</StyledText>
        <StyledTouchableOpacity className="w-10 h-10 items-center justify-center">
             <MaterialIcons name="search" size={24} color="gray" />
        </StyledTouchableOpacity>
      </StyledView>

      <ScrollView className="flex-1 pb-24" stickyHeaderIndices={[0]}>
         {/* Tabs */}
         <StyledView className="bg-background-light dark:bg-background-dark px-4 flex-row justify-between border-b border-black/10 dark:border-white/10">
            <StyledTouchableOpacity className="flex-1 items-center pb-3 pt-4 border-b-2 border-primary">
                <StyledText className="text-sm font-bold tracking-wide text-primary">Audiobooks</StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className="flex-1 items-center pb-3 pt-4 border-b-2 border-transparent">
                <StyledText className="text-sm font-bold tracking-wide text-gray-500 dark:text-stone-400">E-books</StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className="flex-1 items-center pb-3 pt-4 border-b-2 border-transparent">
                <StyledText className="text-sm font-bold tracking-wide text-gray-500 dark:text-stone-400">Coaching</StyledText>
            </StyledTouchableOpacity>
         </StyledView>

         {/* Recently Played */}
         <StyledView className="px-4 py-4">
            <StyledText className="text-xs uppercase tracking-widest font-bold text-slate-500 dark:text-stone-400">Recently Played</StyledText>
         </StyledView>

         <StyledView className="gap-1">
            {items.inProgress.map((item, index) => (
                <StyledTouchableOpacity
                    key={item.id}
                    className="flex-row items-center gap-4 px-4 py-3 bg-transparent hover:bg-black/5 dark:hover:bg-white/5"
                    onPress={() => navigation.navigate('Player')}
                >
                    <StyledView className="relative w-16 h-16 rounded-lg overflow-hidden shadow-lg">
                        <StyledImage source={{ uri: item.imageUrl }} className="w-full h-full" />
                        <StyledView className="absolute inset-0 bg-black/20 items-center justify-center">
                            {/* Play icon overlay */}
                        </StyledView>
                    </StyledView>
                    <StyledView className="flex-1 justify-center">
                        <StyledText className="text-base font-bold leading-snug font-display dark:text-white" numberOfLines={1}>{item.title}</StyledText>
                        <StyledText className="text-slate-500 dark:text-stone-400 text-sm mb-2">Pastor Francis • {item.totalDuration}</StyledText>
                        <StyledView className="flex-row items-center gap-3">
                            <StyledView className="flex-1 h-1 rounded-full bg-slate-200 dark:bg-stone-700 overflow-hidden">
                                <StyledView className="h-full bg-primary" style={{ width: `${item.progress}%` }} />
                            </StyledView>
                            <StyledText className="text-primary text-xs font-bold w-8 text-right">{item.progress}%</StyledText>
                        </StyledView>
                    </StyledView>
                </StyledTouchableOpacity>
            ))}
         </StyledView>

         {/* Finished & E-books */}
         <StyledView className="px-4 py-6 border-t border-black/10 dark:border-white/10 mt-2">
            <StyledText className="text-xs uppercase tracking-widest font-bold text-slate-500 dark:text-stone-400">Finished & E-books</StyledText>
         </StyledView>

         <StyledView className="gap-1">
            {items.completed.map(item => (
                <StyledTouchableOpacity key={item.id} className="flex-row items-center gap-4 px-4 py-3">
                     {item.isCompleted ? (
                        <StyledImage source={{ uri: item.imageUrl }} className="w-16 h-16 rounded-lg opacity-60" />
                     ) : (
                        <StyledImage source={{ uri: item.imageUrl }} className="w-16 h-20 rounded-lg shadow-lg border border-white/10" resizeMode="cover" />
                     )}

                     <StyledView className="flex-1 justify-center">
                        <StyledText className="text-base font-bold leading-snug font-display dark:text-white" numberOfLines={1}>{item.title}</StyledText>
                        {item.type === 'ebook' ? (
                            <>
                                <StyledText className="text-slate-500 dark:text-stone-400 text-sm">Digital Edition</StyledText>
                                <StyledView className="mt-2 flex-row items-center gap-2">
                                    <StyledView className="bg-primary/20 px-2 py-0.5 rounded">
                                        <StyledText className="text-primary text-[10px] font-bold uppercase">Read</StyledText>
                                    </StyledView>
                                    <StyledText className="text-xs text-slate-400">{item.size}</StyledText>
                                </StyledView>
                            </>
                        ) : (
                            <StyledView className="flex-row items-center gap-2 mt-1">
                                <MaterialIcons name="check-circle" size={16} color="#f2d00d" />
                                <StyledText className="text-primary text-xs font-bold uppercase tracking-tighter">Completed</StyledText>
                            </StyledView>
                        )}
                     </StyledView>

                     <StyledView>
                        {item.type === 'ebook' ? (
                            <StyledView className="w-10 h-10 rounded-full bg-primary items-center justify-center">
                                <MaterialIcons name="menu-book" size={20} color="black" />
                            </StyledView>
                        ) : (
                            <MaterialIcons name="more-vert" size={24} color="gray" />
                        )}
                     </StyledView>
                </StyledTouchableOpacity>
            ))}
         </StyledView>

         <StyledView className="mt-8 px-4 text-center mb-8">
            <StyledText className="text-slate-500 dark:text-stone-500 text-sm mb-4 text-center">Looking for something new?</StyledText>
            <StyledTouchableOpacity className="bg-primary py-3 px-8 rounded-full self-center" onPress={() => navigation.navigate('Store')}>
                <StyledText className="text-black font-bold text-sm uppercase tracking-widest">Browse Store</StyledText>
            </StyledTouchableOpacity>
         </StyledView>

      </ScrollView>
    </ScreenWrapper>
  );
}
