import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { styled } from 'nativewind';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const [selectedMethod, setSelectedMethod] = useState<'airtel' | 'moov' | 'card'>('airtel');

  // Dummy Product Data (Walking in Grace / Walking in Faith)
  const product = {
      title: 'Walking in Faith',
      type: 'E-book by Pastor Francis',
      price: 14.99,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC65_rrcQgI7Gg6AFnG2ElqYdwOVh0f5oNsF1AJN41YiG0mqXmO8VPWwV5uz1IUuqHXItOiFyfNFuZW1N8k6IWXSIhvRYKANNpVjeYTOJl5WkHmIdOg1WoJrs59x1CncjT-UQMC5iH89RupyrYRiCKDvxSp6xOh9myp82edUdn1peA-QDdCTTUmUxURjoniO_5G3y9pxL-w2qyRQ-tUMkGeYJNNaRpEjNVrPeHl57Y3WBr_BNPXkJJIcWZbiPoqdOB3oGgUW5p9OcEe'
  };

  return (
    <ScreenWrapper>
        {/* Header */}
        <StyledView className="flex-row items-center px-4 py-4 border-b border-gray-200 dark:border-white/5">
            <StyledTouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 items-center justify-center rounded-full hover:bg-white/10">
                <MaterialIcons name="arrow-back-ios" size={20} color="gray" />
            </StyledTouchableOpacity>
            <StyledText className="text-lg font-bold flex-1 text-center pr-10 dark:text-white font-display">Checkout</StyledText>
        </StyledView>

        <ScrollView className="flex-1">
            {/* Order Summary */}
            <StyledView className="px-4 pt-6 pb-2">
                <StyledText className="text-lg font-bold dark:text-white font-display">Order Summary</StyledText>
            </StyledView>
            <StyledView className="px-4 py-2">
                <StyledView className="flex-row justify-between gap-4 rounded-xl bg-white dark:bg-[#2d2a1b] p-4 shadow-sm border border-slate-100 dark:border-white/5">
                    <StyledView className="flex-1 justify-between py-1">
                        <StyledView>
                            <StyledText className="text-slate-500 dark:text-[#bab59c] text-xs font-medium uppercase tracking-wider mb-1">Purchase</StyledText>
                            <StyledText className="text-slate-900 dark:text-white text-base font-bold leading-tight font-display">{product.title}</StyledText>
                            <StyledText className="text-slate-500 dark:text-[#bab59c] text-sm font-normal mt-1">{product.type}</StyledText>
                        </StyledView>
                        <StyledView className="bg-primary/20 self-start px-3 py-1 rounded-full mt-3">
                            <StyledText className="text-primary font-bold text-sm">${product.price}</StyledText>
                        </StyledView>
                    </StyledView>
                    <StyledImage source={{ uri: product.imageUrl }} className="w-24 h-32 rounded-lg bg-gray-200" />
                </StyledView>
            </StyledView>

            {/* Payment Method */}
            <StyledView className="px-4 pt-8 pb-2">
                <StyledText className="text-lg font-bold dark:text-white font-display">Select Payment Method</StyledText>
            </StyledView>

            <StyledView className="flex-col gap-3 p-4">
                {/* Airtel */}
                <StyledTouchableOpacity
                    onPress={() => setSelectedMethod('airtel')}
                    className={`flex-row items-center gap-4 rounded-xl border-2 p-4 ${selectedMethod === 'airtel' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-[#54503b]'}`}
                >
                     <StyledView className={`w-6 h-6 rounded-full border-2 items-center justify-center ${selectedMethod === 'airtel' ? 'border-primary' : 'border-slate-300 dark:border-[#54503b]'}`}>
                        {selectedMethod === 'airtel' && <StyledView className="w-3 h-3 rounded-full bg-primary" />}
                     </StyledView>
                     <StyledView className="flex-1 flex-row items-center gap-3">
                        <StyledImage
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQLGp82igbkVb7Gz8qQcYQraFYwpEX8o9X02Ro9EH6JJZev9q1XMoMOmiLsdS2N4nKVMrLqoWSECkBHP_lBXCBzrZU2y4CCJgoBvcyYOugcbdVFWsyVnhVTkNPf5cP2IHkMRG4tmv7b8M0oXbO12VqkJ8WFp6XGL9vZNhUr6M1WHOK06-kCr_E2cqi3gbL6FIOvzeM3jaiKZtei7AEmwY9p9wJ_LdDRBPyZs4GruN3c6Es0MuWA-pO3l074reoRXsFg9P2GuvdVsMb' }}
                            className="w-10 h-10 rounded-lg bg-red-600"
                        />
                        <StyledView>
                            <StyledText className="text-slate-900 dark:text-white text-sm font-semibold">Airtel Money</StyledText>
                            <StyledText className="text-slate-500 dark:text-[#bab59c] text-xs">Fast and secure mobile payment</StyledText>
                        </StyledView>
                     </StyledView>
                </StyledTouchableOpacity>

                {/* Moov */}
                <StyledTouchableOpacity
                    onPress={() => setSelectedMethod('moov')}
                    className={`flex-row items-center gap-4 rounded-xl border-2 p-4 ${selectedMethod === 'moov' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-[#54503b]'}`}
                >
                     <StyledView className={`w-6 h-6 rounded-full border-2 items-center justify-center ${selectedMethod === 'moov' ? 'border-primary' : 'border-slate-300 dark:border-[#54503b]'}`}>
                        {selectedMethod === 'moov' && <StyledView className="w-3 h-3 rounded-full bg-primary" />}
                     </StyledView>
                     <StyledView className="flex-1 flex-row items-center gap-3">
                        <StyledImage
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoMmrxZhDlhiFOZHcn7vEsZsGhQQYq9WFq_LGeLGuyl-FAa4BY4hx-xjmMBIKkwDCFbL4HH7jiQ_kMC-NQsQ_6ezLLcPJt9DyxMBFWVNTyZ5aABRet9qSA3ZOQ5nqqE1PnDkZQQukFnUyH0PvP0qSHfb65S2PAJVJ7PBRsb2jIvdW1Q5fYG1miZvbPHsyxgPmVMG540_5P67rAnQTcOud9_AowdJJ7YRYYYnlj834J__m8SGJH7okCQjo5XptArTwI2YmBQJjoJoTR' }}
                            className="w-10 h-10 rounded-lg bg-blue-600"
                        />
                        <StyledView>
                            <StyledText className="text-slate-900 dark:text-white text-sm font-semibold">Moov Money</StyledText>
                            <StyledText className="text-slate-500 dark:text-[#bab59c] text-xs">Pay with your Moov wallet</StyledText>
                        </StyledView>
                     </StyledView>
                </StyledTouchableOpacity>

                {/* Card */}
                <StyledTouchableOpacity
                    onPress={() => setSelectedMethod('card')}
                    className={`flex-row items-center gap-4 rounded-xl border-2 p-4 ${selectedMethod === 'card' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-[#54503b]'}`}
                >
                     <StyledView className={`w-6 h-6 rounded-full border-2 items-center justify-center ${selectedMethod === 'card' ? 'border-primary' : 'border-slate-300 dark:border-[#54503b]'}`}>
                        {selectedMethod === 'card' && <StyledView className="w-3 h-3 rounded-full bg-primary" />}
                     </StyledView>
                     <StyledView className="flex-1 flex-row items-center gap-3">
                        <StyledView className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/10 items-center justify-center">
                            <MaterialIcons name="credit-card" size={24} color={selectedMethod === 'card' ? '#f2d00d' : 'gray'} />
                        </StyledView>
                        <StyledView>
                            <StyledText className="text-slate-900 dark:text-white text-sm font-semibold">Visa / Mastercard</StyledText>
                            <StyledText className="text-slate-500 dark:text-[#bab59c] text-xs">Credit or Debit card</StyledText>
                        </StyledView>
                     </StyledView>
                </StyledTouchableOpacity>
            </StyledView>

            <StyledView className="mx-4 p-4 mt-4 bg-primary/5 rounded-xl flex-row items-center gap-3">
                <MaterialIcons name="security" size={20} color="#f2d00d" />
                <StyledText className="text-xs text-slate-600 dark:text-[#bab59c] font-medium flex-1">
                    Your transaction is secured with 256-bit SSL encryption for your safety.
                </StyledText>
            </StyledView>
            <StyledView className="h-24" />
        </ScrollView>

        {/* Footer */}
        <StyledView className="absolute bottom-0 left-0 right-0 bg-white/95 dark:bg-[#181711]/95 p-4 pb-8 border-t border-slate-100 dark:border-white/5">
             <StyledView className="flex-row items-center justify-between mb-4 px-2">
                <StyledText className="text-slate-500 dark:text-[#bab59c] font-medium">Total Price</StyledText>
                <StyledText className="text-xl font-bold dark:text-white">${product.price}</StyledText>
             </StyledView>
             <StyledTouchableOpacity className="w-full bg-primary py-4 rounded-full shadow-lg shadow-primary/20 items-center">
                <StyledText className="text-background-dark font-bold text-base uppercase tracking-wide">Confirm Payment</StyledText>
             </StyledTouchableOpacity>
        </StyledView>
    </ScreenWrapper>
  );
}
