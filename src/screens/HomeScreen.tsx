import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    StyleSheet,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { booksService, coachingService, newsService } from '../services/api';
import { Book, CoachingProgram, News } from '../types/api';

const { width } = Dimensions.get('window');

// Données mock pour l'utilisateur (sera remplacé par authService plus tard)
const userData = {
    name: 'Utilisateur',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIAWhjEs9kf5ijzyZiuwXASXSFOwjxLkFIWWyRq44JP5TewkzTyv6_8MVudSGlRrpkQpZSMY-wNpWr5URxnA8y9hBUpuVph4nyf1iwI5Ky5nLOyg2Pt2VG7IvosgJqGqlvfRTMjYfvt6gFBTlK6o_wMvi1eldqwVBWRtRfo1n9aNh1yCMdmO4N3odRoJJj0OwCc6rAMx_XmB8RewRlnlrXu07iOqDbF4fSF9hMc8_qoVw9zlKFOBmzrUUdQPoeOu1j2nOXnTbrJutk',
};

const nowPlaying = {
    title: 'Le Chemin de la Grâce',
    artist: 'Pasteur Francis',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbHJ8iV-1Wh6fiSwBv8XjZhR4M6-awEHFQrNoqMFlKAOCk8UIyoCkJ6SOf_xera_-9OLu-SSHsP2Kg08MKN1KXuOym-UXswDWX9kPUnM93y6vrxP1sXtTMC39S2Q4eMGwGBXQ44YCmLv6BwQ0_7K9h-PdnESUBCKnq8DXMFzYpuK09E6L3uMgTYwpmxAr74Hd4N-dyNGzbCShMuwxfrlipq13qBCvQt4FV7JcMaNhDw3Xzua2z2GkLyXOk1Hn54dcFAqvq7zcpZnOz',
};

