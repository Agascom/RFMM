import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const product = {
    title: 'Marcher dans la Foi',
    type: 'E-book par Pasteur Francis',
    price: 5000,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC65_rrcQgI7Gg6AFnG2ElqYdwOVh0f5oNsF1AJN41YiG0mqXmO8VPWwV5uz1IUuqHXItOiFyfNFuZW1N8k6IWXSIhvRYKANNpVjeYTOJl5WkHmIdOg1WoJrs59x1CncjT-UQMC5iH89RupyrYRiCKDvxSp6xOh9myp82edUdn1peA-QDdCTTUmUxURjoniO_5G3y9pxL-w2qyRQ-tUMkGeYJNNaRpEjNVrPeHl57Y3WBr_BNPXkJJIcWZbiPoqdOB3oGgUW5p9OcEe',
};

const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR') + ' FCFA';
};

export default function CheckoutScreen() {
    const navigation = useNavigation();
    const [selectedMethod, setSelectedMethod] = useState<'airtel' | 'moov' | 'card'>('airtel');

    return (
        <View style={styles.container}>
            {/* En-tête */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back-ios" size={20} color="rgba(255,255,255,0.6)" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Paiement</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Résumé de commande */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Résumé de la Commande</Text>
                </View>
                <View style={styles.orderCard}>
                    <View style={styles.orderCardInner}>
                        <View style={styles.orderInfo}>
                            <Text style={styles.orderLabel}>ACHAT</Text>
                            <Text style={styles.orderTitle}>{product.title}</Text>
                            <Text style={styles.orderType}>{product.type}</Text>
                            <View style={styles.priceTag}>
                                <Text style={styles.priceText}>{formatPrice(product.price)}</Text>
                            </View>
                        </View>
                        <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
                    </View>
                </View>

                {/* Mode de paiement */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Mode de Paiement</Text>
                </View>

                <View style={styles.paymentMethods}>
                    {/* Airtel */}
                    <TouchableOpacity
                        onPress={() => setSelectedMethod('airtel')}
                        style={[
                            styles.paymentOption,
                            selectedMethod === 'airtel' && styles.paymentOptionActive
                        ]}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.radioButton, selectedMethod === 'airtel' && styles.radioButtonActive]}>
                            {selectedMethod === 'airtel' && <View style={styles.radioInner} />}
                        </View>
                        <View style={styles.paymentInfo}>
                            <View style={styles.paymentIconWrapper}>
                                <MaterialIcons name="phone-android" size={24} color="#ff0000" />
                            </View>
                            <View style={{ marginLeft: 12 }}>
                                <Text style={styles.paymentName}>Airtel Money</Text>
                                <Text style={styles.paymentDesc}>Paiement mobile rapide et sécurisé</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Moov */}
                    <TouchableOpacity
                        onPress={() => setSelectedMethod('moov')}
                        style={[
                            styles.paymentOption,
                            selectedMethod === 'moov' && styles.paymentOptionActive
                        ]}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.radioButton, selectedMethod === 'moov' && styles.radioButtonActive]}>
                            {selectedMethod === 'moov' && <View style={styles.radioInner} />}
                        </View>
                        <View style={styles.paymentInfo}>
                            <View style={[styles.paymentIconWrapper, { backgroundColor: 'rgba(0, 128, 255, 0.1)' }]}>
                                <MaterialIcons name="phone-android" size={24} color="#0080ff" />
                            </View>
                            <View style={{ marginLeft: 12 }}>
                                <Text style={styles.paymentName}>Moov Money</Text>
                                <Text style={styles.paymentDesc}>Payez avec votre portefeuille Moov</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Carte */}
                    <TouchableOpacity
                        onPress={() => setSelectedMethod('card')}
                        style={[
                            styles.paymentOption,
                            selectedMethod === 'card' && styles.paymentOptionActive
                        ]}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.radioButton, selectedMethod === 'card' && styles.radioButtonActive]}>
                            {selectedMethod === 'card' && <View style={styles.radioInner} />}
                        </View>
                        <View style={styles.paymentInfo}>
                            <View style={[styles.paymentIconWrapper, { backgroundColor: 'rgba(242, 208, 13, 0.1)' }]}>
                                <MaterialIcons name="credit-card" size={24} color="#f2d00d" />
                            </View>
                            <View style={{ marginLeft: 12 }}>
                                <Text style={styles.paymentName}>Visa / Mastercard</Text>
                                <Text style={styles.paymentDesc}>Carte de crédit ou débit</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Note de sécurité */}
                <View style={styles.securityNote}>
                    <MaterialIcons name="security" size={20} color="#f2d00d" />
                    <Text style={styles.securityText}>
                        Votre transaction est sécurisée par un cryptage SSL 256 bits pour votre sécurité.
                    </Text>
                </View>
            </ScrollView>

            {/* Pied de page */}
            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Prix Total</Text>
                    <Text style={styles.totalPrice}>{formatPrice(product.price)}</Text>
                </View>
                <TouchableOpacity style={styles.confirmButton} activeOpacity={0.8}>
                    <Text style={styles.confirmButtonText}>CONFIRMER LE PAIEMENT</Text>
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
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        color: 'white',
    },
    scrollView: {
        flex: 1,
    },
    sectionHeader: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    orderCard: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    orderCardInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    orderInfo: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 4,
        marginRight: 16,
    },
    orderLabel: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 1,
        color: 'rgba(255,255,255,0.5)',
        marginBottom: 4,
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    orderType: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.5)',
        marginTop: 4,
    },
    priceTag: {
        backgroundColor: 'rgba(242, 208, 13, 0.2)',
        alignSelf: 'flex-start',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 12,
    },
    priceText: {
        color: '#f2d00d',
        fontWeight: 'bold',
        fontSize: 14,
    },
    productImage: {
        width: 100,
        height: 140,
        borderRadius: 12,
        backgroundColor: '#333',
    },
    paymentMethods: {
        paddingHorizontal: 16,
        marginTop: 8,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.1)',
        padding: 16,
        marginBottom: 12,
        backgroundColor: 'rgba(255,255,255,0.02)',
    },
    paymentOptionActive: {
        borderColor: '#f2d00d',
        backgroundColor: 'rgba(242, 208, 13, 0.05)',
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonActive: {
        borderColor: '#f2d00d',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#f2d00d',
    },
    paymentInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
    },
    paymentIconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paymentName: {
        fontSize: 15,
        fontWeight: '600',
        color: 'white',
    },
    paymentDesc: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.4)',
        marginTop: 2,
    },
    securityNote: {
        marginHorizontal: 16,
        padding: 16,
        marginTop: 8,
        backgroundColor: 'rgba(242, 208, 13, 0.05)',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(242, 208, 13, 0.1)',
    },
    securityText: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
        flex: 1,
        marginLeft: 12,
        lineHeight: 18,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(34, 31, 16, 0.98)',
        padding: 16,
        paddingBottom: 32,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    totalRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    totalLabel: {
        color: 'rgba(255,255,255,0.5)',
        fontWeight: '500',
        fontSize: 15,
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    confirmButton: {
        width: '100%',
        backgroundColor: '#f2d00d',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#f2d00d',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    confirmButtonText: {
        color: '#221f10',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
    },
});
