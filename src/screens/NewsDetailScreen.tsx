import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    ActivityIndicator,
    Share
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { newsService } from '../services/api';
import { News } from '../types/api';

export default function NewsDetailScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { newsId } = route.params || {};

    const [article, setArticle] = useState<News | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (newsId) {
            loadArticle();
        } else {
            setLoading(false);
        }
    }, [newsId]);

    const loadArticle = async () => {
        try {
            setLoading(true);
            const response = await newsService.getArticle(newsId);
            if (response.success) {
                setArticle(response.data);
            }
        } catch (error) {
            console.error('Erreur chargement article:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleShare = async () => {
        if (!article) return;
        try {
            await Share.share({
                message: `${article.title}\n\nLisez cet article sur RFMM: https://rfmm.com/news/${article.slug}`,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const stripHtml = (html: string) => {
        if (!html) return '';
        return html.replace(/<[^>]*>?/gm, '');
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#f2d00d" />
            </View>
        );
    }

    if (!article) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={{ color: 'white' }}>Article non trouvée</Text>
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
                contentContainerStyle={{ paddingBottom: 48 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Image d'en-tête */}
                <View style={styles.headerImage}>
                    <ImageBackground source={{ uri: article.image_url }} style={styles.imageBackground}>
                        <View style={styles.imageOverlay} />
                    </ImageBackground>

                    {/* Barre d'en-tête */}
                    <View style={styles.headerBar}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.headerButton}
                        >
                            <MaterialIcons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
                            <MaterialIcons name="share" size={24} color="#f2d00d" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Barre de progression */}
                <View style={styles.progressBarContainer}>
                    <View style={styles.progressFill} />
                </View>

                {/* Contenu */}
                <View style={styles.content}>
                    {/* Tags */}
                    <View style={styles.chipsRow}>
                        <View style={styles.categoryChip}>
                            <Text style={styles.categoryText}>{article.category?.name || 'ACTUALITÉ'}</Text>
                        </View>
                        <View style={styles.readTimeChip}>
                            <Text style={styles.readTimeText}>5 MIN DE LECTURE</Text>
                        </View>
                    </View>

                    {/* Titre */}
                    <Text style={styles.articleTitle}>{article.title}</Text>

                    {/* Métadonnées */}
                    <View style={styles.metaRow}>
                        <View style={styles.authorAvatar}>
                            <MaterialIcons name="person" size={20} color="#f2d00d" />
                        </View>
                        <View style={{ marginLeft: 12 }}>
                            <Text style={styles.authorName}>{article.author}</Text>
                            <Text style={styles.publishDate}>
                                {new Date(article.published_at).toLocaleDateString()}
                            </Text>
                        </View>
                    </View>

                    {/* Corps du texte */}
                    <Text style={styles.paragraph}>
                        <Text style={styles.dropCap}>{stripHtml(article.content)[0]}</Text>
                        {stripHtml(article.content).substring(1)}
                    </Text>

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
    headerImage: {
        height: 300,
        position: 'relative',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    headerBar: {
        position: 'absolute',
        top: 48,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        // backdropFilter non supporté en RN pur
    },
    progressBarContainer: {
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        width: '100%',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#f2d00d',
        width: '30%', // À rendre dynamique avec le scroll
    },
    content: {
        padding: 24,
    },
    chipsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    categoryChip: {
        backgroundColor: 'rgba(242, 208, 13, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginRight: 12,
        borderWidth: 1,
        borderColor: 'rgba(242, 208, 13, 0.3)',
    },
    categoryText: {
        color: '#f2d00d',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    readTimeChip: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    readTimeText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    articleTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        lineHeight: 36,
        marginBottom: 24,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    authorAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    authorName: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    publishDate: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 12,
        marginTop: 2,
    },
    paragraph: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.9)',
        lineHeight: 32,
        marginBottom: 24,
        fontFamily: 'System', // Idéalement une police serif
    },
    dropCap: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#f2d00d',
        lineHeight: 48,
        marginRight: 4,
    },
    quoteBlock: {
        borderLeftWidth: 4,
        borderLeftColor: '#f2d00d',
        paddingLeft: 24,
        marginVertical: 24,
    },
    quoteText: {
        fontSize: 20,
        fontStyle: 'italic',
        color: 'rgba(255,255,255,0.9)',
        lineHeight: 32,
        fontFamily: 'System', // Idéalement serif
    },
});
