import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    FlatList,
    Animated
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        icon: 'auto-awesome',
        title: 'Bienvenue sur RFMM',
        subtitle: 'Votre compagnon spirituel au quotidien',
        description: 'Accédez à des enseignements inspirants, des podcasts et des programmes de coaching pour enrichir votre foi.',
        color: '#f2d00d',
    },
    {
        id: '2',
        icon: 'headphones',
        title: 'Podcasts & Livres Audio',
        subtitle: 'Écoutez où que vous soyez',
        description: 'Des centaines d\'heures de contenu audio de qualité, disponibles en téléchargement pour une écoute hors ligne.',
        color: '#4ECDC4',
    },
    {
        id: '3',
        icon: 'school',
        title: 'Coaching Personnalisé',
        subtitle: 'Grandissez dans votre foi',
        description: 'Des programmes structurés pour vous accompagner dans votre développement spirituel et personnel.',
        color: '#FF6B6B',
    },
    {
        id: '4',
        icon: 'favorite',
        title: 'Communauté Bienveillante',
        subtitle: 'Ensemble, nous sommes plus forts',
        description: 'Rejoignez une communauté de foi vibrante et participez à des événements transformateurs.',
        color: '#A78BFA',
    },
];

export default function OnboardingScreen({ onComplete }: { onComplete?: () => void }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const goToNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
            setCurrentIndex(currentIndex + 1);
        } else {
            onComplete?.();
        }
    };

    const goToSlide = (index: number) => {
        flatListRef.current?.scrollToIndex({ index });
        setCurrentIndex(index);
    };

    const renderSlide = ({ item, index }: { item: typeof slides[0], index: number }) => (
        <View style={styles.slide}>
            {/* Logo ou Icône animée */}
            {index === 0 ? (
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            ) : (
                <View style={[styles.iconWrapper, { backgroundColor: `${item.color}20` }]}>
                    <View style={[styles.iconInner, { backgroundColor: `${item.color}40` }]}>
                        <MaterialIcons name={item.icon as any} size={64} color={item.color} />
                    </View>
                </View>
            )}

            {/* Contenu */}
            <View style={styles.slideContent}>
                <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
                <Text style={[styles.slideTitle, { color: item.color }]}>{item.title}</Text>
                <Text style={styles.slideDescription}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Skip button */}
            <TouchableOpacity style={styles.skipButton} onPress={onComplete}>
                <Text style={styles.skipText}>Passer</Text>
            </TouchableOpacity>

            {/* Slides */}
            <FlatList
                ref={flatListRef}
                data={slides}
                renderItem={renderSlide}
                keyExtractor={item => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onMomentumScrollEnd={(event) => {
                    const index = Math.round(event.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
            />

            {/* Indicateurs */}
            <View style={styles.pagination}>
                {slides.map((slide, index) => (
                    <TouchableOpacity
                        key={slide.id}
                        onPress={() => goToSlide(index)}
                    >
                        <View
                            style={[
                                styles.dot,
                                currentIndex === index && {
                                    backgroundColor: slide.color,
                                    width: 24,
                                }
                            ]}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            {/* Boutons */}
            <View style={styles.footer}>
                {currentIndex < slides.length - 1 ? (
                    <TouchableOpacity
                        style={[styles.nextButton, { backgroundColor: slides[currentIndex].color }]}
                        onPress={goToNext}
                    >
                        <Text style={styles.nextButtonText}>Suivant</Text>
                        <MaterialIcons name="arrow-forward" size={20} color="#221f10" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={[styles.startButton, { backgroundColor: slides[currentIndex].color }]}
                        onPress={onComplete}
                    >
                        <Text style={styles.startButtonText}>Commencer</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#221f10',
    },
    skipButton: {
        position: 'absolute',
        top: 48,
        right: 24,
        zIndex: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    skipText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 16,
        fontWeight: '500',
    },
    slide: {
        width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    iconWrapper: {
        width: 180,
        height: 180,
        borderRadius: 90,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 48,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 48,
    },
    iconInner: {
        width: 140,
        height: 140,
        borderRadius: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slideContent: {
        alignItems: 'center',
    },
    slideSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.5)',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 8,
    },
    slideTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    slideDescription: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center',
        lineHeight: 24,
        maxWidth: 300,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginHorizontal: 4,
    },
    footer: {
        paddingHorizontal: 32,
        paddingBottom: 48,
    },
    nextButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        borderRadius: 28,
    },
    nextButtonText: {
        color: '#221f10',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
    },
    startButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        borderRadius: 28,
    },
    startButtonText: {
        color: '#221f10',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
