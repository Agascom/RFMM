import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    StyleSheet,
    Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Données mock
const userData = {
    name: 'Daniel',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIAWhjEs9kf5ijzyZiuwXASXSFOwjxLkFIWWyRq44JP5TewkzTyv6_8MVudSGlRrpkQpZSMY-wNpWr5URxnA8y9hBUpuVph4nyf1iwI5Ky5nLOyg2Pt2VG7IvosgJqGqlvfRTMjYfvt6gFBTlK6o_wMvi1eldqwVBWRtRfo1n9aNh1yCMdmO4N3odRoJJj0OwCc6rAMx_XmB8RewRlnlrXu07iOqDbF4fSF9hMc8_qoVw9zlKFOBmzrUUdQPoeOu1j2nOXnTbrJutk',
};

const featuredEvent = {
    title: 'Sommet Annuel de la Sagesse 2024',
    description: 'Rejoignez Pasteur Francis ce dimanche pour une expérience transformatrice.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB36N9ekSw9Ze_FxQ9_GI78hQ4OaRfKVZ53zKnKsglZKNsGo1pS0C1g-rliqbTiTIudSyDFUje0_B-ugf-zXpuKiTJ_lWvcdZBdWCprGtpQdBPmnC0RaPwsWudCrpjbYujb0Ol-KM-mBk4p-qIYqZLogNCIvbVhg8XcQl7XTTTYTqpV93FM0pGkLq-opuDf-MOENAS3WJMudgcWnJa1n0Au5Zk7MP7ZvRnh3bHqq4eHmMdC-mgd0mSPLLuMeYTP_Kd3Z_4wlIVoR8gb',
};

const podcasts = [
    {
        id: '1',
        title: 'Le Chemin de la Grâce',
        episodeNumber: 42,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk_P96jDVIlRGcwtDeWuAOwJYUlNH5eP85VmkDZov9NnDTzvtwBRFXQmG8KeR0mClBTAWUfwczdA1W4rrfs_or3v9W2n-IiSuJx6nPQg95hioWEB88fl_yRU97BJcsWFJzc4m65MA4ctYs-6BqT-0l19OLx2mNlmbOA2bnreEo5wqNMgEwZXZ6Va_8wIb3Bes3knDAjwe-OwgMl_-W0W4jniFlJR7GHTPlzD44Viys6aYOkjMfBqMpgar9SJyZcTUe0MAptwpC2ujF',
    },
    {
        id: '2',
        title: 'La Paix Intérieure',
        episodeNumber: 15,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfKNyvZxVCceSH1_w0YHwYqXg13l_xgpIut6zqnKmwsz_N7TVjJiGun-nIeH4scRV7F8eCIMOMW5WwUjnhA9suDx3LlntsNqmYOjZvuJugt_Z_TBwl2GHUaEpMv81z3xZt_t-oFBh6OBuzjCCh7MaFK_nNo7BI2kuuzZQB9748XW3vXImy4bYoGH0Eqb0z55OlPV9M1I-1Oa6gbiwrI_FPLG2tMHYbdWGT-AsE5NO9CWd1yZF9_UmhnGiO3Pp2tCwKt93SZsF63wtx',
    },
    {
        id: '3',
        title: 'Dévotion Quotidienne',
        episodeNumber: 102,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPZ1urFQMpFgEXXE2GB2TMW5KaPzBTQ3B_YVmP7xEtngDx9_1K_ahD0js5_SsA-1ETkkjoK8fuW_1xVp1c2Si156yhIHSKxjYU4Qj9SEJkSpLkD3egaPtSD290RUZ6jGMcmzumqd9Ab308TUQYex-dKALuzweKhmBNURjEQtG985tQawMGHX8AAPLRipGY51sJAA3295BGj5IalVpUJ6CMMmQL3XK-uL_qr1pP3rH9dJYD5Rr1LDosjP945VEVG6WruGyUhW8yAj7w',
    },
];

