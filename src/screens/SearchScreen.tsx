import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { searchService } from '../services/api';
import { Book, CoachingProgram, News } from '../types/api';

const recentSearches = ['Pasteur Francis', 'La Grâce', 'Méditation', 'Coaching'];

const trendingTopics = [
    { id: '1', title: 'Foi et Persévérance', count: '2.5k recherches' },
    { id: '2', title: 'Prière Quotidienne', count: '1.8k recherches' },
    { id: '3', title: 'Guérison Spirituelle', count: '1.2k recherches' },
];

export default function SearchScreen() {
    const navigation = useNavigation<any>();
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<{
        books: Book[],
        coaching: CoachingProgram[],
        news: News[]
    } | null>(null);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery.length > 2) {
                performSearch();
            } else {
                setResults(null);
            }
        }, 600);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const performSearch = async () => {
        try {
            setLoading(true);
            const data = await searchService.search(searchQuery);
            setResults(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleResultPress = (item: any, type: 'book' | 'coaching' | 'news') => {
        if (type === 'book') navigation.navigate('BookDetail', { bookId: item.id });
        if (type === 'coaching') navigation.navigate('CoachingDetail', { programId: item.id });
        if (type === 'news') navigation.navigate('NewsDetail', { newsId: item.id });
    };

    const renderResults = () => {
        if (!results) return null;

        const hasResults = results.books.length > 0 || results.coaching.length > 0 || results.news.length > 0;

        if (!hasResults && !loading) {
            return (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>Aucun résultat trouvé pour "{searchQuery}"</Text>
                </View>
            );
        }

        return (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Résultats</Text>

                {/* Livres et Audiobooks */}
                {results.books.map((item) => (
                    <TouchableOpacity
                        key={`book-${item.id}`}
                        style={styles.suggestionCard}
                        onPress={() => handleResultPress(item, 'book')}
                    >
                        <Image source={{ uri: item.cover_image_url }} style={styles.suggestionImage} />
                        <View style={styles.suggestionInfo}>
                            <View style={styles.typeTag}>
                                <MaterialIcons
                                    name={item.type === 'audiobook' ? 'headset' : 'menu-book'}
                                    size={12}
                                    color="#f2d00d"
                                />
                                <Text style={styles.typeTagText}>
                                    {item.type === 'audiobook' ? 'AUDIO' : 'LIVRE'}
                                </Text>
                            </View>
                            <Text style={styles.suggestionTitle} numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.suggestionAuthor}>{item.author}</Text>
                        </View>
                    </TouchableOpacity>
                ))}

                {/* Coaching */}
                {results.coaching.map((item) => (
                    <TouchableOpacity
                        key={`coaching-${item.id}`}
                        style={styles.suggestionCard}
                        onPress={() => handleResultPress(item, 'coaching')}
                    >
                        <Image source={{ uri: item.cover_image_url }} style={styles.suggestionImage} />
                        <View style={styles.suggestionInfo}>
                            <View style={[styles.typeTag, { backgroundColor: 'rgba(50, 200, 255, 0.15)' }]}>
                                <MaterialIcons name="school" size={12} color="#32c8ff" />
                                <Text style={[styles.typeTagText, { color: '#32c8ff' }]}>COACHING</Text>
                            </View>
                            <Text style={styles.suggestionTitle} numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.suggestionAuthor}>Programme</Text>
                        </View>
                    </TouchableOpacity>
                ))}

                {/* News */}
                {results.news.map((item) => (
                    <TouchableOpacity
                        key={`news-${item.id}`}
                        style={styles.suggestionCard}
                        onPress={() => handleResultPress(item, 'news')}
                    >
                        <Image source={{ uri: item.image_url }} style={styles.suggestionImage} />
                        <View style={styles.suggestionInfo}>
                            <View style={[styles.typeTag, { backgroundColor: 'rgba(255, 100, 100, 0.15)' }]}>
                                <MaterialIcons name="article" size={12} color="#ff6464" />
                                <Text style={[styles.typeTagText, { color: '#ff6464' }]}>ACTUALITÉ</Text>
                            </View>
                            <Text style={styles.suggestionTitle} numberOfLines={1}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* En-tête avec recherche */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.searchInputWrapper}>
                    <MaterialIcons name="search" size={20} color="rgba(255,255,255,0.5)" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Rechercher..."
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <MaterialIcons name="close" size={20} color="rgba(255,255,255,0.5)" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {loading && (
                    <ActivityIndicator style={{ marginTop: 32 }} color="#f2d00d" />
                )}

                {!loading && results ? (
                    renderResults()
                ) : (
                    <>
                        {/* Recherches récentes */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Recherches Récentes (Simulées)</Text>
                                <TouchableOpacity>
                                    <Text style={styles.clearText}>Effacer</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.recentChips}>
                                {recentSearches.map((search) => (
                                    <TouchableOpacity
                                        key={search}
                                        style={styles.recentChip}
                                        onPress={() => setSearchQuery(search)}
                                    >
                                        <MaterialIcons name="history" size={16} color="rgba(255,255,255,0.5)" />
                                        <Text style={styles.recentChipText}>{search}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Tendances */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Tendances</Text>
                            <View style={styles.trendingList}>
                                {trendingTopics.map((topic, index) => (
                                    <TouchableOpacity
                                        key={topic.id}
                                        style={styles.trendingItem}
                                        onPress={() => setSearchQuery(topic.title)}
                                    >
                                        <View style={styles.trendingRank}>
                                            <Text style={styles.trendingRankText}>{index + 1}</Text>
                                        </View>
                                        <View style={styles.trendingInfo}>
                                            <Text style={styles.trendingTitle}>{topic.title}</Text>
                                            <Text style={styles.trendingCount}>{topic.count}</Text>
                                        </View>
                                        <MaterialIcons name="trending-up" size={20} color="#f2d00d" />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </>
                )}
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
        paddingHorizontal: 16,
        paddingTop: 48,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
        marginLeft: 8,
    },
    searchInput: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        marginLeft: 8,
    },
    scrollView: {
        flex: 1,
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 16,
    },
    clearText: {
        color: '#f2d00d',
        fontSize: 14,
        fontWeight: '600',
    },
    recentChips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    recentChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 8,
        marginRight: 8,
        marginBottom: 8,
    },
    recentChipText: {
        color: 'white',
        fontSize: 14,
        marginLeft: 6,
    },
    trendingList: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    trendingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    trendingRank: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(242, 208, 13, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    trendingRankText: {
        color: '#f2d00d',
        fontSize: 14,
        fontWeight: 'bold',
    },
    trendingInfo: {
        flex: 1,
        marginLeft: 12,
    },
    trendingTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
    },
    trendingCount: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
        marginTop: 2,
    },
    emptyState: {
        padding: 32,
        alignItems: 'center',
    },
    emptyText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 16,
    },
    suggestionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    suggestionImage: {
        width: 56,
        height: 56,
        borderRadius: 8,
    },
    suggestionInfo: {
        flex: 1,
        marginLeft: 12,
    },
    typeTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(242, 208, 13, 0.15)',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginBottom: 4,
    },
    typeTagText: {
        color: '#f2d00d',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    suggestionTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
    },
    suggestionAuthor: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
        marginTop: 2,
    },
});
