import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    ImageBackground
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const coachingData = {
    id: '1',
    title: 'Maîtrise Mentale',
    subtitle: 'Gérer l\'Incertitude',
    instructor: 'Pasteur Francis',
    progress: 65,
    totalLessons: 12,
    completedLessons: 8,
    totalDuration: '4h 30min',
    description: 'Apprenez à naviguer dans les moments d\'incertitude avec foi et confiance. Ce programme de coaching vous guidera à travers des techniques pratiques pour renforcer votre mental et maintenir votre paix intérieure.',
    lessons: [
        { id: '1', title: 'Introduction au Programme', duration: '12 min', completed: true },
        { id: '2', title: 'Comprendre l\'Incertitude', duration: '18 min', completed: true },
        { id: '3', title: 'Les Piliers de la Foi', duration: '22 min', completed: true },
        { id: '4', title: 'Exercices de Méditation', duration: '25 min', completed: true },
        { id: '5', title: 'Surmonter la Peur', duration: '20 min', completed: true },
        { id: '6', title: 'Affirmer sa Confiance', duration: '18 min', completed: true },
        { id: '7', title: 'La Prière comme Ancrage', duration: '28 min', completed: true },
        { id: '8', title: 'Témoignages Inspirants', duration: '15 min', completed: true },
        { id: '9', title: 'Plan d\'Action Personnel', duration: '22 min', completed: false, current: true },
        { id: '10', title: 'Maintenir le Cap', duration: '20 min', completed: false },
        { id: '11', title: 'Communauté de Soutien', duration: '16 min', completed: false },
        { id: '12', title: 'Conclusion et Prochaines Étapes', duration: '14 min', completed: false },
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhSOu10N9ERlhJYg2HQKt_D8a0fMnP9bFVBJV7TtAviK99OGvZAQcYIP0cZVR-7HrN_Ju0wvN0cmISOOV0w_d-TqdqZWuaR3mpxZGDrm5aRFJT6QEtjhHFB0w4u8Rv_EajIb3mSscBKDdtSxvlfFfpkcOnyRvTQ5Aul8wbSQFAzMiv-ARedBTOINs6a47NE3aoIoeVAuxELXz-SGjN-OaXHO2ZtZxh_ZQy2uivotWDF5ZikVCHjnB_yOIwI39jYxeOxouJbcUnyIhL',
};

export default function CoachingDetailScreen() {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header avec image */}
                <ImageBackground
                    source={{ uri: coachingData.imageUrl }}
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
                        <Text style={styles.headerCategory}>{coachingData.title}</Text>
                        <Text style={styles.headerTitle}>{coachingData.subtitle}</Text>
                        <Text style={styles.headerInstructor}>par {coachingData.instructor}</Text>
                    </View>
                </ImageBackground>

                {/* Progression */}
                <View style={styles.progressSection}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressLabel}>Votre Progression</Text>
                        <Text style={styles.progressPercent}>{coachingData.progress}%</Text>
                    </View>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${coachingData.progress}%` }]} />
                    </View>
                    <View style={styles.progressStats}>
                        <View style={styles.progressStat}>
                            <MaterialIcons name="check-circle" size={18} color="#f2d00d" />
                            <Text style={styles.progressStatText}>{coachingData.completedLessons}/{coachingData.totalLessons} leçons</Text>
                        </View>
                        <View style={styles.progressStat}>
                            <MaterialIcons name="access-time" size={18} color="rgba(255,255,255,0.5)" />
                            <Text style={styles.progressStatText}>{coachingData.totalDuration}</Text>
                        </View>
                    </View>
                </View>

                {/* Description */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>À propos du programme</Text>
                    <Text style={styles.descriptionText}>{coachingData.description}</Text>
                </View>

                {/* Leçons */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contenu du Programme</Text>
                    <View style={styles.lessonsList}>
                        {coachingData.lessons.map((lesson, index) => (
                            <TouchableOpacity
                                key={lesson.id}
                                style={[
                                    styles.lessonItem,
                                    lesson.current && styles.lessonItemCurrent
                                ]}
                                activeOpacity={0.7}
                            >
                                {/* Indicateur de statut */}
                                <View style={[
                                    styles.lessonStatus,
                                    lesson.completed && styles.lessonStatusCompleted,
                                    lesson.current && styles.lessonStatusCurrent
                                ]}>
                                    {lesson.completed ? (
                                        <MaterialIcons name="check" size={16} color="#221f10" />
                                    ) : lesson.current ? (
                                        <MaterialIcons name="play-arrow" size={16} color="#221f10" />
                                    ) : (
                                        <Text style={styles.lessonNumber}>{index + 1}</Text>
                                    )}
                                </View>

                                {/* Info de la leçon */}
                                <View style={styles.lessonInfo}>
                                    <Text style={[
                                        styles.lessonTitle,
                                        lesson.completed && styles.lessonTitleCompleted
                                    ]}>
                                        {lesson.title}
                                    </Text>
                                    <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                                </View>

                                {/* Action */}
                                {lesson.current ? (
                                    <View style={styles.continueTag}>
                                        <Text style={styles.continueTagText}>CONTINUER</Text>
                                    </View>
                                ) : !lesson.completed ? (
                                    <MaterialIcons name="lock" size={20} color="rgba(255,255,255,0.3)" />
                                ) : null}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => navigation.navigate('Player')}
                >
                    <MaterialIcons name="play-arrow" size={24} color="#221f10" />
                    <Text style={styles.continueButtonText}>Continuer la Leçon 9</Text>
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
    lessonItemCurrent: {
        backgroundColor: 'rgba(242, 208, 13, 0.1)',
    },
    lessonStatus: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lessonStatusCompleted: {
        backgroundColor: '#f2d00d',
    },
    lessonStatusCurrent: {
        backgroundColor: '#f2d00d',
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
    lessonTitleCompleted: {
        color: 'rgba(255,255,255,0.5)',
    },
    lessonDuration: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
        marginTop: 2,
    },
    continueTag: {
        backgroundColor: '#f2d00d',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    continueTagText: {
        color: '#221f10',
        fontSize: 10,
        fontWeight: 'bold',
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
