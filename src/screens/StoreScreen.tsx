import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    StyleSheet
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const books = [
    {
        id: '1',
        title: 'Marcher dans la Foi',
        author: 'Pasteur Francis',
        price: 5000,
        type: 'ebook',
        isBestSeller: true,
        isNew: true,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC65_rrcQgI7Gg6AFnG2ElqYdwOVh0f5oNsF1AJN41YiG0mqXmO8VPWwV5uz1IUuqHXItOiFyfNFuZW1N8k6IWXSIhvRYKANNpVjeYTOJl5WkHmIdOg1WoJrs59x1CncjT-UQMC5iH89RupyrYRiCKDvxSp6xOh9myp82edUdn1peA-QDdCTTUmUxURjoniO_5G3y9pxL-w2qyRQ-tUMkGeYJNNaRpEjNVrPeHl57Y3WBr_BNPXkJJIcWZbiPoqdOB3oGgUW5p9OcEe',
    },
    {
        id: '2',
        title: 'L\'Onction Divine',
        author: 'Pasteur Francis',
        price: 7500,
        type: 'audiobook',
        isBestSeller: true,
        isNew: true,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1tJ-Wy2qhlI6vWxTjRzQ0xYlg_FA2Vn3yiwysyEQ3DxDxXtcdf-fTX834BtDztrY4t7pknZGRwWuvbNM4sMBz_HXzecOgVXnDMeS0pmV8wboZ77cBFraZ6T5xM6UnZHXYz7S0N6ecn7RXYFepxGlhurfJLrXd1kAUXiy4XRkj94MqsYoL7zTmOQXgqngYz60j8hIdzuwFVIs9UFUmgmRBn2qh6vJ1IoFHSlZHRdKatQFc9jft_gQ-jHhYczS2ijBGCt6ulpXMZAvI',
    },
    {
        id: '3',
        title: 'Une Vie avec un But',
        author: 'Pasteur Francis',
        price: 4500,
        type: 'ebook',
        isBestSeller: false,
        isNew: false,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk_P96jDVIlRGcwtDeWuAOwJYUlNH5eP85VmkDZov9NnDTzvtwBRFXQmG8KeR0mClBTAWUfwczdA1W4rrfs_or3v9W2n-IiSuJx6nPQg95hioWEB88fl_yRU97BJcsWFJzc4m65MA4ctYs-6BqT-0l19OLx2mNlmbOA2bnreEo5wqNMgEwZXZ6Va_8wIb3Bes3knDAjwe-OwgMl_-W0W4jniFlJR7GHTPlzD44Viys6aYOkjMfBqMpgar9SJyZcTUe0MAptwpC2ujF',
    },
    {
        id: '4',
        title: 'Guérison Divine',
        author: 'Pasteur Francis',
        price: 6000,
        type: 'audiobook',
        isBestSeller: false,
        isNew: false,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfKNyvZxVCceSH1_w0YHwYqXg13l_xgpIut6zqnKmwsz_N7TVjJiGun-nIeH4scRV7F8eCIMOMW5WwUjnhA9suDx3LlntsNqmYOjZvuJugt_Z_TBwl2GHUaEpMv81z3xZt_t-oFBh6OBuzjCCh7MaFK_nNo7BI2kuuzZQB9748XW3vXImy4bYoGH0Eqb0z55OlPV9M1I-1Oa6gbiwrI_FPLG2tMHYbdWGT-AsE5NO9CWd1yZF9_UmhnGiO3Pp2tCwKt93SZsF63wtx',
    },
    {
        id: '5',
        title: 'Prières Puissantes',
        author: 'Pasteur Francis',
        price: 3500,
        type: 'ebook',
        isBestSeller: false,
        isNew: true,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPZ1urFQMpFgEXXE2GB2TMW5KaPzBTQ3B_YVmP7xEtngDx9_1K_ahD0js5_SsA-1ETkkjoK8fuW_1xVp1c2Si156yhIHSKxjYU4Qj9SEJkSpLkD3egaPtSD290RUZ6jGMcmzumqd9Ab308TUQYex-dKALuzweKhmBNURjEQtG985tQawMGHX8AAPLRipGY51sJAA3295BGj5IalVpUJ6CMMmQL3XK-uL_qr1pP3rH9dJYD5Rr1LDosjP945VEVG6WruGyUhW8yAj7w',
    },
    {
        id: '6',
        title: 'La Sagesse Divine',
        author: 'Pasteur Francis',
        price: 8000,
        type: 'audiobook',
        isBestSeller: true,
        isNew: false,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhSOu10N9ERlhJYg2HQKt_D8a0fMnP9bFVBJV7TtAviK99OGvZAQcYIP0cZVR-7HrN_Ju0wvN0cmISOOV0w_d-TqdqZWuaR3mpxZGDrm5aRFJT6QEtjhHFB0w4u8Rv_EajIb3mSscBKDdtSxvlfFfpkcOnyRvTQ5Aul8wbSQFAzMiv-ARedBTOINs6a47NE3aoIoeVAuxELXz-SGjN-OaXHO2ZtZxh_ZQy2uivotWDF5ZikVCHjnB_yOIwI39jYxeOxouJbcUnyIhL',
    },
];

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

    // Filtrage des livres selon la catégorie
    const filteredBooks = activeCategory === 'all'
        ? books
        : books.filter(book => book.type === activeCategory);

    const newReleases = filteredBooks.filter(b => b.isNew).slice(0, 2);
    const bestSellers = filteredBooks.filter(b => b.isBestSeller);
    const allFiltered = filteredBooks;

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                {/* En-tête */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.searchButton}>
                        <MaterialIcons name="search" size={28} color="rgba(255,255,255,0.6)" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Librairie</Text>
                    <TouchableOpacity
                        style={styles.cartButton}
                        onPress={() => navigation.navigate('Checkout')}
                    >
                        <MaterialIcons name="shopping-cart" size={24} color="rgba(255,255,255,0.6)" />
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>2</Text>
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
                <View style={styles.bannerContainer}>
                    <View style={styles.banner}>
                        <ImageBackground
                            source={{ uri: books[1].imageUrl }}
                            style={styles.bannerImage}
                            imageStyle={{ opacity: 0.6, borderRadius: 16 }}
                        >
                            <View style={styles.bannerContent}>
                                <Text style={styles.bannerLabel}>SORTIE EN VEDETTE</Text>
                                <Text style={styles.bannerTitle}>L'Onction de la Sagesse</Text>
                                <TouchableOpacity style={styles.bannerButton}>
                                    <Text style={styles.bannerButtonText}>En savoir plus</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                </View>

                {/* Nouveautés */}
                {newReleases.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Nouveautés</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAllText}>Voir tout</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.booksRow}>
                            {newReleases.map((book, index) => (
                                <TouchableOpacity
                                    key={book.id}
                                    style={[styles.bookCard, index > 0 && { marginLeft: 16 }]}
                                    onPress={() => navigation.navigate('Checkout')}
                                    activeOpacity={0.8}
                                >
                                    <View style={styles.bookImageWrapper}>
                                        <Image source={{ uri: book.imageUrl }} style={styles.bookImage} />
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
                                            <Text style={styles.buyButtonText}>ACHETER</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
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
                                    onPress={() => navigation.navigate('Checkout')}
                                    activeOpacity={0.8}
                                >
                                    <Image source={{ uri: book.imageUrl }} style={styles.bestsellerImage} />
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
                                                <Text style={styles.buyButtonText}>ACHETER</Text>
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
                                style={[styles.gridBookCard, index % 2 === 1 && { marginLeft: 12 }]}
                                onPress={() => navigation.navigate('Checkout')}
                                activeOpacity={0.8}
                            >
                                <View style={styles.gridBookImageWrapper}>
                                    <Image source={{ uri: book.imageUrl }} style={styles.bookImage} />
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
    },
    bookCard: {
        flex: 1,
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
        width: '47%',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
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
        color: 'rgba(255,255,255,0.5)',
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
