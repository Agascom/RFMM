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
import { notificationService } from '../services/api';

export default function NotificationsScreen() {
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        try {
            setLoading(true);
            const data = await notificationService.getAll();
            // Si data est vide (api mock response peut etre un array vide pour l'instant)
            // On peut laisser vide ou mettre les mocks si l'api n'est pas prete. 
            // Pour l'exercice "Tout API", on prend la data API.
            setNotifications(data || []);
        } catch (error) {
            console.error(error);
            setNotifications([]);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id: string) => {
        try {
            await notificationService.markAsRead(id);
            // Update local state
            setNotifications(prev => prev.map(n =>
                n.id === id ? { ...n, isRead: true, read_at: new Date().toISOString() } : n
            ));
        } catch (error) {
            console.error(error);
        }
    };

    // Calcul mocké pour l'instant si l'API ne renvoie pas isRead booleen direct mais read_at
    const unreadCount = notifications.filter(n => !n.read_at && !n.isRead).length;

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

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#f2d00d" />
                </View>
            ) : (
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    {notifications.length === 0 ? (
                        <View style={styles.endMessage}>
                            <MaterialIcons name="notifications-none" size={48} color="rgba(255,255,255,0.2)" />
                            <Text style={styles.endMessageText}>Aucune notification</Text>
                        </View>
                    ) : (
                        notifications.map((notification) => (
                            <TouchableOpacity
                                key={notification.id}
                                style={[
                                    styles.notificationCard,
                                    (!notification.read_at && !notification.isRead) && styles.notificationUnread
                                ]}
                                activeOpacity={0.7}
                                onPress={() => handleMarkAsRead(notification.id)}
                            >
                                {/* Indicateur non lu */}
                                {(!notification.read_at && !notification.isRead) && <View style={styles.unreadDot} />}

                                {/* Image ou Icône */}
                                {notification.image_url ? (
                                    <Image source={{ uri: notification.image_url }} style={styles.notificationImage} />
                                ) : (
                                    <View style={styles.notificationIcon}>
                                        <MaterialIcons
                                            name={notification.data?.icon || 'notifications'}
                                            size={24}
                                            color="#f2d00d"
                                        />
                                    </View>
                                )}

                                {/* Contenu */}
                                <View style={styles.notificationContent}>
                                    <Text style={styles.notificationTitle}>{notification.data?.title || notification.title || 'Notification'}</Text>
                                    <Text style={styles.notificationMessage} numberOfLines={2}>
                                        {notification.data?.message || notification.message || ''}
                                    </Text>
                                    <Text style={styles.notificationTime}>{notification.created_at_human || 'Récemment'}</Text>
                                </View>

                                {/* Action */}
                                <TouchableOpacity style={styles.moreButton}>
                                    <MaterialIcons name="more-vert" size={20} color="rgba(255,255,255,0.4)" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))
                    )}

                    {notifications.length > 0 && (
                        <View style={styles.endMessage}>
                            <MaterialIcons name="check-circle" size={48} color="rgba(242, 208, 13, 0.3)" />
                            <Text style={styles.endMessageText}>Vous êtes à jour !</Text>
                        </View>
                    )}
                </ScrollView>
            )}
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
