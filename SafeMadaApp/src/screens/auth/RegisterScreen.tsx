import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, USER_ROLES } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen({ navigation }: any) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [role, setRole] = useState('JEUNE');
  const { register, isLoading } = useAuth();

  const handleRegister = async () => {
    if (!nom || !prenom || !email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }
    try {
      await register({ nom, prenom, email, telephone, password, role });
      Alert.alert('Succès', 'Compte créé avec succès');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erreur', "Erreur lors de l'inscription");
    }
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
        <View style={styles.header}>
          <View style={styles.logo}>
            <Ionicons name="person-add" size={40} color={COLORS.white} />
          </View>
          <Text style={styles.title}>Créer un compte</Text>
          <Text style={styles.subtitle}>Rejoignez SAFE MADAGASCAR</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Vos informations</Text>

          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nom *"
              placeholderTextColor={COLORS.grayLight}
              value={nom}
              onChangeText={setNom}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Prénom *"
              placeholderTextColor={COLORS.grayLight}
              value={prenom}
              onChangeText={setPrenom}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Adresse email *"
              placeholderTextColor={COLORS.grayLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="call-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Téléphone"
              placeholderTextColor={COLORS.grayLight}
              value={telephone}
              onChangeText={setTelephone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Mot de passe *"
              placeholderTextColor={COLORS.grayLight}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={COLORS.gray} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirmer le mot de passe *"
              placeholderTextColor={COLORS.grayLight}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirm}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeButton}>
              <Ionicons name={showConfirm ? 'eye-off-outline' : 'eye-outline'} size={20} color={COLORS.gray} />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Votre rôle</Text>
          <View style={styles.roleContainer}>
            {USER_ROLES.map((r) => (
              <TouchableOpacity
                key={r}
                style={[styles.roleButton, role === r && styles.roleButtonActive]}
                onPress={() => setRole(r)}
              >
                <Text style={[styles.roleText, role === r && styles.roleTextActive]}>
                  {r.replace('_', ' ')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.buttonText}>S'inscrire</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
            <Text style={styles.linkText}>
              Déjà un compte ? <Text style={styles.linkTextBold}>Se connecter</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { padding: SIZES.lg, paddingTop: SIZES.xxl },
  header: { alignItems: 'center', marginBottom: SIZES.lg },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.md,
    elevation: 4,
  },
  title: { fontSize: 24, fontWeight: '700', color: COLORS.green },
  subtitle: { fontSize: 13, color: COLORS.gray, marginTop: 4 },
  form: {
    backgroundColor: COLORS.light,
    borderRadius: SIZES.borderRadius + 4,
    padding: SIZES.lg,
    paddingTop: SIZES.md,
  },
  formTitle: { fontSize: 16, fontWeight: '700', color: COLORS.dark, marginBottom: SIZES.md },
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
  inputIcon: { marginRight: SIZES.sm },
  input: { flex: 1, paddingVertical: 14, fontSize: 16, color: COLORS.dark },
  eyeButton: { padding: 4 },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.dark, marginBottom: SIZES.sm },
  roleContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: SIZES.sm, marginBottom: SIZES.lg },
  roleButton: { paddingHorizontal: SIZES.md, paddingVertical: SIZES.sm, borderRadius: SIZES.borderRadius, borderWidth: 1, borderColor: COLORS.grayLight, backgroundColor: COLORS.white },
  roleButtonActive: { backgroundColor: COLORS.green, borderColor: COLORS.green },
  roleText: { fontSize: 12, color: COLORS.gray },
  roleTextActive: { color: COLORS.white, fontWeight: '600' },
  button: { backgroundColor: COLORS.green, borderRadius: SIZES.borderRadius, paddingVertical: 15, alignItems: 'center', justifyContent: 'center', elevation: 2 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  link: { marginTop: SIZES.lg, alignItems: 'center' },
  linkText: { color: COLORS.gray, fontSize: 14 },
  linkTextBold: { color: COLORS.red, fontWeight: '700' },
});
