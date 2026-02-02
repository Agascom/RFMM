import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

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
                <TouchableOpacity style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>
                        {isLogin ? 'Se connecter' : 'S\'inscrire'}
                    </Text>
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
                    <TouchableOpacity style={[styles.socialButton, { marginLeft: 16 }]}>
                        <MaterialIcons name="facebook" size={24} color="#1877F2" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.socialButton, { marginLeft: 16 }]}>
                        <MaterialIcons name="apple" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Toggle Login/Signup */}
                <View style={styles.toggleContainer}>
                    <Text style={styles.toggleText}>
                        {isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
                    </Text>
                    <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                        <Text style={styles.toggleLink}>
                            {isLogin ? 'S\'inscrire' : 'Se connecter'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Terms */}
            <Text style={styles.termsText}>
                En continuant, vous acceptez nos{' '}
                <Text style={styles.termsLink}>Conditions d'utilisation</Text>
                {' '}et notre{' '}
                <Text style={styles.termsLink}>Politique de confidentialité</Text>
            </Text>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#221f10',
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logo: {
        width: 150,
        height: 150,
    },
    tagline: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.5)',
        marginTop: 8,
        textAlign: 'center',
    },
    form: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 24,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
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
        fontSize: 16,
        marginLeft: 12,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: '#f2d00d',
        fontSize: 14,
        fontWeight: '500',
    },
    primaryButton: {
        backgroundColor: '#f2d00d',
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
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
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    dividerText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 14,
        marginHorizontal: 16,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    socialButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255,255,255,0.08)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    toggleText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 14,
    },
    toggleLink: {
        color: '#f2d00d',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    termsText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 24,
        lineHeight: 18,
    },
    termsLink: {
        color: '#f2d00d',
    },
});
