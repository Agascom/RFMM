import React from 'react';
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

const article = {
    id: 'a1',
    title: 'Pasteur Francis Lance l\'Initiative Mondiale "Phare d\'Espoir"',
    category: 'MINISTÈRE',
    readTime: '5 MIN DE LECTURE',
    author: 'Équipe Éditoriale',
    publishedAt: '28 Janvier 2024',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB36N9ekSw9Ze_FxQ9_GI78hQ4OaRfKVZ53zKnKsglZKNsGo1pS0C1g-rliqbTiTIudSyDFUje0_B-ugf-zXpuKiTJ_lWvcdZBdWCprGtpQdBPmnC0RaPwsWudCrpjbYujb0Ol-KM-mBk4p-qIYqZLogNCIvbVhg8XcQl7XTTTYTqpV93FM0pGkLq-opuDf-MOENAS3WJMudgcWnJa1n0Au5Zk7MP7ZvRnh3bHqq4eHmMdC-mgd0mSPLLuMeYTP_Kd3Z_4wlIVoR8gb',
    relatedArticles: [
        {
            id: 'r1',
            title: 'Aide Communautaire au Kenya',
            category: 'ENTRAIDE',
            publishedAt: '25 Jan 2024',
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhSOu10N9ERlhJYg2HQKt_D8a0fMnP9bFVBJV7TtAviK99OGvZAQcYIP0cZVR-7HrN_Ju0wvN0cmISOOV0w_d-TqdqZWuaR3mpxZGDrm5aRFJT6QEtjhHFB0w4u8Rv_EajIb3mSscBKDdtSxvlfFfpkcOnyRvTQ5Aul8wbSQFAzMiv-ARedBTOINs6a47NE3aoIoeVAuxELXz-SGjN-OaXHO2ZtZxh_ZQy2uivotWDF5ZikVCHjnB_yOIwI39jYxeOxouJbcUnyIhL',
        },
        {
            id: 'r2',
            title: 'Nouveau Livre Audio Disponible',
            category: 'MÉDIA',
            publishedAt: '22 Jan 2024',
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDejsiP8_uNtv-Rn_EcpGuLEMi37W1xYMaryYHyVZ4LHMNzP1Z-9DgO9_46ywD_EiRoNYzzo3BgwWZ4br9BGMx2D9E_SnKeukIQaTA__QTp5H2EUJxbyY1M_d8MIReqvDJlMawxtAE_Cv4k0wuKguMaDyzxwqNSNoFMHmX8Z4o5B4gq2urHVHAjHh_dVFMBml9SS0qOp9Ek52cXypEBgkBqpetVQ6Mi7cj6ZzUO-eOkuFvKkmcDckhIrYsqIy1F8jvvx5YhlK_0HWl_',
        },
    ],
};

