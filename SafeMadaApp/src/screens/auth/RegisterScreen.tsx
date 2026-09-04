import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { COLORS, SIZES, USER_ROLES } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen({ navigation }: any) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('JEUNE');
  const { register, isLoading } = useAuth();

  const handleRegister = async () => {
    if (!nom || !prenom || !email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Créer un compte</Text>

      <TextInput style={styles.input} placeholder="Nom *" value={nom} onChangeText={setNom} />
      <TextInput style={styles.input} placeholder="Prénom *" value={prenom} onChangeText={setPrenom} />
      <TextInput style={styles.input} placeholder="Email *" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Téléphone" value={telephone} onChangeText={setTelephone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Mot de passe *" value={password} onChangeText={setPassword} secureTextEntry />

      <Text style={styles.label}>Rôle</Text>
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

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'Inscription...' : "S'inscrire"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
        <Text style={styles.linkText}>Déjà un compte ? Se connecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { padding: SIZES.lg, paddingTop: SIZES.xxl },
  title: { fontSize: 24, fontWeight: '700', color: COLORS.dark, marginBottom: SIZES.lg },
  input: { borderWidth: 1, borderColor: COLORS.grayLight, borderRadius: SIZES.borderRadius, padding: SIZES.md, marginBottom: SIZES.md, fontSize: 16 },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.dark, marginBottom: SIZES.sm },
  roleContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: SIZES.sm, marginBottom: SIZES.lg },
  roleButton: { paddingHorizontal: SIZES.md, paddingVertical: SIZES.sm, borderRadius: SIZES.borderRadius, borderWidth: 1, borderColor: COLORS.grayLight },
  roleButtonActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  roleText: { fontSize: 12, color: COLORS.gray },
  roleTextActive: { color: COLORS.white },
  button: { backgroundColor: COLORS.primary, borderRadius: SIZES.borderRadius, padding: SIZES.md, alignItems: 'center' },
  buttonText: { color: COLORS.white, fontSize: 16, fontWeight: '600' },
  link: { marginTop: SIZES.lg, alignItems: 'center' },
  linkText: { color: COLORS.secondary, fontSize: 14 },
});
