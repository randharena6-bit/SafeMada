import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Erreur', 'Identifiants incorrects');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title}>SAFE MADAGASCAR</Text>
        <Text style={styles.subtitle}>Protection et alerte pour les jeunes</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.link}
        >
          <Text style={styles.linkText}>
            Pas de compte ? S'inscrire
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: SIZES.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SIZES.sm,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SIZES.xl,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.md,
    marginBottom: SIZES.md,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.md,
    alignItems: 'center',
    marginTop: SIZES.sm,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    marginTop: SIZES.lg,
    alignItems: 'center',
  },
  linkText: {
    color: COLORS.secondary,
    fontSize: 14,
  },
});
