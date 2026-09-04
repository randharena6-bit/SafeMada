import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

const quickActions = [
  { id: 'sos', title: 'ALERTE SOS', color: COLORS.danger, icon: '🚨', screen: 'SOS' },
  { id: 'report', title: 'Signaler', color: COLORS.secondary, icon: '📝', screen: 'Report' },
  { id: 'map', title: 'Carte', color: COLORS.success, icon: '🗺️', screen: 'Map' },
  { id: 'track', title: 'Suivi position', color: COLORS.accent, icon: '📍', screen: 'Tracking' },
];

export default function HomeScreen({ navigation }: any) {
  const { user, logout } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bonjour, {user?.prenom || 'Utilisateur'}</Text>
          <Text style={styles.subtitle}>SAFE MADAGASCAR</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sosContainer}>
        <TouchableOpacity
          style={styles.sosButton}
          onPress={() => navigation.navigate('SOS')}
        >
          <Text style={styles.sosIcon}>🚨</Text>
          <Text style={styles.sosText}>ALERTE SOS</Text>
          <Text style={styles.sosSubtext}>Appuyez en cas d'urgence</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Actions rapides</Text>
      <View style={styles.actionsGrid}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={[styles.actionCard, { borderLeftColor: action.color }]}
            onPress={() => navigation.navigate(action.screen)}
          >
            <Text style={styles.actionIcon}>{action.icon}</Text>
            <Text style={styles.actionTitle}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Mes signalements récents</Text>
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>Aucun signalement pour le moment</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SIZES.lg, backgroundColor: COLORS.white },
  greeting: { fontSize: 20, fontWeight: '700', color: COLORS.dark },
  subtitle: { fontSize: 12, color: COLORS.primary, fontWeight: '600', marginTop: 2 },
  logoutBtn: { padding: SIZES.sm },
  logoutText: { color: COLORS.danger, fontSize: 14 },
  sosContainer: { padding: SIZES.lg },
  sosButton: { backgroundColor: COLORS.danger, borderRadius: 16, padding: SIZES.xl, alignItems: 'center', elevation: 4 },
  sosIcon: { fontSize: 48 },
  sosText: { color: COLORS.white, fontSize: 20, fontWeight: '700', marginTop: SIZES.sm },
  sosSubtext: { color: COLORS.white, fontSize: 12, opacity: 0.8, marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: COLORS.dark, paddingHorizontal: SIZES.lg, marginBottom: SIZES.md, marginTop: SIZES.sm },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: SIZES.lg, gap: SIZES.md },
  actionCard: { backgroundColor: COLORS.white, borderRadius: SIZES.borderRadius, padding: SIZES.md, width: '47%', borderLeftWidth: 4, elevation: 2 },
  actionIcon: { fontSize: 28 },
  actionTitle: { fontSize: 14, fontWeight: '600', color: COLORS.dark, marginTop: SIZES.sm },
  emptyState: { margin: SIZES.lg, padding: SIZES.xl, backgroundColor: COLORS.white, borderRadius: SIZES.borderRadius, alignItems: 'center' },
  emptyText: { color: COLORS.gray, fontSize: 14 },
});
