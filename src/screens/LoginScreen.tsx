import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
    const navigation = useNavigation<any>();
    const { login } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleAuth = async () => {
        if (!email || !password) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }

        if (!isLogin && !name) {
            Alert.alert('Erreur', 'Veuillez entrer votre nom');
            return;
        }

        try {
            setLoading(true);
            let response;

            if (isLogin) {
                response = await authService.login(email, password);
            } else {
                response = await authService.register({ name, email, password });
            }

            if (response.success) {
                // Mise à jour du contexte et navigation
                // Note: AuthResponse data est { user: User, token: string }
                await login(response.data.token, response.data.user);
                navigation.replace('Tabs');
            } else {
                Alert.alert('Erreur', response.message || 'Une erreur est survenue');
            }
        } catch (error: any) {
            console.error(error);
            const message = error.response?.data?.message || 'Erreur de connexion';
            Alert.alert('Erreur', message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/* Logo et Titre */}
            <View style={styles.header}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.tagline}>Votre parcours spirituel commence ici</Text>
            </View>

            {/* Formulaire */}
            <View style={styles.form}>
                <Text style={styles.formTitle}>
                    {isLogin ? 'Connexion' : 'Créer un compte'}
                </Text>

                {/* Nom (Inscription uniquement) */}
                {!isLogin && (
                    <View style={styles.inputWrapper}>
                        <MaterialIcons name="person" size={20} color="rgba(255,255,255,0.4)" />
                        <TextInput
                            style={styles.input}
                            placeholder="Nom complet"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                )}

                {/* Email */}
                <View style={styles.inputWrapper}>
                    <MaterialIcons name="email" size={20} color="rgba(255,255,255,0.4)" />
                    <TextInput
                        style={styles.input}
                        placeholder="Adresse email"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* Mot de passe */}
                <View style={styles.inputWrapper}>
                    <MaterialIcons name="lock" size={20} color="rgba(255,255,255,0.4)" />
                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <MaterialIcons
                            name={showPassword ? 'visibility' : 'visibility-off'}
                            size={20}
                            color="rgba(255,255,255,0.4)"
                        />
                    </TouchableOpacity>
                </View>

                {/* Mot de passe oublié */}
                {isLogin && (
                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
                    </TouchableOpacity>
                )}

                {/* Bouton principal */}
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={handleAuth}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#221f10" />
                    ) : (
                        <Text style={styles.primaryButtonText}>
                            {isLogin ? 'Se connecter' : 'S\'inscrire'}
                        </Text>
                    )}
                </TouchableOpacity>

                {/* Séparateur */}
                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>ou</Text>
                    <View style={styles.dividerLine} />
                </View>

                {/* Connexion sociale */}
                <View style={styles.socialButtons}>
                    <TouchableOpacity style={styles.socialButton}>
                        <MaterialIcons name="g-translate" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <MaterialIcons name="facebook" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <MaterialIcons name="apple" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Toggle Login/Register */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        {isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
                    </Text>
                    <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                        <Text style={styles.footerAction}>
                            {isLogin ? 'Créer un compte' : 'Se connecter'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#221f10',
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 24,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 16,
    },
    tagline: {
        color: '#f2d00d',
        fontSize: 14,
        letterSpacing: 1,
        fontWeight: '600',
    },
    form: {
        flex: 2,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 24,
        textAlign: 'center',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    input: {
        flex: 1,
        color: 'white',
        marginLeft: 12,
        fontSize: 16,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
    },
    primaryButton: {
        backgroundColor: '#f2d00d',
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    primaryButtonText: {
        color: '#221f10',
        fontSize: 16,
        fontWeight: 'bold',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    dividerText: {
        color: 'rgba(255,255,255,0.4)',
        paddingHorizontal: 16,
        fontSize: 14,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 32,
    },
    socialButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
    },
    footerAction: {
        color: '#f2d00d',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});
