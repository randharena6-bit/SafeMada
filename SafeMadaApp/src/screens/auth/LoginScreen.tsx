import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
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

  const handleForgotPassword = () => {
    if (!forgotEmail) {
      Alert.alert('Erreur', 'Veuillez saisir votre email');
      return;
    }
    setShowForgot(false);
    setForgotEmail('');
    Alert.alert(
      'Email envoyé',
      'Un lien de récupération a été envoyé à votre adresse email.'
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topSection}>
          <View style={styles.logo}>
            <Ionicons name="shield-checkmark" size={56} color={COLORS.white} />
          </View>
          <Text style={styles.title}>SAFE MADAGASCAR</Text>          <Text style={styles.subtitle}>
            Prévenir · Alerter · Protéger
          </Text>
          <Text style={styles.description}>
            Plateforme de signalement et de coordination pour la protection des jeunes
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Connexion</Text>

          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Adresse email"
              placeholderTextColor={COLORS.grayLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              placeholderTextColor={COLORS.grayLight}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={COLORS.gray}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setShowForgot(true)}>
            <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.loginButtonText}>Se connecter</Text>
            )}
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OU</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Ionicons name="person-add-outline" size={18} color={COLORS.green} />
            <Text style={styles.registerButtonText}>Créer un compte</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showForgot}
        transparent
        animationType="fade"
        onRequestClose={() => setShowForgot(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="key-outline" size={40} color={COLORS.green} />
            <Text style={styles.modalTitle}>Récupération de compte</Text>
            <Text style={styles.modalText}>
              Saisissez votre adresse email pour recevoir un lien de réinitialisation.
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Adresse email"
              placeholderTextColor={COLORS.grayLight}
              value={forgotEmail}
              onChangeText={setForgotEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setShowForgot(false)}
              >
                <Text style={styles.modalCancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirm}
                onPress={handleForgotPassword}
              >
                <Text style={styles.modalConfirmText}>Envoyer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SIZES.lg,
  },
  topSection: {
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.md,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.green,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.red,
    marginTop: 4,
  },
  description: {
    fontSize: 13,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: SIZES.sm,
    paddingHorizontal: SIZES.md,
  },
  form: {
    backgroundColor: COLORS.light,
    borderRadius: SIZES.borderRadius + 4,
    padding: SIZES.lg,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: SIZES.lg,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    marginBottom: SIZES.md,
    paddingHorizontal: SIZES.md,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  inputIcon: {
    marginRight: SIZES.sm,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.dark,
  },
  eyeButton: {
    padding: 4,
  },
  forgotText: {
    color: COLORS.red,
    fontSize: 13,
    textAlign: 'right',
    marginBottom: SIZES.md,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: COLORS.green,
    borderRadius: SIZES.borderRadius,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 2,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.lg,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.grayLight,
  },
  dividerText: {
    marginHorizontal: SIZES.md,
    color: COLORS.gray,
    fontSize: 12,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SIZES.sm,
    borderWidth: 1.5,
    borderColor: COLORS.green,
    borderRadius: SIZES.borderRadius,
    paddingVertical: 13,
  },
  registerButtonText: {
    color: COLORS.green,
    fontSize: 15,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.lg,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius + 4,
    padding: SIZES.xl,
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.dark,
    marginTop: SIZES.md,
    marginBottom: SIZES.sm,
  },
  modalText: {
    fontSize: 13,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SIZES.lg,
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.md,
    fontSize: 16,
    marginBottom: SIZES.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: SIZES.md,
    width: '100%',
  },
  modalCancel: {
    flex: 1,
    padding: SIZES.md,
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    alignItems: 'center',
  },
  modalCancelText: {
    color: COLORS.gray,
    fontWeight: '600',
  },
  modalConfirm: {
    flex: 1,
    padding: SIZES.md,
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.green,
    alignItems: 'center',
  },
  modalConfirmText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});
