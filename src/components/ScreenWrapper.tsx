import React from 'react';
import { View, SafeAreaView, StatusBar, useColorScheme, ViewStyle } from 'react-native';
import { styled } from 'nativewind';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, style }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <StyledSafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#221f10' : '#f8f8f5'} />
      <StyledView className="flex-1" style={style}>
        {children}
      </StyledView>
    </StyledSafeAreaView>
  );
};
