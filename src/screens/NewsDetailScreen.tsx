import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { styled } from 'nativewind';
import { MaterialIcons } from '@expo/vector-icons';
import { getNewsArticle } from '../services/api';
import { NewsArticle } from '../services/api/types';
import { useNavigation } from '@react-navigation/native';

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledImageBackground = styled(ImageBackground);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function NewsDetailScreen() {
  const navigation = useNavigation();
  const [article, setArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    getNewsArticle('a1').then(setArticle);
  }, []);

  if (!article) return null;

  return (
    <ScreenWrapper>
       <ScrollView className="flex-1 pb-24">
            {/* Header Image */}
            <StyledView className="relative h-[400px] w-full">
                <StyledImageBackground source={{ uri: article.imageUrl }} className="w-full h-full justify-end">
                     <StyledView className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-60" />
                     {/* Overlay Gradient simulated by background color if gradient not avail */}
                     <StyledView className="absolute inset-0 bg-black/30" />
                </StyledImageBackground>

                {/* Custom Header Bar over Image */}
                <StyledView className="absolute top-0 left-0 right-0 p-4 flex-row justify-between items-center z-50">
                    <StyledTouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 rounded-full bg-black/20 items-center justify-center">
                        <MaterialIcons name="arrow-back" size={24} color="white" />
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity className="w-10 h-10 rounded-full bg-black/20 items-center justify-center">
                        <MaterialIcons name="share" size={24} color="#f2d00d" />
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>

            {/* Reading Progress Bar (Static mock) */}
            <StyledView className="w-full h-1 bg-gray-200 dark:bg-gray-800">
                <StyledView className="h-full w-1/3 bg-primary shadow-[0_0_8px_rgba(242,208,13,0.5)]" />
            </StyledView>

            {/* Content */}
            <StyledView className="px-4 -mt-6 bg-background-light dark:bg-background-dark rounded-t-3xl pt-8 relative">

                {/* Chips */}
                <StyledView className="flex-row gap-3 mb-4">
                    <StyledView className="bg-primary/20 px-3 py-1 rounded-lg border border-primary/30">
                        <StyledText className="text-primary text-xs font-bold uppercase tracking-widest">{article.category}</StyledText>
                    </StyledView>
                    <StyledView className="bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                        <StyledText className="text-slate-400 text-xs font-medium uppercase tracking-widest">{article.readTime}</StyledText>
                    </StyledView>
                </StyledView>

                {/* Title */}
                <StyledText className="text-primary font-serifBold tracking-tight text-3xl leading-tight mb-4">
                    {article.title}
                </StyledText>

                {/* Meta */}
                <StyledView className="flex-row items-center gap-3 pb-8 mb-6 border-b border-primary/10">
                    <StyledView className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center border border-primary/20">
                        <MaterialIcons name="person" size={20} color="#f2d00d" />
                    </StyledView>
                    <StyledView>
                        <StyledText className="text-slate-900 dark:text-white text-sm font-bold">{article.author}</StyledText>
                        <StyledText className="text-slate-500 dark:text-[#bab59c] text-xs font-normal">{article.publishedAt}</StyledText>
                    </StyledView>
                </StyledView>

                {/* Body */}
                <StyledView className="gap-4">
                     <StyledText className="text-lg leading-relaxed text-slate-800 dark:text-slate-200 font-serif">
                        <StyledText className="text-5xl font-bold text-primary mr-2 font-serifBold">I</StyledText>
                        n a momentous gathering yesterday at the Grand Cathedral, Pastor Francis unveiled the "Beacon of Hope" initiative, a multi-national effort aimed at providing spiritual guidance and physical resources to underserved communities across three continents.
                     </StyledText>
                     <StyledText className="text-lg leading-relaxed text-slate-800 dark:text-slate-200 font-serif">
                        The initiative marks a significant turning point for the ministry, shifting focus towards high-impact community centers that combine vocational training with scriptural education. "Our mission has always been to reach the heart," Pastor Francis noted during his keynote, "but we must also nourish the hands that do God's work."
                     </StyledText>

                     {/* Blockquote */}
                     <StyledView className="border-l-4 border-primary pl-6 py-2 my-4">
                        <StyledText className="italic text-xl text-primary font-medium leading-snug font-serifItalic">
                            "We are not just building churches; we are building sustainable futures rooted in faith and compassion."
                        </StyledText>
                     </StyledView>

                     <StyledText className="text-lg leading-relaxed text-slate-800 dark:text-slate-200 font-serif">
                        Phase one of the rollout is scheduled to begin next month in Nairobi, followed quickly by expansions into parts of Southeast Asia and Central America. The ministry has partnered with local NGOs to ensure that the outreach is culturally resonant and addresses specific regional needs.
                     </StyledText>
                </StyledView>

                {/* Related Articles */}
                <StyledView className="mt-12 pb-12">
                    <StyledView className="flex-row justify-between items-center mb-6">
                        <StyledText className="text-white text-xl font-bold font-serif">Related Articles</StyledText>
                        <StyledTouchableOpacity className="flex-row items-center gap-1">
                            <StyledText className="text-primary text-sm font-bold">View All</StyledText>
                            <MaterialIcons name="arrow-forward" size={14} color="#f2d00d" />
                        </StyledTouchableOpacity>
                    </StyledView>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4">
                        {article.relatedArticles?.map(related => (
                            <StyledTouchableOpacity key={related.id} className="w-[260px] bg-white/5 border border-white/10 rounded-xl overflow-hidden mr-4">
                                <StyledImage source={{ uri: related.imageUrl }} className="h-36 w-full bg-gray-700" />
                                <StyledView className="p-4">
                                    <StyledText className="text-primary text-[10px] font-bold uppercase tracking-widest">{related.category}</StyledText>
                                    <StyledText className="text-white font-bold leading-tight mt-1" numberOfLines={2}>{related.title}</StyledText>
                                    <StyledText className="text-[#bab59c] text-xs mt-2">{related.publishedAt}</StyledText>
                                </StyledView>
                            </StyledTouchableOpacity>
                        ))}
                    </ScrollView>
                </StyledView>

            </StyledView>
       </ScrollView>
    </ScreenWrapper>
  );
}
