import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type TabType = 'audiobook' | 'ebook' | 'coaching';

const libraryItems = {
    audiobooks: [
        {
            id: '1',
            title: 'Le Chemin de la Grâce',
            author: 'Pasteur Francis',
            totalDuration: '2h 45m',
            progress: 65,
            type: 'audiobook',
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk_P96jDVIlRGcwtDeWuAOwJYUlNH5eP85VmkDZov9NnDTzvtwBRFXQmG8KeR0mClBTAWUfwczdA1W4rrfs_or3v9W2n-IiSuJx6nPQg95hioWEB88fl_yRU97BJcsWFJzc4m65MA4ctYs-6BqT-0l19OLx2mNlmbOA2bnreEo5wqNMgEwZXZ6Va_8wIb3Bes3knDAjwe-OwgMl_-W0W4jniFlJR7GHTPlzD44Viys6aYOkjMfBqMpgar9SJyZcTUe0MAptwpC2ujF',
        },
        {
            id: '2',
            title: 'La Paix Intérieure',
            author: 'Pasteur Francis',
            totalDuration: '1h 30m',
            progress: 32,
            type: 'audiobook',
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfKNyvZxVCceSH1_w0YHwYqXg13l_xgpIut6zqnKmwsz_N7TVjJiGun-nIeH4scRV7F8eCIMOMW5WwUjnhA9suDx3LlntsNqmYOjZvuJugt_Z_TBwl2GHUaEpMv81z3xZt_t-oFBh6OBuzjCCh7MaFK_nNo7BI2kuuzZQB9748XW3vXImy4bYoGH0Eqb0z55OlPV9M1I-1Oa6gbiwrI_FPLG2tMHYbdWGT-AsE5NO9CWd1yZF9_UmhnGiO3Pp2tCwKt93SZsF63wtx',
        },
        {
            id: '3',
            title: 'Dévotion Quotidienne Vol. 1',
            author: 'Pasteur Francis',
            totalDuration: '3h 15m',
            progress: 100,
            type: 'audiobook',
            isCompleted: true,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPZ1urFQMpFgEXXE2GB2TMW5KaPzBTQ3B_YVmP7xEtngDx9_1K_ahD0js5_SsA-1ETkkjoK8fuW_1xVp1c2Si156yhIHSKxjYU4Qj9SEJkSpLkD3egaPtSD290RUZ6jGMcmzumqd9Ab308TUQYex-dKALuzweKhmBNURjEQtG985tQawMGHX8AAPLRipGY51sJAA3295BGj5IalVpUJ6CMMmQL3XK-uL_qr1pP3rH9dJYD5Rr1LDosjP945VEVG6WruGyUhW8yAj7w',
        },
    ],
    ebooks: [
        {
            id: '4',
            title: 'Marcher dans la Foi',
            author: 'Pasteur Francis',
            type: 'ebook',
            size: '2.4 Mo',
            progress: 45,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC65_rrcQgI7Gg6AFnG2ElqYdwOVh0f5oNsF1AJN41YiG0mqXmO8VPWwV5uz1IUuqHXItOiFyfNFuZW1N8k6IWXSIhvRYKANNpVjeYTOJl5WkHmIdOg1WoJrs59x1CncjT-UQMC5iH89RupyrYRiCKDvxSp6xOh9myp82edUdn1peA-QDdCTTUmUxURjoniO_5G3y9pxL-w2qyRQ-tUMkGeYJNNaRpEjNVrPeHl57Y3WBr_BNPXkJJIcWZbiPoqdOB3oGgUW5p9OcEe',
        },
        {
            id: '5',
            title: 'Une Vie avec un But',
            author: 'Pasteur Francis',
            type: 'ebook',
            size: '1.8 Mo',
            progress: 0,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1tJ-Wy2qhlI6vWxTjRzQ0xYlg_FA2Vn3yiwysyEQ3DxDxXtcdf-fTX834BtDztrY4t7pknZGRwWuvbNM4sMBz_HXzecOgVXnDMeS0pmV8wboZ77cBFraZ6T5xM6UnZHXYz7S0N6ecn7RXYFepxGlhurfJLrXd1kAUXiy4XRkj94MqsYoL7zTmOQXgqngYz60j8hIdzuwFVIs9UFUmgmRBn2qh6vJ1IoFHSlZHRdKatQFc9jft_gQ-jHhYczS2ijBGCt6ulpXMZAvI',
        },
    ],
    coaching: [
        {
            id: '6',
            title: 'Maîtrise Mentale',
            subtitle: 'Gérer l\'Incertitude',
            author: 'Pasteur Francis',
            type: 'coaching',
            progress: 65,
            totalLessons: 12,
            completedLessons: 8,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhSOu10N9ERlhJYg2HQKt_D8a0fMnP9bFVBJV7TtAviK99OGvZAQcYIP0cZVR-7HrN_Ju0wvN0cmISOOV0w_d-TqdqZWuaR3mpxZGDrm5aRFJT6QEtjhHFB0w4u8Rv_EajIb3mSscBKDdtSxvlfFfpkcOnyRvTQ5Aul8wbSQFAzMiv-ARedBTOINs6a47NE3aoIoeVAuxELXz-SGjN-OaXHO2ZtZxh_ZQy2uivotWDF5ZikVCHjnB_yOIwI39jYxeOxouJbcUnyIhL',
        },
        {
            id: '7',
            title: 'Leadership',
            subtitle: 'Diriger avec Compassion',
            author: 'Pasteur Francis',
            type: 'coaching',
            progress: 0,
            totalLessons: 10,
            completedLessons: 0,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDejsiP8_uNtv-Rn_EcpGuLEMi37W1xYMaryYHyVZ4LHMNzP1Z-9DgO9_46ywD_EiRoNYzzo3BgwWZ4br9BGMx2D9E_SnKeukIQaTA__QTp5H2EUJxbyY1M_d8MIReqvDJlMawxtAE_Cv4k0wuKguMaDyzxwqNSNoFMHmX8Z4o5B4gq2urHVHAjHh_dVFMBml9SS0qOp9Ek52cXypEBgkBqpetVQ6Mi7cj6ZzUO-eOkuFvKkmcDckhIrYsqIy1F8jvvx5YhlK_0HWl_',
        },
    ],
};

