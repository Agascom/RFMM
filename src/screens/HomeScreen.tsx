import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { styled } from 'nativewind';
import { MaterialIcons } from '@expo/vector-icons';
import { getUser, getFeaturedEvent, getFeaturedPodcasts, getCoachingSessions } from '../services/api';
import { User, Event, PodcastEpisode, CoachingSession } from '../services/api/types';
import { useNavigation } from '@react-navigation/native';

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledImageBackground = styled(ImageBackground);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [user, setUser] = useState<User | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [podcasts, setPodcasts] = useState<PodcastEpisode[]>([]);
  const [coaching, setCoaching] = useState<CoachingSession[]>([]);

  useEffect(() => {
    getUser().then(setUser);
    getFeaturedEvent().then(setEvent);
    getFeaturedPodcasts().then(setPodcasts);
    getCoachingSessions().then(setCoaching);
  }, []);

  if (!user || !event) return null; // Or loading state

  return (
    <ScreenWrapper>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Top App Bar */}
        <StyledView className="flex-row items-center justify-between px-4 py-4">
          <StyledView className="flex-row items-center gap-3">
            <StyledImage
              source={{ uri: user.avatarUrl }}
              className="w-10 h-10 rounded-full border-2 border-primary/30"
            />
            <StyledView>
              <StyledText className="text-[10px] uppercase tracking-widest text-primary font-display font-bold">Welcome back</StyledText>
              <StyledText className="text-lg font-display font-bold dark:text-white leading-tight">Morning, {user.name}</StyledText>
            </StyledView>
          </StyledView>
          <StyledView className="flex-row gap-2">
            <StyledTouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-white/5 dark:bg-white/10">
              <MaterialIcons name="search" size={24} color="#f2d00d" />
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-white/5 dark:bg-white/10">
              <MaterialIcons name="notifications" size={24} color="white" />
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>

        {/* Featured Event */}
        <StyledView className="px-4 py-2">
            <StyledTouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('NewsDetail')}
                className="relative w-full aspect-[16/10] rounded-xl overflow-hidden"
            >
                <StyledImageBackground source={{ uri: event.imageUrl }} className="flex-1 justify-end">
                    <StyledView className="absolute inset-0 bg-black/30" />
                    <StyledView className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent" />
                    <StyledView className="p-6 gap-2">
                        <StyledView className="bg-primary px-2 py-1 rounded-full self-start">
                            <StyledText className="text-black text-[10px] font-bold uppercase tracking-tighter">Live Event</StyledText>
                        </StyledView>
                        <StyledText className="text-2xl font-extrabold text-white leading-tight font-display">{event.title}</StyledText>
                        <StyledText className="text-white/80 text-sm max-w-[80%]">{event.description}</StyledText>
                        <StyledTouchableOpacity className="mt-2 bg-primary py-3 px-6 rounded-full self-start">
                            <StyledText className="text-black font-bold text-sm">Register Now</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledImageBackground>
            </StyledTouchableOpacity>
        </StyledView>

        {/* Featured Podcasts */}
        <StyledView className="flex-row items-center justify-between px-4 mt-6">
            <StyledView className="flex-row items-center border-l-4 border-primary pl-3">
                <StyledText className="text-xl font-bold tracking-tight dark:text-white font-display">Featured Podcasts</StyledText>
            </StyledView>
            <StyledTouchableOpacity>
                <StyledText className="text-primary text-xs font-bold uppercase tracking-widest">See All</StyledText>
            </StyledTouchableOpacity>
        </StyledView>

        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={podcasts}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16, gap: 16 }}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <StyledTouchableOpacity className="w-[160px] gap-3" onPress={() => navigation.navigate('Player')}>
                    <StyledView className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
                        <StyledImage source={{ uri: item.imageUrl }} className="w-full h-full" />
                        <StyledView className="absolute bottom-2 right-2 w-10 h-10 bg-primary/90 rounded-full items-center justify-center">
                            <MaterialIcons name="play-arrow" size={24} color="black" />
                        </StyledView>
                    </StyledView>
                    <StyledView>
                        <StyledText className="text-white text-sm font-bold truncate font-display" numberOfLines={1}>{item.title}</StyledText>
                        <StyledText className="text-primary/70 text-[11px] font-medium uppercase">Episode {item.episodeNumber}</StyledText>
                    </StyledView>
                </StyledTouchableOpacity>
            )}
        />

        {/* Quick Access Grid */}
        <StyledView className="px-4 py-2">
            <StyledView className="flex-row gap-3">
                <StyledTouchableOpacity className="flex-1 bg-white/5 rounded-lg p-4 flex-row items-center gap-3 border border-white/10" onPress={() => navigation.navigate('Store')}>
                    <StyledView className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center">
                        <MaterialIcons name="auto-stories" size={20} color="#f2d00d" />
                    </StyledView>
                    <StyledView>
                        <StyledText className="text-white text-xs font-bold font-display">E-Books</StyledText>
                        <StyledText className="text-white/40 text-[10px]">12 New items</StyledText>
                    </StyledView>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="flex-1 bg-white/5 rounded-lg p-4 flex-row items-center gap-3 border border-white/10" onPress={() => navigation.navigate('Library')}>
                    <StyledView className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center">
                        <MaterialIcons name="headphones" size={20} color="#f2d00d" />
                    </StyledView>
                    <StyledView>
                        <StyledText className="text-white text-xs font-bold font-display">Audiobooks</StyledText>
                        <StyledText className="text-white/40 text-[10px]">6 Tracks</StyledText>
                    </StyledView>
                </StyledTouchableOpacity>
            </StyledView>
        </StyledView>

        {/* Coaching Sessions */}
        <StyledView className="flex-row items-center justify-between px-4 mt-6">
            <StyledView className="flex-row items-center border-l-4 border-primary pl-3">
                <StyledText className="text-xl font-bold tracking-tight dark:text-white font-display">Coaching Sessions</StyledText>
            </StyledView>
            <StyledTouchableOpacity>
                <StyledText className="text-primary text-xs font-bold uppercase tracking-widest">View Path</StyledText>
            </StyledTouchableOpacity>
        </StyledView>

        <StyledView className="px-4 py-4 gap-4">
            {coaching.map((session) => (
                <StyledTouchableOpacity key={session.id} className="flex-row gap-4 bg-white/5 p-3 rounded-lg border border-white/10">
                    <StyledImage source={{ uri: session.imageUrl }} className="w-20 h-20 rounded-lg" />
                    <StyledView className="flex-1 justify-center gap-1">
                        <StyledText className="text-[10px] text-primary font-bold uppercase tracking-widest">{session.category}</StyledText>
                        <StyledText className="text-white text-base font-bold font-display">{session.title}</StyledText>
                        <StyledView className="flex-row items-center gap-2">
                            <StyledView className="flex-1 bg-white/10 h-1 rounded-full overflow-hidden">
                                <StyledView className="bg-primary h-full" style={{ width: `${session.progress}%` }} />
                            </StyledView>
                            <StyledText className="text-[10px] text-white/50">{session.progress > 0 ? `${session.progress}%` : 'New'}</StyledText>
                        </StyledView>
                    </StyledView>
                </StyledTouchableOpacity>
            ))}
        </StyledView>

        {/* Mini Player Overlay - Mock visual */}
        <StyledView className="mx-4 mt-4 bg-[#322f1c] rounded-lg border border-primary/20 p-2 flex-row items-center gap-3 shadow-2xl">
            <StyledImage source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbHJ8iV-1Wh6fiSwBv8XjZhR4M6-awEHFQrNoqMFlKAOCk8UIyoCkJ6SOf_xera_-9OLu-SSHsP2Kg08MKN1KXuOym-UXswDWX9kPUnM93y6vrxP1sXtTMC39S2Q4eMGwGBXQ44YCmLv6BwQ0_7K9h-PdnESUBCKnq8DXMFzYpuK09E6L3uMgTYwpmxAr74Hd4N-dyNGzbCShMuwxfrlipq13qBCvQt4FV7JcMaNhDw3Xzua2z2GkLyXOk1Hn54dcFAqvq7zcpZnOz' }} className="w-10 h-10 rounded-md" />
            <StyledView className="flex-1">
                <StyledText className="text-white text-xs font-bold truncate">Path to Grace</StyledText>
                <StyledText className="text-primary/60 text-[10px] truncate">Pastor Francis</StyledText>
            </StyledView>
            <StyledView className="flex-row items-center gap-2 px-2">
                <MaterialIcons name="pause" size={24} color="white" />
                <MaterialIcons name="close" size={24} color="white" />
            </StyledView>
        </StyledView>

      </ScrollView>
    </ScreenWrapper>
  );
}