const coachingSessions = [
    {
        id: '1',
        category: 'Maîtrise Mentale',
        title: 'Gérer l\'Incertitude',
        progress: 65,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhSOu10N9ERlhJYg2HQKt_D8a0fMnP9bFVBJV7TtAviK99OGvZAQcYIP0cZVR-7HrN_Ju0wvN0cmISOOV0w_d-TqdqZWuaR3mpxZGDrm5aRFJT6QEtjhHFB0w4u8Rv_EajIb3mSscBKDdtSxvlfFfpkcOnyRvTQ5Aul8wbSQFAzMiv-ARedBTOINs6a47NE3aoIoeVAuxELXz-SGjN-OaXHO2ZtZxh_ZQy2uivotWDF5ZikVCHjnB_yOIwI39jYxeOxouJbcUnyIhL',
    },
    {
        id: '2',
        category: 'Leadership',
        title: 'Diriger avec Compassion',
        progress: 0,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDejsiP8_uNtv-Rn_EcpGuLEMi37W1xYMaryYHyVZ4LHMNzP1Z-9DgO9_46ywD_EiRoNYzzo3BgwWZ4br9BGMx2D9E_SnKeukIQaTA__QTp5H2EUJxbyY1M_d8MIReqvDJlMawxtAE_Cv4k0wuKguMaDyzxwqNSNoFMHmX8Z4o5B4gq2urHVHAjHh_dVFMBml9SS0qOp9Ek52cXypEBgkBqpetVQ6Mi7cj6ZzUO-eOkuFvKkmcDckhIrYsqIy1F8jvvx5YhlK_0HWl_',
    },
];

const nowPlaying = {
    title: 'Le Chemin de la Grâce',
    artist: 'Pasteur Francis',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbHJ8iV-1Wh6fiSwBv8XjZhR4M6-awEHFQrNoqMFlKAOCk8UIyoCkJ6SOf_xera_-9OLu-SSHsP2Kg08MKN1KXuOym-UXswDWX9kPUnM93y6vrxP1sXtTMC39S2Q4eMGwGBXQ44YCmLv6BwQ0_7K9h-PdnESUBCKnq8DXMFzYpuK09E6L3uMgTYwpmxAr74Hd4N-dyNGzbCShMuwxfrlipq13qBCvQt4FV7JcMaNhDw3Xzua2z2GkLyXOk1Hn54dcFAqvq7zcpZnOz',
};

