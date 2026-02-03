import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { orderService } from '../services/api';

const mockProduct = {
    id: '1',
    title: 'Marcher dans la Foi',
    type: 'ebook',
    author: 'Pasteur Francis',
    price: 5000,
    cover_image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC65_rrcQgI7Gg6AFnG2ElqYdwOVh0f5oNsF1AJN41YiG0mqXmO8VPWwV5uz1IUuqHXItOiFyfNFuZW1N8k6IWXSIhvRYKANNpVjeYTOJl5WkHmIdOg1WoJrs59x1CncjT-UQMC5iH89RupyrYRiCKDvxSp6xOh9myp82edUdn1peA-QDdCTTUmUxURjoniO_5G3y9pxL-w2qyRQ-tUMkGeYJNNaRpEjNVrPeHl57Y3WBr_BNPXkJJIcWZbiPoqdOB3oGgUW5p9OcEe',
};

const formatPrice = (price?: number) => {
    return (price || 0).toLocaleString('fr-FR') + ' FCFA';
};

export default function CheckoutScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    // On récupère le produit passé en paramètre, sinon mock
    const product = route.params?.product || mockProduct;

    const [selectedMethod, setSelectedMethod] = useState<'airtel' | 'moov' | 'card'>('airtel');
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        try {
            setLoading(true);
            const response = await orderService.createOrder([{ id: product.id, type: product.type }]);

            if (response.success) {
                Alert.alert(
                    'Paiement Réussi',
                    'Félicitations ! Votre achat a été validé. Vous pouvez maintenant accéder à votre contenu.',
                    [
                        {
                            text: 'Voir ma bibliothèque',
                            onPress: () => navigation.navigate('Ma Biblio')
                        }
                    ]
                );
            } else {
                Alert.alert('Erreur', 'Le paiement a échoué. Veuillez réessayer.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erreur', 'Une erreur est survenue lors du paiement.');
        } finally {
            setLoading(false);
        }
    };

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
                            <Text style={styles.orderType}>
                                {product.type === 'ebook' ? 'Livre Numérique' : product.type === 'audiobook' ? 'Livre Audio' : 'Coaching'}
                            </Text>
                            <View style={styles.priceTag}>
                                <Text style={styles.priceText}>{formatPrice(product.price)}</Text>
                            </View>
                        </View>
                        <Image source={{ uri: product.cover_image_url || product.imageUrl }} style={styles.productImage} />
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
                            <View style={[styles.paymentIconWrapper, { backgroundColor: 'rgba(0,100,255,0.1)' }]}>
                                <MaterialIcons name="phone-android" size={24} color="#0066ff" />
                            </View>
                            <View style={{ marginLeft: 12 }}>
                                <Text style={styles.paymentName}>Moov Money</Text>
                                <Text style={styles.paymentDesc}>transaction simple via Moov</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Carte Bancaire */}
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
                            <View style={[styles.paymentIconWrapper, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                                <MaterialIcons name="credit-card" size={24} color="white" />
                            </View>
                            <View style={{ marginLeft: 12 }}>
                                <Text style={styles.paymentName}>Carte Bancaire</Text>
                                <Text style={styles.paymentDesc}>Visa, Mastercard</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Total */}
                <View style={styles.totalSection}>
                    <Text style={styles.totalLabel}>Total à payer</Text>
                    <Text style={styles.totalAmount}>{formatPrice(product.price)}</Text>
                </View>

                {/* Disclaimer */}
                <Text style={styles.disclaimer}>
                    En validant votre commande, vous acceptez nos conditions générales de vente.
                    Les produits numériques ne sont pas remboursables une fois téléchargés.
                </Text>
            </ScrollView>

            {/* Bouton Payer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.payButton}
                    onPress={handlePayment}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#221f10" />
                    ) : (
                        <Text style={styles.payButtonText}>PAYER MAINTENANT</Text>
                    )}
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
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    sectionHeader: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 16,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    orderCard: {
        marginHorizontal: 16,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        overflow: 'hidden',
    },
    orderCardInner: {
        flexDirection: 'row',
        padding: 16,
    },
    orderInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    orderLabel: {
        color: '#f2d00d',
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 8,
        letterSpacing: 1,
    },
    orderTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    orderType: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        marginBottom: 16,
    },
    priceTag: {
        backgroundColor: 'rgba(242, 208, 13, 0.15)',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    priceText: {
        color: '#f2d00d',
        fontWeight: 'bold',
        fontSize: 16,
    },
    productImage: {
        width: 100,
        height: 140,
        borderRadius: 8,
        marginLeft: 16,
        backgroundColor: '#1a180d',
    },
    paymentMethods: {
        paddingHorizontal: 16,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'rgba(255,255,255,0.03)',
        marginBottom: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    paymentOptionActive: {
        borderColor: '#f2d00d',
        backgroundColor: 'rgba(242, 208, 13, 0.05)',
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    radioButtonActive: {
        borderColor: '#f2d00d',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#f2d00d',
    },
    paymentInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentIconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,50,50,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paymentName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    paymentDesc: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 12,
        marginTop: 2,
    },
    totalSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 16,
        marginBottom: 16,
    },
    totalLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 16,
    },
    totalAmount: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    disclaimer: {
        marginHorizontal: 16,
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        backgroundColor: '#221f10',
    },
    payButton: {
        backgroundColor: '#f2d00d',
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#f2d00d',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    payButtonText: {
        color: '#221f10',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
});
