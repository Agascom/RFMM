import React from 'react';
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

const notifications = [
    {
        id: '1',
        type: 'new_content',
        title: 'Nouveau Podcast Disponible',
        message: '"La Paix Intérieure" - Épisode 16 est maintenant disponible.',
        time: 'Il y a 2h',
        isRead: false,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfKNyvZxVCceSH1_w0YHwYqXg13l_xgpIut6zqnKmwsz_N7TVjJiGun-nIeH4scRV7F8eCIMOMW5WwUjnhA9suDx3LlntsNqmYOjZvuJugt_Z_TBwl2GHUaEpMv81z3xZt_t-oFBh6OBuzjCCh7MaFK_nNo7BI2kuuzZQB9748XW3vXImy4bYoGH0Eqb0z55OlPV9M1I-1Oa6gbiwrI_FPLG2tMHYbdWGT-AsE5NO9CWd1yZF9_UmhnGiO3Pp2tCwKt93SZsF63wtx',
    },
    {
        id: '2',
        type: 'event',
        title: 'Événement ce Dimanche',
        message: 'N\'oubliez pas le Sommet Annuel de la Sagesse ce dimanche à 10h.',
        time: 'Il y a 5h',
        isRead: false,
        icon: 'event',
    },
    {
        id: '3',
        type: 'promotion',
        title: 'Offre Spéciale',
        message: '-30% sur tous les e-books jusqu\'à dimanche ! Utilisez le code GRACE30.',
        time: 'Hier',
        isRead: true,
        icon: 'local-offer',
    },
    {
        id: '4',
        type: 'coaching',
        title: 'Session de Coaching',
        message: 'Votre session "Maîtrise Mentale" reprend où vous l\'avez laissée.',
        time: 'Hier',
        isRead: true,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhSOu10N9ERlhJYg2HQKt_D8a0fMnP9bFVBJV7TtAviK99OGvZAQcYIP0cZVR-7HrN_Ju0wvN0cmISOOV0w_d-TqdqZWuaR3mpxZGDrm5aRFJT6QEtjhHFB0w4u8Rv_EajIb3mSscBKDdtSxvlfFfpkcOnyRvTQ5Aul8wbSQFAzMiv-ARedBTOINs6a47NE3aoIoeVAuxELXz-SGjN-OaXHO2ZtZxh_ZQy2uivotWDF5ZikVCHjnB_yOIwI39jYxeOxouJbcUnyIhL',
    },
    {
        id: '5',
        type: 'system',
        title: 'Mise à jour disponible',
        message: 'Une nouvelle version de RFMM est disponible. Mettez à jour pour profiter des nouvelles fonctionnalités.',
        time: 'Il y a 2 jours',
        isRead: true,
        icon: 'system-update',
    },
];

export default function NotificationsScreen() {
    const navigation = useNavigation();
    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <View style={styles.container}>
            {/* En-tête */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <TouchableOpacity style={styles.settingsButton}>
                    <MaterialIcons name="settings" size={24} color="rgba(255,255,255,0.6)" />
                </TouchableOpacity>
            </View>

            {/* Barre de statut */}
            <View style={styles.statusBar}>
                <View style={styles.unreadBadge}>
                    <Text style={styles.unreadBadgeText}>{unreadCount} non lues</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.markAllText}>Tout marquer comme lu</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {notifications.map((notification) => (
                    <TouchableOpacity
                        key={notification.id}
                        style={[
                            styles.notificationCard,
                            !notification.isRead && styles.notificationUnread
                        ]}
                        activeOpacity={0.7}
                    >
                        {/* Indicateur non lu */}
                        {!notification.isRead && <View style={styles.unreadDot} />}

                        {/* Image ou Icône */}
                        {notification.imageUrl ? (
                            <Image source={{ uri: notification.imageUrl }} style={styles.notificationImage} />
                        ) : (
                            <View style={styles.notificationIcon}>
                                <MaterialIcons
                                    name={notification.icon as any}
                                    size={24}
                                    color="#f2d00d"
                                />
                            </View>
                        )}

                        {/* Contenu */}
                        <View style={styles.notificationContent}>
                            <Text style={styles.notificationTitle}>{notification.title}</Text>
                            <Text style={styles.notificationMessage} numberOfLines={2}>
                                {notification.message}
                            </Text>
                            <Text style={styles.notificationTime}>{notification.time}</Text>
                        </View>

                        {/* Action */}
                        <TouchableOpacity style={styles.moreButton}>
                            <MaterialIcons name="more-vert" size={20} color="rgba(255,255,255,0.4)" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}

                {/* Fin des notifications */}
                <View style={styles.endMessage}>
                    <MaterialIcons name="check-circle" size={48} color="rgba(242, 208, 13, 0.3)" />
                    <Text style={styles.endMessageText}>Vous êtes à jour !</Text>
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
    backButton: {
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
    settingsButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    unreadBadge: {
        backgroundColor: 'rgba(242, 208, 13, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    unreadBadgeText: {
        color: '#f2d00d',
        fontSize: 12,
        fontWeight: 'bold',
    },
    markAllText: {
        color: '#f2d00d',
        fontSize: 14,
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
    },
    notificationCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
        position: 'relative',
    },
    notificationUnread: {
        backgroundColor: 'rgba(242, 208, 13, 0.05)',
    },
    unreadDot: {
        position: 'absolute',
        left: 8,
        top: 24,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#f2d00d',
    },
    notificationImage: {
        width: 48,
        height: 48,
        borderRadius: 8,
    },
    notificationIcon: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: 'rgba(242, 208, 13, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationContent: {
        flex: 1,
        marginLeft: 12,
    },
    notificationTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
    notificationMessage: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.6)',
        marginTop: 4,
        lineHeight: 20,
    },
    notificationTime: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.4)',
        marginTop: 6,
    },
    moreButton: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    endMessage: {
        alignItems: 'center',
        paddingVertical: 48,
    },
    endMessageText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 14,
        marginTop: 12,
    },
});