export default function LibraryScreen() {
    const navigation = useNavigation<any>();
    const [activeTab, setActiveTab] = useState<TabType>('audiobook');

    // Récupération des items selon l'onglet actif
    const getCurrentItems = () => {
        switch (activeTab) {
            case 'audiobook':
                return libraryItems.audiobooks;
            case 'ebook':
                return libraryItems.ebooks;
            case 'coaching':
                return libraryItems.coaching;
            default:
                return [];
        }
    };

    const currentItems = getCurrentItems();
    const inProgress = currentItems.filter((item: any) => item.progress > 0 && item.progress < 100);
    const notStarted = currentItems.filter((item: any) => item.progress === 0);
    const completed = currentItems.filter((item: any) => item.progress === 100);

    return (
        <View style={styles.container}>
            {/* En-tête */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="rgba(255,255,255,0.6)" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ma Bibliothèque</Text>
                <TouchableOpacity style={styles.iconButton}>
                    <MaterialIcons name="search" size={24} color="rgba(255,255,255,0.6)" />
                </TouchableOpacity>
            </View>

            {/* Onglets fonctionnels */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'audiobook' && styles.tabActive]}
                    onPress={() => setActiveTab('audiobook')}
                >
                    <Text style={activeTab === 'audiobook' ? styles.tabTextActive : styles.tabText}>
                        Livres Audio
                    </Text>
                    <View style={styles.tabBadge}>
                        <Text style={styles.tabBadgeText}>{libraryItems.audiobooks.length}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'ebook' && styles.tabActive]}
                    onPress={() => setActiveTab('ebook')}
                >
                    <Text style={activeTab === 'ebook' ? styles.tabTextActive : styles.tabText}>
                        E-books
                    </Text>
                    <View style={styles.tabBadge}>
                        <Text style={styles.tabBadgeText}>{libraryItems.ebooks.length}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'coaching' && styles.tabActive]}
                    onPress={() => setActiveTab('coaching')}
                >
                    <Text style={activeTab === 'coaching' ? styles.tabTextActive : styles.tabText}>
                        Coaching
                    </Text>
                    <View style={styles.tabBadge}>
                        <Text style={styles.tabBadgeText}>{libraryItems.coaching.length}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                {/* En cours */}
                {inProgress.length > 0 && (
                    <>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionLabel}>EN COURS</Text>
                        </View>
                        <View style={styles.itemsList}>
                            {inProgress.map((item: any) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.itemCard}
                                    onPress={() => activeTab === 'coaching'
                                        ? navigation.navigate('CoachingDetail')
                                        : navigation.navigate('Player')
                                    }
                                    activeOpacity={0.7}
                                >
                                    <Image
                                        source={{ uri: item.imageUrl }}
                                        style={activeTab === 'ebook' ? styles.ebookImage : styles.itemImage}
                                    />
                                    <View style={styles.itemInfo}>
                                        <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                                        {item.subtitle && (
                                            <Text style={styles.itemSubtitleText}>{item.subtitle}</Text>
                                        )}
                                        <Text style={styles.itemSubtitle}>
                                            {item.author} {item.totalDuration ? `• ${item.totalDuration}` : ''}
                                            {item.totalLessons ? `• ${item.completedLessons}/${item.totalLessons} leçons` : ''}
                                        </Text>
                                        <View style={styles.progressContainer}>
                                            <View style={styles.progressBar}>
                                                <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
                                            </View>
                                            <Text style={styles.progressText}>{item.progress}%</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={styles.playButtonSmall}>
                                        <MaterialIcons name="play-arrow" size={20} color="black" />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                )}

                {/* Non commencé */}
                {notStarted.length > 0 && (
                    <>
                        <View style={[styles.sectionHeader, styles.sectionHeaderBordered]}>
                            <Text style={styles.sectionLabel}>NON COMMENCÉ</Text>
                        </View>
                        <View style={styles.itemsList}>
                            {notStarted.map((item: any) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.itemCard}
                                    onPress={() => activeTab === 'coaching'
                                        ? navigation.navigate('CoachingDetail')
                                        : navigation.navigate('Player')
                                    }
                                    activeOpacity={0.7}
                                >
                                    <Image
                                        source={{ uri: item.imageUrl }}
                                        style={activeTab === 'ebook' ? styles.ebookImage : styles.itemImage}
                                    />
                                    <View style={styles.itemInfo}>
                                        <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                                        {item.subtitle && (
                                            <Text style={styles.itemSubtitleText}>{item.subtitle}</Text>
                                        )}
                                        <Text style={styles.itemSubtitle}>
                                            {item.author}
                                            {item.size ? ` • ${item.size}` : ''}
                                            {item.totalLessons ? ` • ${item.totalLessons} leçons` : ''}
                                        </Text>
                                        <View style={styles.newTag}>
                                            <Text style={styles.newTagText}>NOUVEAU</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={styles.playButtonSmall}>
                                        <MaterialIcons
                                            name={activeTab === 'ebook' ? 'menu-book' : 'play-arrow'}
                                            size={20}
                                            color="black"
                                        />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                )}

                {/* Terminé */}
                {completed.length > 0 && (
                    <>
                        <View style={[styles.sectionHeader, styles.sectionHeaderBordered]}>
                            <Text style={styles.sectionLabel}>TERMINÉ</Text>
                        </View>
                        <View style={styles.itemsList}>
                            {completed.map((item: any) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.itemCard}
                                    activeOpacity={0.7}
                                >
                                    <Image
                                        source={{ uri: item.imageUrl }}
                                        style={[styles.itemImage, styles.imageCompleted]}
                                    />
                                    <View style={styles.itemInfo}>
                                        <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                                        <Text style={styles.itemSubtitle}>{item.author}</Text>
                                        <View style={styles.completedRow}>
                                            <MaterialIcons name="check-circle" size={16} color="#f2d00d" />
                                            <Text style={styles.completedText}>TERMINÉ</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity>
                                        <MaterialIcons name="more-vert" size={24} color="rgba(255,255,255,0.5)" />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                )}

                {/* Message vide */}
                {currentItems.length === 0 && (
                    <View style={styles.emptyState}>
                        <MaterialIcons name="library-books" size={64} color="rgba(255,255,255,0.2)" />
                        <Text style={styles.emptyTitle}>Aucun contenu</Text>
                        <Text style={styles.emptyText}>
                            Explorez la librairie pour ajouter du contenu à votre bibliothèque.
                        </Text>
                    </View>
                )}

                {/* CTA Pied de page */}
                <View style={styles.footerSection}>
                    <Text style={styles.footerText}>Vous cherchez quelque chose de nouveau ?</Text>
                    <TouchableOpacity
                        style={styles.browseButton}
                        onPress={() => navigation.navigate('Librairie')}
                    >
                        <Text style={styles.browseButtonText}>PARCOURIR LA LIBRAIRIE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#221f10',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 48,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    iconButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    tabsContainer: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabActive: {
        borderBottomColor: '#f2d00d',
    },
    tabText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'rgba(255,255,255,0.5)',
    },
    tabTextActive: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#f2d00d',
    },
    tabBadge: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        marginLeft: 6,
    },
    tabBadgeText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 11,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    sectionHeader: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    sectionHeaderBordered: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        marginTop: 8,
        paddingTop: 24,
    },
    sectionLabel: {
        fontSize: 12,
        letterSpacing: 1,
        fontWeight: 'bold',
        color: 'rgba(255,255,255,0.5)',
    },
    itemsList: {},
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    itemImage: {
        width: 64,
        height: 64,
        borderRadius: 8,
    },
    ebookImage: {
        width: 56,
        height: 80,
        borderRadius: 8,
    },
    imageCompleted: {
        opacity: 0.6,
    },
    itemInfo: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 16,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    itemSubtitleText: {
        fontSize: 13,
        color: '#f2d00d',
        marginTop: 2,
    },
    itemSubtitle: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 13,
        marginTop: 2,
        marginBottom: 8,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressBar: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.1)',
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#f2d00d',
    },
    progressText: {
        color: '#f2d00d',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 12,
        width: 36,
        textAlign: 'right',
    },
    playButtonSmall: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f2d00d',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
    },
    newTag: {
        backgroundColor: 'rgba(242, 208, 13, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    newTagText: {
        color: '#f2d00d',
        fontSize: 10,
        fontWeight: 'bold',
    },
    completedRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    completedText: {
        color: '#f2d00d',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 64,
        paddingHorizontal: 32,
    },
    emptyTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
    emptyText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
    },
    footerSection: {
        marginTop: 32,
        paddingHorizontal: 16,
        alignItems: 'center',
        marginBottom: 32,
    },
    footerText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 14,
        marginBottom: 16,
        textAlign: 'center',
    },
    browseButton: {
        backgroundColor: '#f2d00d',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 25,
    },
    browseButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 14,
        letterSpacing: 1,
    },
});
