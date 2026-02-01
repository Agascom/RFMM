import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { styled } from 'nativewind';
import { getUser } from '../services/api';
import { User } from '../services/api/types';

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledImage = styled(Image);

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser().then(setUser);
  }, []);

  if (!user) return null;

  return (
    <ScreenWrapper>
      <StyledView className="flex-1 items-center justify-center p-4">
        <StyledImage source={{ uri: user.avatarUrl }} className="w-24 h-24 rounded-full border-4 border-primary mb-4" />
        <StyledText className="text-2xl font-bold dark:text-white font-display">{user.name}</StyledText>
        <StyledText className="text-slate-500 mt-2">Member since 2023</StyledText>
      </StyledView>
    </ScreenWrapper>
  );
}
