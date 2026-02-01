import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { styled } from 'nativewind';
import { MaterialIcons } from '@expo/vector-icons';
import { getNowPlaying } from '../services/api';
import { PodcastEpisode } from '../services/api/types';
import { useNavigation } from '@react-navigation/native';

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function PlayerScreen() {
  const navigation = useNavigation();
  const [track, setTrack] = useState<PodcastEpisode | null>(null);

  useEffect(() => {
    getNowPlaying().then(setTrack);
  }, []);

  if (!track) return null;

  return (
    <ScreenWrapper style={{ backgroundColor: '#1a0f00' }}>
      <StyledView className="flex-1 px-6 pb-8">
        {/* Header */}
        <StyledView className="flex-row items-center justify-between py-6">
            <StyledTouchableOpacity onPress={() => navigation.goBack()} className="w-12 h-12 items-start justify-center">
                <MaterialIcons name="keyboard-arrow-down" size={32} color="white" />
            </StyledTouchableOpacity>
            <StyledText className="text-white text-sm font-semibold tracking-wider uppercase">Now Playing</StyledText>
            <StyledTouchableOpacity className="w-12 h-12 items-end justify-center">
                <MaterialIcons name="more-horiz" size={32} color="white" />
            </StyledTouchableOpacity>
        </StyledView>

        {/* Cover Art */}
        <StyledView className="w-full aspect-square rounded-xl overflow-hidden shadow-2xl bg-neutral-800 my-4">
            <StyledImage source={{ uri: track.imageUrl }} className="w-full h-full" resizeMode="cover" />
        </StyledView>

        {/* Info */}
        <StyledView className="mt-8 mb-4 flex-row justify-between items-end">
            <StyledView className="flex-1">
                <StyledText className="text-white text-2xl font-bold leading-tight font-display">{track.title}</StyledText>
                <StyledText className="text-white/70 text-lg font-medium mt-1">{track.seriesTitle}</StyledText>
            </StyledView>
            <StyledTouchableOpacity>
                <MaterialIcons name="favorite-border" size={28} color="rgba(255,255,255,0.8)" />
            </StyledTouchableOpacity>
        </StyledView>

        {/* Progress */}
        <StyledView className="mt-4 gap-2">
            <StyledView className="w-full h-1.5 bg-white/20 rounded-full relative">
                <StyledView className="absolute top-0 left-0 h-full bg-primary rounded-full" style={{ width: '35%' }} />
                <StyledView className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg" style={{ left: '35%' }} />
            </StyledView>
            <StyledView className="flex-row justify-between">
                <StyledText className="text-white/60 text-xs font-medium">12:45</StyledText>
                <StyledText className="text-white/60 text-xs font-medium">-25:35</StyledText>
            </StyledView>
        </StyledView>

        {/* Controls */}
        <StyledView className="flex-row items-center justify-around mt-8">
            <StyledTouchableOpacity>
                <MaterialIcons name="replay-5" size={32} color="rgba(255,255,255,0.8)" />
            </StyledTouchableOpacity>
            <StyledTouchableOpacity>
                <MaterialIcons name="skip-previous" size={40} color="rgba(255,255,255,0.8)" />
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className="w-20 h-20 bg-primary rounded-full items-center justify-center shadow-lg shadow-primary/20">
                <MaterialIcons name="pause" size={40} color="#1a0f00" />
            </StyledTouchableOpacity>
            <StyledTouchableOpacity>
                <MaterialIcons name="skip-next" size={40} color="rgba(255,255,255,0.8)" />
            </StyledTouchableOpacity>
            <StyledTouchableOpacity>
                <MaterialIcons name="forward-30" size={32} color="rgba(255,255,255,0.8)" />
            </StyledTouchableOpacity>
        </StyledView>

        {/* Bottom Actions */}
        <StyledView className="mt-auto flex-row items-center justify-between">
            <StyledTouchableOpacity className="flex-row items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <MaterialIcons name="speed" size={20} color="white" />
                <StyledText className="text-white text-xs font-bold">1.2x</StyledText>
            </StyledTouchableOpacity>
            <StyledView className="flex-row gap-8">
                <StyledTouchableOpacity>
                    <MaterialIcons name="file-download" size={24} color="rgba(255,255,255,0.8)" />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity>
                    <MaterialIcons name="share" size={24} color="rgba(255,255,255,0.8)" />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity>
                    <MaterialIcons name="playlist-add" size={24} color="rgba(255,255,255,0.8)" />
                </StyledTouchableOpacity>
            </StyledView>
        </StyledView>
      </StyledView>
    </ScreenWrapper>
  );
}
