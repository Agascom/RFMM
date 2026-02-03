import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { booksService } from '../services/api';
import { Book } from '../types/api';

type CategoryType = 'all' | 'audiobook' | 'ebook';

const categories = [
    { id: 'all', label: 'Tous' },
    { id: 'audiobook', label: 'Livres Audio' },
    { id: 'ebook', label: 'E-books' },
];

const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR') + ' FCFA';
};

export default function StoreScreen() {
    const navigation = useNavigation<any>();
    const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            setLoading(true);
            const response = await booksService.getBooks();
            if (response.success) {
                setBooks(response.data);
            }
        } catch (error) {
            console.error('Erreur chargement livres:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filtrage des livres selon la catégorie
    const filteredBooks = activeCategory === 'all'
        ? books
        : books.filter(book => book.type === activeCategory);

    const newReleases = filteredBooks.filter(b => b.is_new).slice(0, 5);
    const bestSellers = filteredBooks.filter(b => b.is_bestseller);
    const featuredBook = books.find(b => b.is_featured) || books[0];
    const allFiltered = filteredBooks;

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
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                {/* En-tête */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('Search')}>
                        <MaterialIcons name="search" size={28} color="rgba(255,255,255,0.6)" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Librairie</Text>
                    <TouchableOpacity
                        style={styles.cartButton}
                        onPress={() => navigation.navigate('Checkout')}
                    >
                        <MaterialIcons name="shopping-cart" size={24} color="rgba(255,255,255,0.6)" />
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>0</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Catégories avec filtre fonctionnel */}
                <View style={styles.categoriesContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.categories}
                    >
                        {categories.map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                style={[
                                    styles.categoryTab,
                                    activeCategory === cat.id && styles.categoryTabActive
                                ]}
                                onPress={() => setActiveCategory(cat.id as CategoryType)}
                            >
                                <Text style={activeCategory === cat.id ? styles.categoryTextActive : styles.categoryText}>
                                    {cat.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Bannière Featured */}
                {featuredBook && (
                    <View style={styles.bannerContainer}>
                        <TouchableOpacity
                            style={styles.banner}
                            onPress={() => navigation.navigate('BookDetail', { bookId: featuredBook.id })} // Correction navigation
                            activeOpacity={0.9}
                        >
                            <ImageBackground
                                source={{ uri: featuredBook.cover_image_url }}
                                style={styles.bannerImage}
                                imageStyle={{ opacity: 0.6, borderRadius: 16 }}
                            >
                                <View style={styles.bannerContent}>
                                    <Text style={styles.bannerLabel}>EN VEDETTE</Text>
                                    <Text style={styles.bannerTitle} numberOfLines={2}>{featuredBook.title}</Text>
                                    <View style={styles.bannerButton}>
                                        <Text style={styles.bannerButtonText}>Découvrir</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Nouveautés */}
                {newReleases.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Nouveautés</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAllText}>Voir tout</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {newReleases.map((book, index) => (
                                <TouchableOpacity
                                    key={book.id}
                                    style={[styles.bookCard, index > 0 && { marginLeft: 16 }]}
                                    onPress={() => navigation.navigate('BookDetail', { bookId: book.id })}
                                    activeOpacity={0.8}
                                >
                                    <View style={styles.bookImageWrapper}>
                                        <Image source={{ uri: book.cover_image_url }} style={styles.bookImage} />
                                        <View style={styles.bookTypeBadge}>
                                            <MaterialIcons
                                                name={book.type === 'audiobook' ? 'headset' : 'menu-book'}
                                                size={14}
                                                color="#f2d00d"
                                            />
                                        </View>
                                    </View>
                                    <Text style={styles.bookTitle} numberOfLines={1}>{book.title}</Text>
                                    <Text style={styles.bookAuthor}>{book.author}</Text>
                                    <View style={styles.bookFooter}>
                                        <Text style={styles.bookPrice}>{formatPrice(book.price)}</Text>
                                        <View style={styles.buyButton}>
                                            <Text style={styles.buyButtonText}>VOIR</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {/* Meilleures ventes */}
                {bestSellers.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Meilleures Ventes</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAllText}>Voir tout</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingRight: 16 }}
                        >
                            {bestSellers.map((book, index) => (
                                <TouchableOpacity
                                    key={book.id}
                                    style={[styles.bestsellerCard, index > 0 && { marginLeft: 16 }]}
                                    onPress={() => navigation.navigate('BookDetail', { bookId: book.id })}
                                    activeOpacity={0.8}
                                >
                                    <Image source={{ uri: book.cover_image_url }} style={styles.bestsellerImage} />
                                    <View style={styles.bestsellerInfo}>
                                        <View>
                                            <View style={styles.bookTypeRow}>
                                                <MaterialIcons
                                                    name={book.type === 'audiobook' ? 'headset' : 'menu-book'}
                                                    size={14}
                                                    color="#f2d00d"
                                                />
                                                <Text style={styles.bookTypeText}>
                                                    {book.type === 'audiobook' ? 'LIVRE AUDIO' : 'E-BOOK'}
                                                </Text>
                                            </View>
                                            <Text style={styles.bestsellerTitle} numberOfLines={2}>{book.title}</Text>
                                            <Text style={styles.bestsellerRank}>Meilleure vente #{index + 1}</Text>
                                        </View>
                                        <View style={styles.bestsellerFooter}>
                                            <Text style={styles.bestsellerPrice}>{formatPrice(book.price)}</Text>
                                            <View style={styles.buyButton}>
                                                <Text style={styles.buyButtonText}>VOIR</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {/* Tous les articles filtrés */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            {activeCategory === 'all' ? 'Tous les Articles' :
                                activeCategory === 'audiobook' ? 'Livres Audio' : 'E-Books'}
                        </Text>
                        <Text style={styles.countText}>{allFiltered.length} articles</Text>
                    </View>
                    <View style={styles.booksGrid}>
                        {allFiltered.map((book, index) => (
                            <TouchableOpacity
                                key={book.id}
                                style={[styles.gridBookCard, index % 2 === 1 && { marginLeft: '2%' }]}
                                onPress={() => navigation.navigate('BookDetail', { bookId: book.id })}
                                activeOpacity={0.8}
                            >
                                <View style={styles.gridBookImageWrapper}>
                                    <Image source={{ uri: book.cover_image_url }} style={styles.bookImage} />
                                    <View style={styles.bookTypeBadge}>
                                        <MaterialIcons
                                            name={book.type === 'audiobook' ? 'headset' : 'menu-book'}
                                            size={14}
                                            color="#f2d00d"
                                        />
                                    </View>
                                </View>
                                <Text style={styles.gridBookTitle} numberOfLines={1}>{book.title}</Text>
                                <Text style={styles.bookAuthor}>{book.author}</Text>
                                <Text style={styles.gridBookPrice}>{formatPrice(book.price)}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
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
    scrollView: {
        flex: 1,
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
    searchButton: {
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
    cartButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 16,
        height: 16,
        backgroundColor: '#f2d00d',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'black',
    },
    categoriesContainer: {
        paddingHorizontal: 16,
        marginTop: 8,
    },
    categories: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    categoryTab: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    categoryTabActive: {
        borderBottomColor: '#f2d00d',
    },
    categoryText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'rgba(255,255,255,0.5)',
    },
    categoryTextActive: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#f2d00d',
    },
    bannerContainer: {
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    banner: {
        height: 192,
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: 'rgba(242, 208, 13, 0.2)',
    },
    bannerImage: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    bannerContent: {
        maxWidth: '70%',
    },
    bannerLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: '#f2d00d',
        marginBottom: 8,
    },
    bannerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        color: 'white',
        textShadowColor: 'rgba(0,0,0,0.7)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    bannerButton: {
        backgroundColor: '#f2d00d',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        alignSelf: 'flex-start',
    },
    bannerButtonText: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
    },
    section: {
        paddingTop: 32,
        paddingHorizontal: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    seeAllText: {
        color: '#f2d00d',
        fontSize: 14,
        fontWeight: 'bold',
    },
    countText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 14,
    },
    booksRow: {
        flexDirection: 'row',
    },
    booksGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    bookCard: {
        width: 140, // Fixed width for horizontal scrolling
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    gridBookCard: {
        width: '48%',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    bookImageWrapper: {
        aspectRatio: 3 / 4,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        marginBottom: 12,
    },
    gridBookImageWrapper: {
        aspectRatio: 3 / 4,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginBottom: 12,
    },
    bookImage: {
        width: '100%',
        height: '100%',
    },
    bookTypeBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(34, 31, 16, 0.9)',
        padding: 6,
        borderRadius: 15,
    },
    bookTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#221f10',
    },
    gridBookTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },
    bookAuthor: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)', // Adjusted for light card visibility if needed, but card is white
        marginBottom: 8,
        marginTop: 2,
    },
    bookFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 'auto',
    },
    bookPrice: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#221f10',
    },
    gridBookPrice: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#f2d00d',
    },
    buyButton: {
        backgroundColor: '#f2d00d',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 15,
    },
    buyButtonText: {
        color: '#221f10',
        fontSize: 9,
        fontWeight: 'bold',
    },
    bestsellerCard: {
        width: 280,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        borderWidth: 2,
        borderColor: 'rgba(242, 208, 13, 0.3)',
    },
    bestsellerImage: {
        width: 100,
        aspectRatio: 3 / 4,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
    },
    bestsellerInfo: {
        flex: 1,
        paddingVertical: 4,
        justifyContent: 'space-between',
        marginLeft: 16,
    },
    bookTypeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    bookTypeText: {
        fontSize: 10,
        color: 'gray',
        fontWeight: 'bold',
        marginLeft: 4,
    },
    bestsellerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#221f10',
    },
    bestsellerRank: {
        fontSize: 12,
        color: '#f2d00d',
        fontWeight: '600',
        marginTop: 4,
    },
    bestsellerFooter: {
        marginTop: 8,
    },
    bestsellerPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#221f10',
        marginBottom: 8,
    },
});