export default function HomeScreen() {
    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState<News[]>([]);
    const [newBooks, setNewBooks] = useState<Book[]>([]);
    const [coachingPrograms, setCoachingPrograms] = useState<CoachingProgram[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [newsRes, booksRes, coachingRes] = await Promise.all([
                newsService.getNews(),
                booksService.getBooks({ page: 1 }),
                coachingService.getPrograms()
            ]);

            if (newsRes.success) setNews(newsRes.data);
            if (booksRes.success) setNewBooks(booksRes.data.slice(0, 5));
            if (coachingRes.success) setCoachingPrograms(coachingRes.data.slice(0, 5));
        } catch (error) {
            console.error('Erreur chargement home:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderEvents = () => {
        if (news.length === 0) return null;
        const featuredNews = news[0];

        return (
            <TouchableOpacity
                style={styles.eventCard}
                onPress={() => navigation.navigate('NewsDetail', { newsId: featuredNews.id })}
                activeOpacity={0.9}
            >
                <ImageBackground
                    source={{ uri: featuredNews.image_url }}
                    style={styles.eventImage}
                    imageStyle={{ borderRadius: 16 }}
                >
                    <View style={styles.eventOverlay}>
                        <View style={styles.eventBadge}>
                            <Text style={styles.eventBadgeText}>À LA UNE</Text>
                        </View>
                        <Text style={styles.eventTitle}>{featuredNews.title}</Text>
                        <Text style={styles.eventDescription} numberOfLines={2}>
                            {featuredNews.excerpt}
                        </Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#f2d00d" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{ paddingBottom: 180 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Barre du haut */}
                <View style={styles.topBar}>
                    <View style={styles.userInfo}>
                        <Image source={{ uri: userData.avatarUrl }} style={styles.avatar} />
                        <View style={{ marginLeft: 12 }}>
                            <Text style={styles.welcomeText}>BON RETOUR</Text>
                            <Text style={styles.userName}>Bonjour, {userData.name}</Text>
                        </View>
                    </View>
                    <View style={styles.iconRow}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Search')}>
                            <MaterialIcons name="search" size={24} color="#f2d00d" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.iconButton, { marginLeft: 8 }]}
                            onPress={() => navigation.navigate('Notifications')}
                        >
                            <MaterialIcons name="notifications" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Événement en vedette (News) */}
                {renderEvents()}

                {/* Accès Rapide */}
                <View style={styles.quickAccessContainer}>
                    <TouchableOpacity
                        style={styles.quickAccessCard}
                        onPress={() => navigation.navigate('Librairie')}
                        activeOpacity={0.7}
                    >
                        <View style={styles.quickAccessIcon}>
                            <MaterialIcons name="store" size={24} color="#221f10" />
                        </View>
                        <View style={{ marginLeft: 12 }}>
                            <Text style={styles.quickAccessTitle}>Librairie</Text>
                            <Text style={styles.quickAccessSubtitle}>{newBooks.length} Nouveautés</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.quickAccessCard, { marginLeft: 12 }]}
                        onPress={() => navigation.navigate('Ma Biblio')}
                        activeOpacity={0.7}
                    >
                        <View style={styles.quickAccessIcon}>
                            <MaterialIcons name="headphones" size={24} color="#f2d00d" />
                        </View>
                        <View style={{ marginLeft: 12 }}>
                            <Text style={styles.quickAccessTitle}>Livres Audio</Text>
                            <Text style={styles.quickAccessSubtitle}>Ma collection</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* En-tête Sessions de Coaching */}
                {coachingPrograms.length > 0 && (
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionTitleWrapper}>
                            <Text style={styles.sectionTitle}>Sessions de Coaching</Text>
                            <View style={styles.sectionUnderline} />
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('Librairie')}>
                            <Text style={styles.seeAllText}>Tout voir</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Liste Sessions de Coaching */}
                <View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
                    >
                        {coachingPrograms.map((program, index) => (
                            <TouchableOpacity
                                key={program.id}
                                style={[styles.coachingCard, index > 0 && { marginLeft: 16 }]}
                                onPress={() => navigation.navigate('CoachingDetail', { programId: program.id })}
                                activeOpacity={0.8}
                            >
                                <View style={styles.coachingImageWrapper}>
                                    <Image source={{ uri: program.cover_image_url }} style={styles.coachingImage} />
                                    <View style={styles.playButton}>
                                        <MaterialIcons name="play-arrow" size={24} color="white" />
                                    </View>
                                </View>
                                <View style={styles.coachingInfo}>
                                    <Text style={styles.coachingCategory}>{program.category?.name || 'Coaching'}</Text>
                                    <Text style={styles.coachingTitle} numberOfLines={2}>{program.title}</Text>
                                    <View style={styles.progressBarBg}>
                                        <View style={[styles.progressBarFill, { width: '0%' }]} />
                                    </View>
                                    <Text style={styles.progressText}>0% complété</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* En-tête Nouveaux livres (ex-podcasts) */}
                {newBooks.length > 0 && (
                    <View style={[styles.sectionHeader, { marginTop: 32 }]}>
                        <View style={styles.sectionTitleWrapper}>
                            <Text style={styles.sectionTitle}>Derniers Ajouts</Text>
                            <View style={styles.sectionUnderline} />
                        </View>
                    </View>
                )}

                {/* Liste Nouveaux Livres */}
                <View>
                    {newBooks.map((book) => (
                        <TouchableOpacity
                            key={book.id}
                            style={styles.podcastItem}
                            onPress={() => navigation.navigate('BookDetail', { bookId: book.id })}
                        >
                            <Image source={{ uri: book.cover_image_url }} style={styles.podcastImage} />
                            <View style={styles.podcastInfo}>
                                <Text style={styles.podcastTitle}>{book.title}</Text>
                                <Text style={styles.podcastSubtitle}>{book.author}</Text>
                                <View style={styles.podcastMeta}>
                                    <MaterialIcons name="access-time" size={14} color="gray" />
                                    <Text style={styles.podcastDuration}>{book.duration || 'N/A'}</Text>
                                    <View style={styles.bulletPoint} />
                                    <Text style={styles.podcastEpisode}>{book.type === 'audiobook' ? 'Audio' : 'Ebook'}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.actionButton}>
                                <MaterialIcons name="file-download" size={24} color="rgba(255,255,255,0.6)" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Mini Player */}
            <TouchableOpacity
                style={styles.miniPlayer}
                onPress={() => navigation.navigate('Player')}
                activeOpacity={0.9}
            >
                <View style={styles.progressBarAbsolute}>
                    <View style={{ width: '30%', height: '100%', backgroundColor: '#f2d00d' }} />
                </View>
                <Image source={{ uri: nowPlaying.imageUrl }} style={styles.miniPlayerImage} />
                <View style={styles.miniPlayerInfo}>
                    <Text style={styles.miniPlayerTitle}>{nowPlaying.title}</Text>
                    <Text style={styles.miniPlayerArtist}>{nowPlaying.artist}</Text>
                </View>
                <View style={styles.miniPlayerControls}>
                    <TouchableOpacity>
                        <MaterialIcons name="play-arrow" size={32} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 16 }}>
                        <MaterialIcons name="skip-next" size={32} color="white" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#221f10',
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 48,
        paddingBottom: 16,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#f2d00d',
    },
    welcomeText: {
        color: '#f2d00d',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    userName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconRow: {
        flexDirection: 'row',
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    eventCard: {
        marginHorizontal: 16,
        height: 200,
        borderRadius: 16,
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    eventImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    eventOverlay: {
        padding: 16,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    eventBadge: {
        backgroundColor: '#f2d00d',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    eventBadgeText: {
        color: 'black',
        fontSize: 10,
        fontWeight: 'bold',
    },
    eventTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    eventDescription: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
    },
    quickAccessContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginTop: 24,
    },
    quickAccessCard: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    quickAccessIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#f2d00d',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quickAccessTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    quickAccessSubtitle: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 10,
        marginTop: 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    sectionTitleWrapper: {
        position: 'relative',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    sectionUnderline: {
        position: 'absolute',
        bottom: -4,
        left: 0,
        width: 24,
        height: 3,
        backgroundColor: '#f2d00d',
        borderRadius: 2,
    },
    seeAllText: {
        color: '#f2d00d',
        fontSize: 12,
        fontWeight: 'bold',
    },
    coachingCard: {
        width: 240,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    coachingImageWrapper: {
        height: 140,
        position: 'relative',
    },
    coachingImage: {
        width: '100%',
        height: '100%',
    },
    playButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -24 }, { translateY: -24 }],
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    coachingInfo: {
        padding: 16,
    },
    coachingCategory: {
        color: '#f2d00d',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginBottom: 4,
    },
    coachingTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        height: 40,
    },
    progressBarBg: {
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 2,
        marginBottom: 8,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#f2d00d',
        borderRadius: 2,
    },
    progressText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 10,
        textAlign: 'right',
    },
    podcastItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.03)',
    },
    podcastImage: {
        width: 64,
        height: 64,
        borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    podcastInfo: {
        flex: 1,
        marginLeft: 16,
    },
    podcastTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    podcastSubtitle: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 13,
        marginTop: 2,
    },
    podcastMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    podcastDuration: {
        color: 'gray',
        fontSize: 12,
        marginLeft: 4,
    },
    bulletPoint: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: 'gray',
        marginHorizontal: 8,
    },
    podcastEpisode: {
        color: 'gray',
        fontSize: 12,
    },
    actionButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    miniPlayer: {
        position: 'absolute',
        bottom: 115,
        left: 16,
        right: 16,
        backgroundColor: '#322f1c',
        borderRadius: 12,
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
        borderWidth: 1,
        borderColor: 'rgba(242, 208, 13, 0.2)',
        overflow: 'hidden',
    },
    progressBarAbsolute: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    miniPlayerImage: {
        width: 40,
        height: 40,
        borderRadius: 6,
    },
    miniPlayerInfo: {
        flex: 1,
        marginLeft: 12,
    },
    miniPlayerTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    miniPlayerArtist: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 12,
    },
    miniPlayerControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
