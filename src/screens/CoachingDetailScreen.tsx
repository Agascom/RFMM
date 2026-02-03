import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { coachingService } from '../services/api';
import { CoachingProgram, CoachingLesson } from '../types/api';

export default function CoachingDetailScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { programId } = route.params || {};

    const [program, setProgram] = useState<CoachingProgram | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (programId) {
            loadProgram();
        } else {
            setLoading(false);
        }
    }, [programId]);

    const loadProgram = async () => {
        try {
            setLoading(true);
            const response = await coachingService.getProgram(programId);
            if (response.success) {
                setProgram(response.data);
            }
        } catch (error) {
            console.error('Erreur chargement programme:', error);
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

    if (!program) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={{ color: 'white' }}>Programme non trouvé</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                    <Text style={{ color: '#f2d00d' }}>Retour</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Mock progress pour l'instant car l'API publique retourne le catalogue
    const progress = 0;
    const completedLessons = 0;

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header avec image */}
                <ImageBackground
                    source={{ uri: program.cover_image_url }}
                    style={styles.headerImage}
                >
                    <View style={styles.headerOverlay} />

                    {/* Navigation */}
                    <View style={styles.headerNav}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navButton}>
                            <MaterialIcons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navButton}>
                            <MaterialIcons name="more-vert" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Badge coaching */}
                    <View style={styles.coachingBadge}>
                        <MaterialIcons name="school" size={16} color="#f2d00d" />
                        <Text style={styles.coachingBadgeText}>PROGRAMME COACHING</Text>
                    </View>

                    {/* Titre */}
                    <View style={styles.headerContent}>
                        <Text style={styles.headerCategory}>{program.category?.name}</Text>
                        <Text style={styles.headerTitle}>{program.title}</Text>
                        {program.subtitle && <Text style={styles.headerSubtitle}>{program.subtitle}</Text>}
                        <Text style={styles.headerInstructor}>par {program.instructor}</Text>
                    </View>
                </ImageBackground>

                {/* Progression (visible seulement si commencé, ici mocké à 0 donc on affiche invite) */}
                <View style={styles.progressSection}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressLabel}>Votre Progression</Text>
                        <Text style={styles.progressPercent}>{progress}%</Text>
                    </View>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${progress}%` }]} />
                    </View>
                    <View style={styles.progressStats}>
                        <View style={styles.progressStat}>
                            <MaterialIcons name="check-circle" size={18} color="#f2d00d" />
                            <Text style={styles.progressStatText}>{completedLessons}/{program.total_lessons} leçons</Text>
                        </View>
                        <View style={styles.progressStat}>
                            <MaterialIcons name="access-time" size={18} color="rgba(255,255,255,0.5)" />
                            <Text style={styles.progressStatText}>{program.duration}</Text>
                        </View>
                    </View>
                </View>

                {/* Description */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>À propos du programme</Text>
                    <Text style={styles.descriptionText}>{program.description}</Text>
                </View>

                {/* Leçons */}
                {program.lessons && program.lessons.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Contenu du Programme</Text>
                        <View style={styles.lessonsList}>
                            {program.lessons.map((lesson, index) => (
                                <TouchableOpacity
                                    key={lesson.id}
                                    style={styles.lessonItem}
                                    activeOpacity={0.7}
                                >
                                    {/* Indicateur de statut */}
                                    <View style={styles.lessonStatus}>
                                        <Text style={styles.lessonNumber}>{index + 1}</Text>
                                    </View>

                                    {/* Info de la leçon */}
                                    <View style={styles.lessonInfo}>
                                        <Text style={styles.lessonTitle}>{lesson.title}</Text>
                                        <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                                    </View>

                                    {/* Action */}
                                    <MaterialIcons
                                        name={lesson.is_free_preview ? "play-circle" : "lock"}
                                        size={20}
                                        color={lesson.is_free_preview ? "#f2d00d" : "rgba(255,255,255,0.3)"}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => navigation.navigate('Player')}
                >
                    <MaterialIcons name="play-arrow" size={24} color="#221f10" />
                    <Text style={styles.continueButtonText}>Commencer</Text>
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
    headerImage: {
        height: 320,
        justifyContent: 'flex-end',
    },
    headerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
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
    coachingBadge: {
        position: 'absolute',
        top: 100,
        left: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(242, 208, 13, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    coachingBadgeText: {
        color: '#f2d00d',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginLeft: 6,
    },
    headerContent: {
        padding: 16,
        paddingBottom: 24,
    },
    headerCategory: {
        color: '#f2d00d',
        fontSize: 14,
        fontWeight: 'bold',
    },
    headerTitle: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 4,
    },
    headerSubtitle: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 18,
        marginTop: 2,
    },
    headerInstructor: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        marginTop: 8,
    },
    progressSection: {
        margin: 16,
        padding: 20,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    progressLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    progressPercent: {
        color: '#f2d00d',
        fontSize: 20,
        fontWeight: 'bold',
    },
    progressBar: {
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#f2d00d',
        borderRadius: 4,
    },
    progressStats: {
        flexDirection: 'row',
        marginTop: 16,
    },
    progressStat: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 24,
    },
    progressStatText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        marginLeft: 6,
    },
    section: {
        paddingHorizontal: 16,
        marginTop: 24,
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
    lessonsList: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    lessonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    lessonStatus: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lessonNumber: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
        fontWeight: 'bold',
    },
    lessonInfo: {
        flex: 1,
        marginLeft: 12,
    },
    lessonTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
    },
    lessonDuration: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
        marginTop: 2,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        paddingBottom: 32,
        backgroundColor: 'rgba(34, 31, 16, 0.98)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    continueButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2d00d',
        paddingVertical: 18,
        borderRadius: 30,
    },
    continueButtonText: {
        color: '#221f10',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});
