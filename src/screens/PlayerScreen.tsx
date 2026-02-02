import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const track = {
    title: 'Le Chemin de la Grâce',
    seriesTitle: 'Comprendre la Foi',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk_P96jDVIlRGcwtDeWuAOwJYUlNH5eP85VmkDZov9NnDTzvtwBRFXQmG8KeR0mClBTAWUfwczdA1W4rrfs_or3v9W2n-IiSuJx6nPQg95hioWEB88fl_yRU97BJcsWFJzc4m65MA4ctYs-6BqT-0l19OLx2mNlmbOA2bnreEo5wqNMgEwZXZ6Va_8wIb3Bes3knDAjwe-OwgMl_-W0W4jniFlJR7GHTPlzD44Viys6aYOkjMfBqMpgar9SJyZcTUe0MAptwpC2ujF',
};

export default function PlayerScreen() {
    const navigation = useNavigation();

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
                <Image source={{ uri: track.imageUrl }} style={styles.coverImage} resizeMode="cover" />
                <View style={styles.coverGlow} />
            </View>

            {/* Infos */}
            <View style={styles.infoSection}>
                <View style={styles.infoText}>
                    <Text style={styles.trackTitle}>{track.title}</Text>
                    <Text style={styles.trackSeries}>{track.seriesTitle}</Text>
                </View>
                <TouchableOpacity style={styles.heartButton}>
                    <MaterialIcons name="favorite-border" size={28} color="rgba(255,255,255,0.8)" />
                </TouchableOpacity>
            </View>

            {/* Progression */}
            <View style={styles.progressSection}>
                <View style={styles.progressBar}>
                    <View style={styles.progressFill} />
                    <View style={styles.progressKnob} />
                </View>
                <View style={styles.timeRow}>
                    <Text style={styles.timeText}>12:45</Text>
                    <Text style={styles.timeText}>-25:35</Text>
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
                <TouchableOpacity style={styles.playButton}>
                    <MaterialIcons name="pause" size={40} color="#1a0f00" />
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
                    <Text style={styles.speedText}>1.2x</Text>
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
        backgroundColor: '#1a0f00',
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 48,
        paddingBottom: 16,
    },
    headerButton: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 2,
    },
    coverWrapper: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#333',
        marginVertical: 16,
        shadowColor: '#f2d00d',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 24,
        elevation: 10,
    },
    coverImage: {
        width: '100%',
        height: '100%',
    },
    coverGlow: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: 'transparent',
    },
    infoSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 16,
    },
    infoText: {
        flex: 1,
    },
    trackTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    trackSeries: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16,
        marginTop: 4,
    },
    heartButton: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressSection: {
        marginTop: 8,
    },
    progressBar: {
        width: '100%',
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 3,
        position: 'relative',
    },
    progressFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '35%',
        height: '100%',
        backgroundColor: '#f2d00d',
        borderRadius: 3,
    },
    progressKnob: {
        position: 'absolute',
        top: -5,
        left: '35%',
        marginLeft: -8,
        width: 16,
        height: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    timeText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 12,
        fontWeight: '500',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
    },
    controlButton: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    playButton: {
        width: 80,
        height: 80,
        backgroundColor: '#f2d00d',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
        shadowColor: '#f2d00d',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    bottomActions: {
        marginTop: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    speedButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    speedText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    actionButtons: {
        flexDirection: 'row',
    },
    actionButton: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
