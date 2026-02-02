import React from 'react';
import { View, StatusBar, ViewStyle, StyleSheet } from 'react-native';

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <StatusBar barStyle="light-content" backgroundColor="#221f10" />
      <View style={[styles.content, style]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221f10',
    paddingTop: 48,
  },
  content: {
    flex: 1,
  },
});
