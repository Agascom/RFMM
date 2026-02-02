import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Pressable,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function EditProfileScreen() {
    const navigation = useNavigation<any>();

    const [name, setName] = useState('Daniel Kouassi');
    const [email, setEmail] = useState('daniel.k@email.com');
    const [phone, setPhone] = useState('+225 07 00 00 00');
    const [bio, setBio] = useState('Passionné par la Parole de Dieu et le développement personnel.');

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuDIAWhjEs9kf5ijzyZiuwXASXSFOwjxLkFIWWyRq44JP5TewkzTyv6_8MVudSGlRrpkQpZSMY-wNpWr5URxnA8y9hBUpuVph4nyf1iwI5Ky5nLOyg2Pt2VG7IvosgJqGqlvfRTMjYfvt6gFBTlK6o_wMvi1eldqwVBWRtRfo1n9aNh1yCMdmO4N3odRoJJj0OwCc6rAMx_XmB8RewRlnlrXu07iOqDbF4fSF9hMc8_qoVw9zlKFOBmzrUUdQPoeOu1j2nOXnTbrJutk');

    const handleSave = () => {
        // Simuler la sauvegarde
        setShowSuccessModal(true);
    };

    const handleChangePhoto = () => {
        // TODO: Implémenter la sélection de photo
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/* Modal de succès */}
            <Modal
                visible={showSuccessModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowSuccessModal(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => {
                        setShowSuccessModal(false);
                        navigation.goBack();
                    }}
                >
                    <View style={styles.successModal}>
                        <View style={styles.successIconWrapper}>
                            <MaterialIcons name="check-circle" size={64} color="#f2d00d" />
                        </View>
                        <Text style={styles.successTitle}>Profil mis à jour !</Text>
                        <Text style={styles.successMessage}>
                            Vos modifications ont été enregistrées avec succès.
                        </Text>
                        <TouchableOpacity
                            style={styles.successButton}
                            onPress={() => {
                                setShowSuccessModal(false);
                                navigation.goBack();
                            }}
                        >
                            <Text style={styles.successButtonText}>Continuer</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>

            {/* En-tête */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="close" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Modifier le profil</Text>
                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Enregistrer</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Photo de profil */}
                <View style={styles.avatarSection}>
                    <TouchableOpacity style={styles.avatarWrapper} onPress={handleChangePhoto}>
                        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                        <View style={styles.cameraButton}>
                            <MaterialIcons name="camera-alt" size={20} color="white" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleChangePhoto}>
                        <Text style={styles.changePhotoText}>Changer la photo</Text>
                    </TouchableOpacity>
                </View>

                {/* Formulaire */}
                <View style={styles.form}>
                    {/* Nom complet */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Nom complet</Text>
                        <View style={styles.inputWrapper}>
                            <MaterialIcons name="person" size={20} color="rgba(255,255,255,0.4)" />
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                placeholder="Votre nom complet"
                                placeholderTextColor="rgba(255,255,255,0.3)"
                            />
                        </View>
                    </View>

                    {/* Email */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Adresse email</Text>
                        <View style={styles.inputWrapper}>
                            <MaterialIcons name="email" size={20} color="rgba(255,255,255,0.4)" />
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="votre@email.com"
                                placeholderTextColor="rgba(255,255,255,0.3)"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* Téléphone */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Numéro de téléphone</Text>
                        <View style={styles.inputWrapper}>
                            <MaterialIcons name="phone" size={20} color="rgba(255,255,255,0.4)" />
                            <TextInput
                                style={styles.input}
                                value={phone}
                                onChangeText={setPhone}
                                placeholder="+225 00 00 00 00"
                                placeholderTextColor="rgba(255,255,255,0.3)"
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>

                    {/* Bio */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>À propos de moi</Text>
                        <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                value={bio}
                                onChangeText={setBio}
                                placeholder="Parlez-nous de vous..."
                                placeholderTextColor="rgba(255,255,255,0.3)"
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                            />
                        </View>
                        <Text style={styles.charCount}>{bio.length}/200</Text>
                    </View>
                </View>

                {/* Actions supplémentaires */}
                <View style={styles.additionalActions}>
                    <TouchableOpacity style={styles.actionButton}>
                        <MaterialIcons name="link" size={20} color="#f2d00d" />
                        <Text style={styles.actionButtonText}>Lier un compte social</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <MaterialIcons name="verified" size={20} color="#f2d00d" />
                        <Text style={styles.actionButtonText}>Vérifier mon email</Text>
                    </TouchableOpacity>
                </View>

                {/* Bouton Enregistrer */}
                <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
                    <Text style={styles.primaryButtonText}>Enregistrer les modifications</Text>
                </TouchableOpacity>

                {/* Supprimer le compte */}
                <TouchableOpacity style={styles.dangerButton}>
                    <MaterialIcons name="delete-outline" size={20} color="#ff6b6b" />
                    <Text style={styles.dangerButtonText}>Supprimer mon compte</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
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
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    saveButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    saveButtonText: {
        color: '#f2d00d',
        fontSize: 15,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    avatarSection: {
        alignItems: 'center',
        paddingVertical: 32,
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#f2d00d',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f2d00d',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#221f10',
    },
    changePhotoText: {
        color: '#f2d00d',
        fontSize: 15,
        fontWeight: '600',
        marginTop: 12,
    },
    form: {
        paddingHorizontal: 16,
    },
    inputGroup: {
        marginBottom: 24,
    },
    inputLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    textAreaWrapper: {
        height: 120,
        alignItems: 'flex-start',
        paddingVertical: 12,
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        marginLeft: 12,
    },
    textArea: {
        height: 96,
        marginLeft: 0,
        textAlignVertical: 'top',
    },
    charCount: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
        textAlign: 'right',
        marginTop: 4,
    },
    additionalActions: {
        paddingHorizontal: 16,
        marginTop: 16,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    actionButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
        marginLeft: 12,
    },
    primaryButton: {
        backgroundColor: '#f2d00d',
        marginHorizontal: 16,
        marginTop: 32,
        paddingVertical: 16,
        borderRadius: 28,
        alignItems: 'center',
        shadowColor: '#f2d00d',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    primaryButtonText: {
        color: '#221f10',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dangerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
        marginTop: 24,
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 107, 107, 0.2)',
    },
    dangerButtonText: {
        color: '#ff6b6b',
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 8,
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    successModal: {
        width: '100%',
        backgroundColor: '#2a2714',
        borderRadius: 24,
        padding: 32,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(242, 208, 13, 0.3)',
    },
    successIconWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(242, 208, 13, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    successTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    successMessage: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 24,
    },
    successButton: {
        backgroundColor: '#f2d00d',
        paddingVertical: 14,
        paddingHorizontal: 48,
        borderRadius: 25,
    },
    successButtonText: {
        color: '#221f10',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
