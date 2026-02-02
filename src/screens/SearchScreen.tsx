import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const recentSearches = ['Pasteur Francis', 'La Grâce', 'Méditation', 'Coaching'];

const trendingTopics = [
    { id: '1', title: 'Foi et Persévérance', count: '2.5k recherches' },
    { id: '2', title: 'Prière Quotidienne', count: '1.8k recherches' },
    { id: '3', title: 'Guérison Spirituelle', count: '1.2k recherches' },
];

const suggestions = [
    {
        id: '1',
        type: 'audiobook',
        title: 'Le Chemin de la Grâce',
        author: 'Pasteur Francis',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk_P96jDVIlRGcwtDeWuAOwJYUlNH5eP85VmkDZov9NnDTzvtwBRFXQmG8KeR0mClBTAWUfwczdA1W4rrfs_or3v9W2n-IiSuJx6nPQg95hioWEB88fl_yRU97BJcsWFJzc4m65MA4ctYs-6BqT-0l19OLx2mNlmbOA2bnreEo5wqNMgEwZXZ6Va_8wIb3Bes3knDAjwe-OwgMl_-W0W4jniFlJR7GHTPlzD44Viys6aYOkjMfBqMpgar9SJyZcTUe0MAptwpC2ujF',
    },
    {
        id: '2',
        type: 'ebook',
        title: 'Marcher dans la Foi',
        author: 'Pasteur Francis',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC65_rrcQgI7Gg6AFnG2ElqYdwOVh0f5oNsF1AJN41YiG0mqXmO8VPWwV5uz1IUuqHXItOiFyfNFuZW1N8k6IWXSIhvRYKANNpVjeYTOJl5WkHmIdOg1WoJrs59x1CncjT-UQMC5iH89RupyrYRiCKDvxSp6xOh9myp82edUdn1peA-QDdCTTUmUxURjoniO_5G3y9pxL-w2qyRQ-tUMkGeYJNNaRpEjNVrPeHl57Y3WBr_BNPXkJJIcWZbiPoqdOB3oGgUW5p9OcEe',
    },
    {
        id: '3',
        type: 'coaching',
        title: 'Maîtrise Mentale',
        author: 'Programme Coaching',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhSOu10N9ERlhJYg2HQKt_D8a0fMnP9bFVBJV7TtAviK99OGvZAQcYIP0cZVR-7HrN_Ju0wvN0cmISOOV0w_d-TqdqZWuaR3mpxZGDrm5aRFJT6QEtjhHFB0w4u8Rv_EajIb3mSscBKDdtSxvlfFfpkcOnyRvTQ5Aul8wbSQFAzMiv-ARedBTOINs6a47NE3aoIoeVAuxELXz-SGjN-OaXHO2ZtZxh_ZQy2uivotWDF5ZikVCHjnB_yOIwI39jYxeOxouJbcUnyIhL',
    },
];

export default function SearchScreen() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');

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
                {/* Recherches récentes */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recherches Récentes</Text>
                        <TouchableOpacity>
                            <Text style={styles.clearText}>Effacer</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.recentChips}>
                        {recentSearches.map((search) => (
                            <TouchableOpacity key={search} style={styles.recentChip}>
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
                            <TouchableOpacity key={topic.id} style={styles.trendingItem}>
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

                {/* Suggestions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Suggestions pour vous</Text>
                    <View style={styles.suggestionsList}>
                        {suggestions.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.suggestionCard}>
                                <Image source={{ uri: item.imageUrl }} style={styles.suggestionImage} />
                                <View style={styles.suggestionInfo}>
                                    <View style={styles.typeTag}>
                                        <MaterialIcons
                                            name={item.type === 'audiobook' ? 'headset' : item.type === 'ebook' ? 'menu-book' : 'school'}
                                            size={12}
                                            color="#f2d00d"
                                        />
                                        <Text style={styles.typeTagText}>
                                            {item.type === 'audiobook' ? 'AUDIO' : item.type === 'ebook' ? 'E-BOOK' : 'COACHING'}
                                        </Text>
                                    </View>
                                    <Text style={styles.suggestionTitle} numberOfLines={1}>{item.title}</Text>
                                    <Text style={styles.suggestionAuthor}>{item.author}</Text>
                                </View>
                                <TouchableOpacity style={styles.playButton}>
                                    <MaterialIcons name="play-arrow" size={20} color="black" />
                                </TouchableOpacity>
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
    suggestionsList: {},
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
    playButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f2d00d',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