export default function HomeScreen() {
    const navigation = useNavigation<any>();

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
                        <TouchableOpacity style={styles.iconButton}>
                            <MaterialIcons name="search" size={24} color="#f2d00d" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.iconButton, { marginLeft: 8 }]}>
                            <MaterialIcons name="notifications" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Événement en vedette */}
                <View style={styles.heroSection}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('NewsDetail')}
                        style={styles.heroCard}
                    >
                        <ImageBackground
                            source={{ uri: featuredEvent.imageUrl }}
                            style={styles.heroImage}
                            imageStyle={{ borderRadius: 16 }}
                        >
                            <View style={styles.heroOverlay} />
                            <View style={styles.heroContent}>
                                <View style={styles.liveTag}>
                                    <Text style={styles.liveTagText}>EN DIRECT</Text>
                                </View>
                                <Text style={styles.heroTitle}>{featuredEvent.title}</Text>
                                <Text style={styles.heroDescription}>{featuredEvent.description}</Text>
                                <TouchableOpacity style={styles.registerButton}>
                                    <Text style={styles.registerButtonText}>S'inscrire</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>

                {/* En-tête Podcasts */}
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleWrapper}>
                        <Text style={styles.sectionTitle}>Podcasts à la Une</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>VOIR TOUT</Text>
                    </TouchableOpacity>
                </View>

                {/* Carrousel Podcasts */}
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={podcasts}
                    contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.podcastCard}
                            onPress={() => navigation.navigate('Player')}
                            activeOpacity={0.8}
                        >
                            <View style={styles.podcastImageWrapper}>
                                <Image source={{ uri: item.imageUrl }} style={styles.podcastImage} />
                                <View style={styles.playButton}>
                                    <MaterialIcons name="play-arrow" size={24} color="black" />
                                </View>
                            </View>
                            <View style={{ marginTop: 12 }}>
                                <Text style={styles.podcastTitle} numberOfLines={1}>{item.title}</Text>
                                <Text style={styles.podcastEpisode}>ÉPISODE {item.episodeNumber}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />

                {/* Grille d'accès rapide */}
                <View style={styles.quickAccessContainer}>
                    <TouchableOpacity
                        style={styles.quickAccessCard}
                        onPress={() => navigation.navigate('Librairie')}
                        activeOpacity={0.7}
                    >
                        <View style={styles.quickAccessIcon}>
                            <MaterialIcons name="auto-stories" size={24} color="#f2d00d" />
                        </View>
                        <View style={{ marginLeft: 12 }}>
                            <Text style={styles.quickAccessTitle}>E-Books</Text>
                            <Text style={styles.quickAccessSubtitle}>12 Nouveautés</Text>
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
                            <Text style={styles.quickAccessSubtitle}>6 Pistes</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* En-tête Sessions de Coaching */}
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleWrapper}>
                        <Text style={styles.sectionTitle}>Sessions de Coaching</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>VOIR PARCOURS</Text>
                    </TouchableOpacity>
                </View>

                {/* Liste des Sessions */}
                <View style={styles.coachingContainer}>
                    {coachingSessions.map((session, index) => (
                        <TouchableOpacity
                            key={session.id}
                            style={[styles.coachingCard, index > 0 && { marginTop: 16 }]}
                            activeOpacity={0.7}
                        >
                            <Image source={{ uri: session.imageUrl }} style={styles.coachingImage} />
                            <View style={styles.coachingInfo}>
                                <Text style={styles.coachingCategory}>{session.category.toUpperCase()}</Text>
                                <Text style={styles.coachingTitle}>{session.title}</Text>
                                <View style={styles.progressContainer}>
                                    <View style={styles.progressBar}>
                                        <View style={[styles.progressFill, { width: `${session.progress}%` }]} />
                                    </View>
                                    <Text style={styles.progressText}>
                                        {session.progress > 0 ? `${session.progress}%` : 'Nouveau'}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Mini Lecteur */}
            <TouchableOpacity
                style={styles.miniPlayer}
                onPress={() => navigation.navigate('Player')}
                activeOpacity={0.9}
            >
                <Image source={{ uri: nowPlaying.imageUrl }} style={styles.miniPlayerImage} />
                <View style={styles.miniPlayerInfo}>
                    <Text style={styles.miniPlayerTitle}>{nowPlaying.title}</Text>
                    <Text style={styles.miniPlayerArtist}>{nowPlaying.artist}</Text>
                </View>
                <View style={styles.miniPlayerControls}>
                    <TouchableOpacity>
                        <MaterialIcons name="pause" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 8 }}>
                        <MaterialIcons name="close" size={24} color="white" />
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
    scrollView: {
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 48,
        paddingBottom: 16,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'rgba(242, 208, 13, 0.3)',
    },
    welcomeText: {
        fontSize: 10,
        letterSpacing: 2,
        color: '#f2d00d',
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    iconRow: {
        flexDirection: 'row',
    },
    iconButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    heroSection: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    heroCard: {
        width: '100%',
        aspectRatio: 16 / 10,
        borderRadius: 16,
        overflow: 'hidden',
    },
    heroImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 16,
    },
    heroContent: {
        padding: 24,
    },
    liveTag: {
        backgroundColor: '#f2d00d',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    liveTagText: {
        color: 'black',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: -0.5,
    },
    heroTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: 'white',
        marginBottom: 4,
    },
    heroDescription: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        marginBottom: 12,
        maxWidth: '80%',
    },
    registerButton: {
        backgroundColor: '#f2d00d',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        alignSelf: 'flex-start',
    },
    registerButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 14,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 24,
    },
    sectionTitleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderLeftWidth: 4,
        borderLeftColor: '#f2d00d',
        paddingLeft: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    seeAllText: {
        color: '#f2d00d',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    podcastCard: {
        width: 160,
    },
    podcastImageWrapper: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    podcastImage: {
        width: '100%',
        height: '100%',
    },
    playButton: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        width: 40,
        height: 40,
        backgroundColor: 'rgba(242, 208, 13, 0.9)',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    podcastTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    podcastEpisode: {
        color: 'rgba(242, 208, 13, 0.7)',
        fontSize: 11,
        fontWeight: '500',
        marginTop: 2,
    },
    quickAccessContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        flexDirection: 'row',
    },
    quickAccessCard: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    quickAccessIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(242, 208, 13, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quickAccessTitle: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    quickAccessSubtitle: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 10,
        marginTop: 2,
    },
    coachingContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    coachingCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    coachingImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    coachingInfo: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 16,
    },
    coachingCategory: {
        fontSize: 10,
        color: '#f2d00d',
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    coachingTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 4,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    progressBar: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        height: 4,
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        backgroundColor: '#f2d00d',
        height: '100%',
    },
    progressText: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.5)',
        marginLeft: 8,
    },
    miniPlayer: {
        position: 'absolute',
        bottom: 115,
        left: 16,
        right: 16,
        backgroundColor: '#322f1c',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(242, 208, 13, 0.2)',
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 10,
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
        fontSize: 12,
        fontWeight: 'bold',
    },
    miniPlayerArtist: {
        color: 'rgba(242, 208, 13, 0.6)',
        fontSize: 10,
        marginTop: 2,
    },
    miniPlayerControls: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
});
