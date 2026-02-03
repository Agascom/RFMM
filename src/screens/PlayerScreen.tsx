import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { booksService, playerService } from '../services/api';

export default function PlayerScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { bookId, programId } = route.params || {};

    const [loading, setLoading] = useState(true);
    const [track, setTrack] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0); // 0 to 100
    const [duration, setDuration] = useState(1500); // En secondes (mock)
    const [currentTime, setCurrentTime] = useState(0);

    const progressInterval = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        loadTrack();
        return () => stopPlayer();
    }, [bookId, programId]);

    const loadTrack = async () => {
        try {
            setLoading(true);
            let data;
            if (bookId) {
                const response = await booksService.getBook(bookId);
                data = response.data;
            } else {
                // Fallback mock track
                data = {
                    id: 'fake',
                    title: 'Le Chemin de la Grâce',
                    author: 'Pasteur Francis',
                    cover_image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk_P96jDVIlRGcwtDeWuAOwJYUlNH5eP85VmkDZov9NnDTzvtwBRFXQmG8KeR0mClBTAWUfwczdA1W4rrfs_or3v9W2n-IiSuJx6nPQg95hioWEB88fl_yRU97BJcsWFJzc4m65MA4ctYs-6BqT-0l19OLx2mNlmbOA2bnreEo5wqNMgEwZXZ6Va_8wIb3Bes3knDAjwe-OwgMl_-W0W4jniFlJR7GHTPlzD44Viys6aYOkjMfBqMpgar9SJyZcTUe0MAptwpC2ujF'
                };
            }
            setTrack(data);
            setIsPlaying(true);
            startProgress();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const startProgress = () => {
        if (progressInterval.current) clearInterval(progressInterval.current);
        progressInterval.current = setInterval(() => {
            setCurrentTime(prev => {
                if (prev >= duration) {
                    stopPlayer();
                    return prev;
                }
                return prev + 1;
            });
        }, 1000);
    };

    const stopPlayer = () => {
        if (progressInterval.current) {
            clearInterval(progressInterval.current);
            progressInterval.current = null;
        }
        setIsPlaying(false);
        saveProgress();
    };

    const togglePlay = () => {
        if (isPlaying) {
            stopPlayer();
        } else {
            setIsPlaying(true);
            startProgress();
        }
    };

    const saveProgress = async () => {
        if (!track || !bookId) return;
        try {
            const progressPercent = Math.round((currentTime / duration) * 100);
            await playerService.updateProgress(bookId, progressPercent, 'book');
        } catch (error) {
            console.error('Failed to save progress', error);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#f2d00d" />
            </View>
        );
    }

    if (!track) return null;

    return (
        <View style={styles.container}>
            {/* En-tête */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <MaterialIcons name="keyboard-arrow-down" size={32} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>EN LECTURE</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <MaterialIcons name="more-horiz" size={32} color="white" />
                </TouchableOpacity>
            </View>

            {/* Couverture */}
            <View style={styles.coverWrapper}>
                <Image
                    source={{ uri: track.cover_image_url || track.imageUrl }}
                    style={styles.coverImage}
                    resizeMode="cover"
                />
                <View style={styles.coverGlow} />
            </View>

            {/* Infos */}
            <View style={styles.infoSection}>
                <View style={styles.infoText}>
                    <Text style={styles.trackTitle}>{track.title}</Text>
                    <Text style={styles.trackSeries}>{track.author}</Text>
                </View>
                <TouchableOpacity style={styles.heartButton}>
                    <MaterialIcons name="favorite-border" size={28} color="rgba(255,255,255,0.8)" />
                </TouchableOpacity>
            </View>

            {/* Progression */}
            <View style={styles.progressSection}>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${(currentTime / duration) * 100}%` }]} />
                    <View style={[styles.progressKnob, { left: `${(currentTime / duration) * 100}%` }]} />
                </View>
                <View style={styles.timeRow}>
                    <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                    <Text style={styles.timeText}>-{formatTime(duration - currentTime)}</Text>
                </View>
            </View>

            {/* Contrôles */}
            <View style={styles.controls}>
                <TouchableOpacity style={styles.controlButton}>
                    <MaterialIcons name="replay-5" size={28} color="rgba(255,255,255,0.7)" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                    <MaterialIcons name="skip-previous" size={40} color="rgba(255,255,255,0.8)" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
                    <MaterialIcons name={isPlaying ? "pause" : "play-arrow"} size={40} color="#1a0f00" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                    <MaterialIcons name="skip-next" size={40} color="rgba(255,255,255,0.8)" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                    <MaterialIcons name="forward-30" size={28} color="rgba(255,255,255,0.7)" />
                </TouchableOpacity>
            </View>

            {/* Actions du bas */}
            <View style={styles.bottomActions}>
                <TouchableOpacity style={styles.speedButton}>
                    <MaterialIcons name="speed" size={20} color="white" />
                    <Text style={styles.speedText}>1.0x</Text>
                </TouchableOpacity>
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.actionButton}>
                        <MaterialIcons name="file-download" size={24} color="rgba(255,255,255,0.7)" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <MaterialIcons name="share" size={24} color="rgba(255,255,255,0.7)" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <MaterialIcons name="playlist-add" size={24} color="rgba(255,255,255,0.7)" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b2106', // Fond légèrement différent pour le player
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 50,
    },
    headerButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    coverWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.5,
        shadowRadius: 30,
        elevation: 20,
        position: 'relative',
    },
    coverImage: {
        width: 300,
        height: 300,
        borderRadius: 20,
    },
    coverGlow: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        bottom: -20,
        borderRadius: 30,
        backgroundColor: 'rgba(242, 208, 13, 0.2)',
        zIndex: -1,
        transform: [{ scale: 0.9 }],
    },
    infoSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 32,
        marginBottom: 32,
    },
    infoText: {
        flex: 1,
        marginRight: 16,
    },
    trackTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    trackSeries: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16,
    },
    heartButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressSection: {
        paddingHorizontal: 32,
        marginBottom: 40,
    },
    progressBar: {
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 2,
        marginBottom: 12,
        position: 'relative',
    },
    progressFill: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#f2d00d',
        borderRadius: 2,
    },
    progressKnob: {
        position: 'absolute',
        top: -6,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
        fontVariant: ['tabular-nums'],
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        marginBottom: 40,
    },
    controlButton: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    playButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f2d00d',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#f2d00d',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    },
    bottomActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    speedButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    speedText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 6,
    },
    actionButtons: {
        flexDirection: 'row',
    },
    actionButton: {
        marginLeft: 24,
    },
});
