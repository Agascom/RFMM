import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { booksService } from '../services/api';
import { Book } from '../types/api';

const { width } = Dimensions.get('window');

const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR') + ' FCFA';
};

export default function BookDetailScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { bookId } = route.params || {};

    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (bookId) {
            loadBook();
        } else {
            setLoading(false);
        }
    }, [bookId]);

    const loadBook = async () => {
        try {
            setLoading(true);
            const response = await booksService.getBook(bookId);
            if (response.success) {
                setBook(response.data);
            }
        } catch (error) {
            console.error('Erreur chargement livre:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#f2d00d" />
            </View>
        );
    }

    if (!book) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={{ color: 'white' }}>Livre non trouvé</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                    <Text style={{ color: '#f2d00d' }}>Retour</Text>
                </TouchableOpacity>
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
                {/* Header avec image */}
                <View style={styles.headerSection}>
                    <View style={styles.headerOverlay} />

                    {/* Navigation */}
                    <View style={styles.headerNav}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navButton}>
                            <MaterialIcons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                        <View style={styles.navActions}>
                            <TouchableOpacity style={styles.navButton}>
                                <MaterialIcons name="favorite-border" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.navButton, { marginLeft: 8 }]}>
                                <MaterialIcons name="share" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Image du livre */}
                    <View style={styles.bookImageWrapper}>
                        <Image source={{ uri: book.cover_image_url }} style={styles.bookImage} />
                        <View style={styles.typeBadge}>
                            <MaterialIcons name={book.type === 'audiobook' ? 'headset' : 'menu-book'} size={14} color="#f2d00d" />
                            <Text style={styles.typeBadgeText}>
                                {book.type === 'audiobook' ? 'LIVRE AUDIO' : 'E-BOOK'}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Contenu principal */}
                <View style={styles.content}>
                    {/* Titre et auteur */}
                    <Text style={styles.bookTitle}>{book.title}</Text>
                    <Text style={styles.bookAuthor}>par {book.author}</Text>

                    {/* Notes et stats */}
                    <View style={styles.statsRow}>
                        <View style={styles.ratingBadge}>
                            <MaterialIcons name="star" size={16} color="#f2d00d" />
                            <Text style={styles.ratingText}>{book.rating}</Text>
                            <Text style={styles.reviewsText}>({book.ratings_count} avis)</Text>
                        </View>
                        {book.type === 'ebook' && book.size && (
                            <>
                                <View style={styles.statsDivider} />
                                <Text style={styles.statsText}>{book.size}</Text>
                            </>
                        )}
                        {book.type === 'audiobook' && book.duration && (
                            <>
                                <View style={styles.statsDivider} />
                                <Text style={styles.statsText}>{book.duration}</Text>
                            </>
                        )}
                    </View>

                    {/* Prix */}
                    <View style={styles.priceSection}>
                        <View style={styles.priceRow}>
                            <Text style={styles.currentPrice}>{book.formatted_price || formatPrice(book.price)}</Text>
                            {/* Affichage du prix original si réduction (non fourni par API mais mockup le supportait) */}
                            {book.discount_percentage && (
                                <View style={styles.discountBadge}>
                                    <Text style={styles.discountText}>-{book.discount_percentage}%</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Description */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.descriptionText}>{book.description}</Text>
                        <TouchableOpacity>
                            <Text style={styles.readMoreText}>Lire plus</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Chapitres */}
                    {book.chapters && book.chapters.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Contenu ({book.chapters.length} chapitres)</Text>
                            <View style={styles.chaptersList}>
                                {book.chapters.map((chapter, index) => (
                                    <View key={chapter.id} style={styles.chapterItem}>
                                        <View style={styles.chapterNumber}>
                                            <Text style={styles.chapterNumberText}>{chapter.chapter_number}</Text>
                                        </View>
                                        <View style={styles.chapterInfo}>
                                            <Text style={styles.chapterTitle}>{chapter.title}</Text>
                                            <Text style={styles.chapterDuration}>{chapter.duration}</Text>
                                        </View>
                                        <MaterialIcons
                                            name={chapter.is_free_preview ? "play-circle" : "lock"}
                                            size={20}
                                            color={chapter.is_free_preview ? "#f2d00d" : "rgba(255,255,255,0.3)"}
                                        />
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Détails */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Détails</Text>
                        <View style={styles.detailsGrid}>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Format</Text>
                                <Text style={styles.detailValue}>
                                    {book.type === 'audiobook' ? 'MP3' : 'PDF, EPUB'}
                                </Text>
                            </View>
                            {book.category && (
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>Catégorie</Text>
                                    <Text style={styles.detailValue}>{book.category.name}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Footer d'achat */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.previewButton}>
                    <MaterialIcons name="visibility" size={20} color="#f2d00d" />
                    <Text style={styles.previewButtonText}>Aperçu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buyButton}
                    onPress={() => navigation.navigate('Checkout')}
                >
                    <MaterialIcons name="shopping-cart" size={20} color="#221f10" />
                    <Text style={styles.buyButtonText}>Acheter maintenant</Text>
                </TouchableOpacity>
            </View>
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
    headerSection: {
        height: 320,
        backgroundColor: '#1a1608',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 40,
    },
    headerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(242, 208, 13, 0.05)',
    },
    headerNav: {
        position: 'absolute',
        top: 48,
        left: 16,
        right: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10,
    },
    navButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navActions: {
        flexDirection: 'row',
    },
    bookImageWrapper: {
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 15,
    },
    bookImage: {
        width: 160,
        height: 220,
        borderRadius: 12,
    },
    typeBadge: {
        position: 'absolute',
        top: -10,
        right: -10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#221f10',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#f2d00d',
    },
    typeBadgeText: {
        color: '#f2d00d',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    bookTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    bookAuthor: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.6)',
        textAlign: 'center',
        marginTop: 8,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        color: '#f2d00d',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    reviewsText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
        marginLeft: 4,
    },
    statsDivider: {
        width: 1,
        height: 16,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginHorizontal: 12,
    },
    statsText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
    },
    priceSection: {
        marginTop: 24,
        padding: 16,
        backgroundColor: 'rgba(242, 208, 13, 0.1)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(242, 208, 13, 0.2)',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    currentPrice: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#f2d00d',
    },
    discountBadge: {
        backgroundColor: '#ff4444',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginLeft: 12,
    },
    discountText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    section: {
        marginTop: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 16,
    },
    descriptionText: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.7)',
        lineHeight: 24,
    },
    readMoreText: {
        color: '#f2d00d',
        fontSize: 14,
        fontWeight: '600',
        marginTop: 8,
    },
    chaptersList: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    chapterItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    chapterNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(242, 208, 13, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chapterNumberText: {
        color: '#f2d00d',
        fontSize: 14,
        fontWeight: 'bold',
    },
    chapterInfo: {
        flex: 1,
        marginLeft: 12,
    },
    chapterTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
    },
    chapterDuration: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
        marginTop: 2,
    },
    detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    detailItem: {
        width: '50%',
        paddingVertical: 12,
    },
    detailLabel: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
    },
    detailValue: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
        marginTop: 4,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        padding: 16,
        paddingBottom: 32,
        backgroundColor: 'rgba(34, 31, 16, 0.98)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    previewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#f2d00d',
        marginRight: 12,
    },
    previewButtonText: {
        color: '#f2d00d',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    buyButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2d00d',
        paddingVertical: 16,
        borderRadius: 30,
    },
    buyButtonText: {
        color: '#221f10',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});
