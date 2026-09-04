import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Déconnexion', 'Voulez-vous vous déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Déconnexion', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {user?.prenom?.[0]}{user?.nom?.[0]}
        </Text>
      </View>

      <Text style={styles.name}>{user?.prenom} {user?.nom}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Text style={styles.role}>{user?.role?.replace('_', ' ')}</Text>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Modifier le profil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Contacts de confiance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Paramètres</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={handleLogout}>
          <Text style={[styles.menuText, styles.logoutText]}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: SIZES.xl },
  avatarText: { color: COLORS.white, fontSize: 28, fontWeight: '700' },
  name: { fontSize: 20, fontWeight: '700', color: COLORS.dark, textAlign: 'center', marginTop: SIZES.md },
  email: { fontSize: 14, color: COLORS.gray, textAlign: 'center' },
  role: { fontSize: 12, color: COLORS.secondary, textAlign: 'center', fontWeight: '600', marginTop: 4 },
  menu: { marginTop: SIZES.xl, backgroundColor: COLORS.white, borderRadius: SIZES.borderRadius, marginHorizontal: SIZES.lg },
  menuItem: { padding: SIZES.md, borderBottomWidth: 1, borderBottomColor: COLORS.grayLight },
  menuText: { fontSize: 16, color: COLORS.dark },
  logoutItem: { borderBottomWidth: 0 },
  logoutText: { color: COLORS.danger },
});
