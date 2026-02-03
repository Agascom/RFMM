import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { libraryService } from '../services/api';
import { Book, CoachingProgram } from '../types/api';

type TabType = 'audiobook' | 'ebook' | 'coaching';

type LibraryItem = (Book | CoachingProgram) & {
    progress?: number,
    // Propriétés mockées au cas où l'API ne les renvoie pas encore
    totalDuration?: string,
    completedLessons?: number,
    totalLessons?: number,
    isCompleted?: boolean
};

export default function LibraryScreen() {
    const navigation = useNavigation<any>();
    const [activeTab, setActiveTab] = useState<TabType>('audiobook');
    const [items, setItems] = useState<LibraryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLibrary();
    }, [activeTab]);

    const loadLibrary = async () => {
        try {
            setLoading(true);
            const response = await libraryService.getMyLibrary(activeTab);
            if (response.success) {
                // On cast pour l'instant car l'API user library n'est pas 100% typée dans notre frontend
                setItems(response.data as LibraryItem[]);
            }
        } catch (error) {
            console.error('Erreur chargement bibliothèque:', error);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    // Séparation en cours / terminé (mock car API ne filtre pas encore statut completed)
    const inProgress = items.filter(item => !item.isCompleted && (item.progress || 0) < 100);
    const completed = items.filter(item => item.isCompleted || (item.progress || 0) === 100);

    const getTabLabel = (tab: TabType) => {
        switch (tab) {
            case 'audiobook': return 'Livres Audio';
            case 'ebook': return 'E-books';
            case 'coaching': return 'Coaching';
        }
    };

    const handleItemPress = (item: LibraryItem) => {
        if (activeTab === 'coaching') {
            navigation.navigate('CoachingDetail', { programId: item.id });
        } else {
            // Pour livre/audiobook, soit on ouvre le player, soit le détail
            // Si c'est un audiobook en cours, on ouvre le player
            if (activeTab === 'audiobook') {
                navigation.navigate('Player', { bookId: item.id });
            } else {
                navigation.navigate('BookDetail', { bookId: item.id });
            }
        }
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
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Ma Bibliothèque</Text>
                    <Text style={styles.headerSubtitle}>{items.length} éléments</Text>
                </View>
                <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('Search')}>
                    <MaterialIcons name="search" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Onglets */}
            <View style={styles.tabsContainer}>
                {(['audiobook', 'ebook', 'coaching'] as TabType[]).map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.tabActive]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={activeTab === tab ? styles.tabTextActive : styles.tabText}>
                            {getTabLabel(tab)}
                        </Text>
                        {activeTab === tab && <View style={styles.activeIndicator} />}
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Section En Cours */}
                {inProgress.length > 0 && (
                    <View style={styles.section}>
                        <View style={[styles.sectionHeader, styles.sectionHeaderBordered]}>
                            <Text style={styles.sectionLabel}>EN COURS</Text>
                        </View>
                        <View style={styles.itemsList}>
                            {inProgress.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.itemCard}
                                    onPress={() => handleItemPress(item)}
                                    activeOpacity={0.7}
                                >
                                    <Image
                                        source={{ uri: item.cover_image_url }}
                                        style={styles.itemImage}
                                    />
                                    <View style={styles.itemInfo}>
                                        <Text style={styles.itemTitle} numberOfLines={1}>
                                            {item.title}
                                        </Text>
                                        <Text style={styles.itemSubtitle}>
                                            {(item as any).instructor || (item as any).author}
                                        </Text>

                                        <View style={styles.progressContainer}>
                                            <View style={styles.progressBarBg}>
                                                <View style={[styles.progressBarFill, { width: `${item.progress || 0}%` }]} />
                                            </View>
                                            <Text style={styles.progressText}>
                                                {item.progress || 0}%
                                                {activeTab === 'audiobook' && item.duration ? ` • ${item.duration} restants` : ''}
                                                {activeTab === 'coaching' && ` • ${(item as any).completedLessons || 0}/${(item as any).total_lessons} leçons`}
                                            </Text>
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
                    </View>
                )}

                {/* Section Terminé */}
                {completed.length > 0 && (
                    <View style={styles.section}>
                        <View style={[styles.sectionHeader, styles.sectionHeaderBordered]}>
                            <Text style={styles.sectionLabel}>TERMINÉ</Text>
                        </View>
                        <View style={styles.itemsList}>
                            {completed.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.itemCard}
                                    activeOpacity={0.7}
                                    onPress={() => handleItemPress(item)}
                                >
                                    <Image
                                        source={{ uri: item.cover_image_url }}
                                        style={[styles.itemImage, styles.imageCompleted]}
                                    />
                                    <View style={styles.itemInfo}>
                                        <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                                        <Text style={styles.itemSubtitle}>
                                            {(item as any).instructor || (item as any).author}
                                        </Text>
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
                    </View>
                )}

                {/* Message vide */}
                {items.length === 0 && !loading && (
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
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 48,
        paddingBottom: 16,
    },
    headerTitleContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.5)',
        marginTop: 2,
    },
    searchButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabsContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 16,
    },
    tab: {
        marginRight: 24,
        paddingVertical: 12,
        position: 'relative',
    },
    tabActive: {
        // Active state styling handled by indicator
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.5)',
    },
    tabTextActive: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#f2d00d',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: '#f2d00d',
        borderRadius: 1.5,
    },
    content: {
        flex: 1,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 8,
    },
    sectionHeaderBordered: {
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: 'rgba(255,255,255,0.4)',
    },
    itemsList: {
        paddingHorizontal: 16,
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    itemImage: {
        width: 60,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#2a2714',
    },
    imageCompleted: {
        opacity: 0.6,
    },
    itemInfo: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },
    itemSubtitle: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
        marginBottom: 8,
    },
    progressContainer: {
        width: '100%',
    },
    progressBarBg: {
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 2,
        marginBottom: 4,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#f2d00d',
        borderRadius: 2,
    },
    progressText: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.4)',
    },
    completedRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    completedText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#f2d00d',
        marginLeft: 4,
        letterSpacing: 0.5,
    },
    playButtonSmall: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f2d00d',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        marginTop: 32,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.5)',
        textAlign: 'center',
        lineHeight: 20,
    },
    footerSection: {
        padding: 24,
        alignItems: 'center',
        marginBottom: 32,
    },
    footerText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.6)',
        marginBottom: 16,
    },
    browseButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        backgroundColor: 'rgba(242, 208, 13, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(242, 208, 13, 0.3)',
    },
    browseButtonText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#f2d00d',
        letterSpacing: 1,
    },
});
