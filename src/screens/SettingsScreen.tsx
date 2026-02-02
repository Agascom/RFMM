import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Switch,
    StyleSheet,
    Modal,
    Pressable
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type ModalOption = {
    label: string;
    value?: string;
    selected?: boolean;
};

type ModalConfig = {
    visible: boolean;
    title: string;
    message?: string;
    options?: ModalOption[];
    type: 'info' | 'select' | 'confirm';
    onSelect?: (value: string) => void;
    onConfirm?: () => void;
};

export default function SettingsScreen() {
    const navigation = useNavigation<any>();
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [autoPlay, setAutoPlay] = useState(true);
    const [downloadWifi, setDownloadWifi] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState('Français');
    const [selectedSpeed, setSelectedSpeed] = useState('1.0x');

    const [modal, setModal] = useState<ModalConfig>({
        visible: false,
        title: '',
        type: 'info'
    });

    const closeModal = () => setModal({ ...modal, visible: false });

    const showInfoModal = (title: string, message: string) => {
        setModal({
            visible: true,
            title,
            message,
            type: 'info'
        });
    };

    const showSelectModal = (title: string, options: ModalOption[], onSelect: (value: string) => void) => {
        setModal({
            visible: true,
            title,
            options,
            type: 'select',
            onSelect
        });
    };

    const handlePersonalInfo = () => {
        showInfoModal(
            'Informations personnelles',
            '👤 Nom: Daniel Kouassi\n📧 Email: daniel.k@email.com\n📱 Téléphone: +225 07 00 00 00\n\nLa modification du profil sera bientôt disponible.'
        );
    };

    const handleSecurity = () => {
        showInfoModal(
            'Mot de passe et sécurité',
            '🔐 Options de sécurité:\n\n• Changer le mot de passe\n• Authentification à 2 facteurs\n• Gérer les appareils connectés\n• Historique des connexions\n\nCes fonctionnalités seront bientôt disponibles.'
        );
    };

    const handlePayment = () => {
        showInfoModal(
            'Moyens de paiement',
            '💳 Vos moyens de paiement:\n\n• Airtel Money: ****45\n• Moov Money: ****12\n\n✨ Ajouter un nouveau moyen de paiement bientôt disponible.'
        );
    };

    const handleLanguage = () => {
        showSelectModal(
            'Choisir la langue',
            [
                { label: 'Français', value: 'fr', selected: selectedLanguage === 'Français' },
                { label: 'English', value: 'en', selected: selectedLanguage === 'English' },
            ],
            (value) => {
                setSelectedLanguage(value === 'fr' ? 'Français' : 'English');
                closeModal();
            }
        );
    };

    const handleSpeed = () => {
        showSelectModal(
            'Vitesse de lecture',
            [
                { label: '0.5x - Très lent', value: '0.5x', selected: selectedSpeed === '0.5x' },
                { label: '0.75x - Lent', value: '0.75x', selected: selectedSpeed === '0.75x' },
                { label: '1.0x - Normal', value: '1.0x', selected: selectedSpeed === '1.0x' },
                { label: '1.25x - Rapide', value: '1.25x', selected: selectedSpeed === '1.25x' },
                { label: '1.5x - Très rapide', value: '1.5x', selected: selectedSpeed === '1.5x' },
                { label: '2.0x - Ultra rapide', value: '2.0x', selected: selectedSpeed === '2.0x' },
            ],
            (value) => {
                setSelectedSpeed(value);
                closeModal();
            }
        );
    };

    const handleSleepTimer = () => {
        showSelectModal(
            'Minuterie de sommeil',
            [
                { label: '15 minutes', value: '15' },
                { label: '30 minutes', value: '30' },
                { label: '45 minutes', value: '45' },
                { label: '1 heure', value: '60' },
                { label: 'Fin du chapitre', value: 'chapter' },
                { label: 'Désactivé', value: 'off' },
            ],
            (value) => {
                showInfoModal('Minuterie activée', `⏰ La lecture s'arrêtera automatiquement.`);
            }
        );
    };

    const handleAbout = () => {
        showInfoModal(
            'À propos de RFMM',
            '✨ RFMM - Romains 2:7\n\nVotre compagnon spirituel au quotidien.\n\n📖 Mission:\nApporter la Parole de Dieu à travers des enseignements audio, des e-books et des programmes de coaching personnalisés.\n\n📱 Version: 1.0.0\n© 2024 RFMM Ministries'
        );
    };

    const handleTerms = () => {
        showInfoModal(
            'Conditions d\'utilisation',
            '📜 En utilisant RFMM, vous acceptez:\n\n✓ Utiliser l\'application conformément à nos directives\n✓ Respecter les droits d\'auteur du contenu\n✓ Ne pas partager votre compte\n✓ Signaler tout contenu inapproprié\n\n🔗 Conditions complètes sur rfmm.com/terms'
        );
    };

    const handlePrivacy = () => {
        showInfoModal(
            'Politique de confidentialité',
            '🔒 Nous protégeons vos données:\n\n✓ Vos informations sont cryptées\n✓ Nous ne vendons pas vos données\n✓ Vous pouvez demander la suppression\n✓ Contrôle total sur vos préférences\n\n🔗 Politique complète sur rfmm.com/privacy'
        );
    };

    const handleRate = () => {
        showInfoModal(
            'Noter l\'application',
            '⭐ Vous appréciez RFMM?\n\nVotre avis compte énormément pour nous!\n\nMerci de nous laisser 5 étoiles sur le Play Store pour aider d\'autres personnes à découvrir l\'application.\n\n❤️ Merci pour votre soutien!'
        );
    };

    const handleSupport = () => {
        showInfoModal(
            'Contacter le support',
            '🎧 Besoin d\'aide?\n\n📧 Email: support@rfmm.com\n📞 Téléphone: +225 07 00 00 00\n💬 WhatsApp: +225 07 00 00 00\n\n🕐 Heures d\'ouverture:\nLun-Ven: 8h-18h\nSam: 9h-14h'
        );
    };

    const settingsSections = [
        {
            title: 'Compte',
            items: [
                { icon: 'person', label: 'Informations personnelles', hasArrow: true, onPress: handlePersonalInfo },
                { icon: 'lock', label: 'Mot de passe et sécurité', hasArrow: true, onPress: handleSecurity },
                { icon: 'payment', label: 'Moyens de paiement', hasArrow: true, onPress: handlePayment },
            ]
        },
        {
            title: 'Préférences',
            items: [
                { icon: 'notifications', label: 'Notifications', hasSwitch: true, value: notifications, onToggle: setNotifications },
                { icon: 'dark-mode', label: 'Mode sombre', hasSwitch: true, value: darkMode, onToggle: setDarkMode },
                { icon: 'language', label: 'Langue', displayValue: selectedLanguage, hasArrow: true, onPress: handleLanguage },
            ]
        },
        {
            title: 'Lecture',
            items: [
                { icon: 'play-circle-outline', label: 'Lecture automatique', hasSwitch: true, value: autoPlay, onToggle: setAutoPlay },
                { icon: 'wifi', label: 'Téléchargement WiFi uniquement', hasSwitch: true, value: downloadWifi, onToggle: setDownloadWifi },
                { icon: 'speed', label: 'Vitesse par défaut', displayValue: selectedSpeed, hasArrow: true, onPress: handleSpeed },
                { icon: 'timer', label: 'Minuterie de sommeil', hasArrow: true, onPress: handleSleepTimer },
            ]
        },
        {
            title: 'À propos',
            items: [
                { icon: 'info', label: 'À propos de RFMM', hasArrow: true, onPress: handleAbout },
                { icon: 'article', label: 'Conditions d\'utilisation', hasArrow: true, onPress: handleTerms },
                { icon: 'privacy-tip', label: 'Politique de confidentialité', hasArrow: true, onPress: handlePrivacy },
                { icon: 'star-rate', label: 'Noter l\'application', hasArrow: true, onPress: handleRate },
            ]
        }
    ];

    return (
        <View style={styles.container}>
            {/* Modal personnalisée */}
            <Modal
                visible={modal.visible}
                transparent
                animationType="fade"
                onRequestClose={closeModal}
            >
                <Pressable style={styles.modalOverlay} onPress={closeModal}>
                    <Pressable style={styles.modalContent} onPress={e => e.stopPropagation()}>
                        {/* Header du modal */}
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{modal.title}</Text>
                            <TouchableOpacity onPress={closeModal} style={styles.modalCloseButton}>
                                <MaterialIcons name="close" size={24} color="rgba(255,255,255,0.6)" />
                            </TouchableOpacity>
                        </View>

                        {/* Contenu du modal */}
                        {modal.type === 'info' && modal.message && (
                            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                                <Text style={styles.modalMessage}>{modal.message}</Text>
                            </ScrollView>
                        )}

                        {modal.type === 'select' && modal.options && (
                            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                                {modal.options.map((option, index) => (
                                    <TouchableOpacity
                                        key={option.value || index}
                                        style={[
                                            styles.modalOption,
                                            option.selected && styles.modalOptionSelected
                                        ]}
                                        onPress={() => modal.onSelect?.(option.value || '')}
                                    >
                                        <Text style={[
                                            styles.modalOptionText,
                                            option.selected && styles.modalOptionTextSelected
                                        ]}>
                                            {option.label}
                                        </Text>
                                        {option.selected && (
                                            <MaterialIcons name="check" size={20} color="#f2d00d" />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        )}

                        {/* Footer du modal */}
                        <View style={styles.modalFooter}>
                            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                                <Text style={styles.modalButtonText}>Fermer</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>

            {/* En-tête */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Paramètres</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                {settingsSections.map((section) => (
                    <View key={section.title} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title.toUpperCase()}</Text>
                        <View style={styles.sectionContent}>
                            {section.items.map((item, index) => (
                                <TouchableOpacity
                                    key={item.label}
                                    style={[styles.settingItem, index > 0 && styles.settingItemBorder]}
                                    activeOpacity={item.hasSwitch ? 1 : 0.7}
                                    onPress={item.onPress}
                                    disabled={item.hasSwitch}
                                >
                                    <View style={styles.settingIcon}>
                                        <MaterialIcons name={item.icon as any} size={22} color="#f2d00d" />
                                    </View>
                                    <View style={styles.settingInfo}>
                                        <Text style={styles.settingLabel}>{item.label}</Text>
                                        {item.displayValue && !item.hasSwitch && (
                                            <Text style={styles.settingValue}>{item.displayValue}</Text>
                                        )}
                                    </View>
                                    {item.hasSwitch ? (
                                        <Switch
                                            value={item.value}
                                            onValueChange={item.onToggle}
                                            trackColor={{ false: 'rgba(255,255,255,0.2)', true: 'rgba(242, 208, 13, 0.5)' }}
                                            thumbColor={item.value ? '#f2d00d' : '#fff'}
                                        />
                                    ) : item.hasArrow ? (
                                        <MaterialIcons name="chevron-right" size={24} color="rgba(255,255,255,0.3)" />
                                    ) : null}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

                {/* Bouton de support */}
                <TouchableOpacity style={styles.supportButton} onPress={handleSupport}>
                    <MaterialIcons name="headset-mic" size={20} color="#f2d00d" />
                    <Text style={styles.supportButtonText}>Contacter le support</Text>
                </TouchableOpacity>

                {/* Version */}
                <Text style={styles.versionText}>Version 1.0.0 (Build 100)</Text>
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
    scrollView: {
        flex: 1,
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: 1,
        marginBottom: 12,
    },
    sectionContent: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        overflow: 'hidden',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    settingItemBorder: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
    },
    settingIcon: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: 'rgba(242, 208, 13, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingInfo: {
        flex: 1,
        marginLeft: 12,
    },
    settingLabel: {
        fontSize: 15,
        color: 'white',
        fontWeight: '500',
    },
    settingValue: {
        fontSize: 13,
        color: '#f2d00d',
        marginTop: 2,
    },
    supportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
        marginTop: 32,
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: 'rgba(242, 208, 13, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(242, 208, 13, 0.2)',
    },
    supportButtonText: {
        color: '#f2d00d',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    versionText: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.3)',
        textAlign: 'center',
        marginTop: 24,
        marginBottom: 16,
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    modalContent: {
        width: '100%',
        maxHeight: '80%',
        backgroundColor: '#2a2714',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(242, 208, 13, 0.2)',
        overflow: 'hidden',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f2d00d',
        flex: 1,
    },
    modalCloseButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBody: {
        padding: 20,
        maxHeight: 400,
    },
    modalMessage: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 24,
    },
    modalOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    modalOptionSelected: {
        backgroundColor: 'rgba(242, 208, 13, 0.15)',
        borderColor: '#f2d00d',
    },
    modalOptionText: {
        fontSize: 15,
        color: 'white',
        fontWeight: '500',
    },
    modalOptionTextSelected: {
        color: '#f2d00d',
    },
    modalFooter: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    modalButton: {
        backgroundColor: '#f2d00d',
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#221f10',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