export default function NewsDetailScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{ paddingBottom: 48 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Image d'en-tête */}
                <View style={styles.headerImage}>
                    <ImageBackground source={{ uri: article.imageUrl }} style={styles.imageBackground}>
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
                        <TouchableOpacity style={styles.headerButton}>
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
                            <Text style={styles.categoryText}>{article.category}</Text>
                        </View>
                        <View style={styles.readTimeChip}>
                            <Text style={styles.readTimeText}>{article.readTime}</Text>
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
                            <Text style={styles.publishDate}>{article.publishedAt}</Text>
                        </View>
                    </View>

                    {/* Corps de l'article */}
                    <View style={styles.bodyContent}>
                        <Text style={styles.bodyText}>
                            <Text style={styles.dropCap}>L</Text>
                            ors d'un rassemblement historique hier à la Grande Cathédrale, Pasteur Francis a dévoilé l'initiative "Phare d'Espoir", un effort multinational visant à fournir une orientation spirituelle et des ressources physiques aux communautés défavorisées sur trois continents.
                        </Text>
                        <Text style={[styles.bodyText, { marginTop: 20 }]}>
                            Cette initiative marque un tournant significatif pour le ministère, en se concentrant sur des centres communautaires à fort impact qui combinent formation professionnelle et éducation biblique. "Notre mission a toujours été de toucher le cœur," a noté Pasteur Francis lors de son discours, "mais nous devons aussi nourrir les mains qui font l'œuvre de Dieu."
                        </Text>

                        {/* Citation */}
                        <View style={styles.blockquote}>
                            <Text style={styles.blockquoteText}>
                                "Nous ne construisons pas seulement des églises ; nous bâtissons des avenirs durables enracinés dans la foi et la compassion."
                            </Text>
                        </View>

                        <Text style={styles.bodyText}>
                            La première phase du déploiement est prévue pour le mois prochain à Nairobi, suivie rapidement par des expansions dans certaines régions d'Asie du Sud-Est et d'Amérique Centrale. Le ministère s'est associé à des ONG locales pour garantir que l'action soit culturellement adaptée et réponde aux besoins régionaux spécifiques.
                        </Text>
                    </View>

                    {/* Articles connexes */}
                    <View style={styles.relatedSection}>
                        <View style={styles.relatedHeader}>
                            <Text style={styles.relatedTitle}>Articles Connexes</Text>
                            <TouchableOpacity style={styles.viewAllButton}>
                                <Text style={styles.viewAllText}>Voir tout</Text>
                                <MaterialIcons name="arrow-forward" size={14} color="#f2d00d" style={{ marginLeft: 4 }} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingRight: 16 }}
                        >
                            {article.relatedArticles.map((related, index) => (
                                <TouchableOpacity
                                    key={related.id}
                                    style={[styles.relatedCard, index > 0 && { marginLeft: 16 }]}
                                    activeOpacity={0.8}
                                >
                                    <Image source={{ uri: related.imageUrl }} style={styles.relatedImage} />
                                    <View style={styles.relatedInfo}>
                                        <Text style={styles.relatedCategory}>{related.category}</Text>
                                        <Text style={styles.relatedCardTitle} numberOfLines={2}>{related.title}</Text>
                                        <Text style={styles.relatedDate}>{related.publishedAt}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
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
    headerImage: {
        height: 400,
        width: '100%',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
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
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 50,
    },
    headerButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressBarContainer: {
        width: '100%',
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    progressFill: {
        height: '100%',
        width: '33%',
        backgroundColor: '#f2d00d',
    },
    content: {
        paddingHorizontal: 16,
        marginTop: -32,
        backgroundColor: '#221f10',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingTop: 32,
    },
    chipsRow: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    categoryChip: {
        backgroundColor: 'rgba(242, 208, 13, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(242, 208, 13, 0.3)',
    },
    categoryText: {
        color: '#f2d00d',
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    readTimeChip: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        marginLeft: 12,
    },
    readTimeText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 11,
        letterSpacing: 1,
    },
    articleTitle: {
        color: '#f2d00d',
        fontSize: 26,
        fontWeight: 'bold',
        lineHeight: 32,
        marginBottom: 20,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 24,
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(242, 208, 13, 0.1)',
    },
    authorAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(242, 208, 13, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(242, 208, 13, 0.3)',
    },
    authorName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
    publishDate: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 13,
        marginTop: 2,
    },
    bodyContent: {},
    bodyText: {
        fontSize: 17,
        lineHeight: 28,
        color: 'rgba(255,255,255,0.85)',
    },
    dropCap: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#f2d00d',
    },
    blockquote: {
        borderLeftWidth: 4,
        borderLeftColor: '#f2d00d',
        paddingLeft: 20,
        paddingVertical: 8,
        marginVertical: 24,
    },
    blockquoteText: {
        fontSize: 20,
        fontStyle: 'italic',
        color: '#f2d00d',
        lineHeight: 30,
    },
    relatedSection: {
        marginTop: 48,
        paddingBottom: 24,
    },
    relatedHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    relatedTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    viewAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewAllText: {
        color: '#f2d00d',
        fontSize: 14,
        fontWeight: 'bold',
    },
    relatedCard: {
        width: 260,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        overflow: 'hidden',
    },
    relatedImage: {
        height: 140,
        width: '100%',
        backgroundColor: '#333',
    },
    relatedInfo: {
        padding: 16,
    },
    relatedCategory: {
        color: '#f2d00d',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    relatedCardTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 6,
        lineHeight: 20,
    },
    relatedDate: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
        marginTop: 8,
    },
});
