import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

const stats = [
  { id: 1, label: 'Signalements', value: '128', color: COLORS.primary },
  { id: 2, label: 'En suivi', value: '47', color: COLORS.warning },
  { id: 3, label: 'Alertes', value: '12', color: COLORS.danger },
  { id: 4, label: 'Résolus', value: '89', color: COLORS.success },
];

const recentReports = [
  { id: 1, title: 'Dossier #102', type: 'Disparition', time: 'Il y a 2h', priority: 'HIGH' },
  { id: 2, title: 'Dossier #103', type: 'Violence', time: 'Il y a 5h', priority: 'CRITICAL' },
  { id: 3, title: 'Dossier #104', type: 'Menace', time: 'Hier', priority: 'MEDIUM' },
];

export default function DashboardScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tableau de bord</Text>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat) => (
          <View key={stat.id} style={[styles.statCard, { borderLeftColor: stat.color }]}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Signalements récents</Text>
      {recentReports.map((report) => (
        <TouchableOpacity key={report.id} style={styles.reportCard}>
          <View style={styles.reportHeader}>
            <Text style={styles.reportTitle}>{report.title}</Text>
            <Text style={styles.reportTime}>{report.time}</Text>
          </View>
          <Text style={styles.reportType}>{report.type}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: SIZES.lg, backgroundColor: COLORS.white },
  title: { fontSize: 24, fontWeight: '700', color: COLORS.dark },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: SIZES.md, gap: SIZES.sm },
  statCard: { backgroundColor: COLORS.white, borderRadius: SIZES.borderRadius, padding: SIZES.md, width: '48%', borderLeftWidth: 4 },
  statValue: { fontSize: 28, fontWeight: '700', color: COLORS.dark },
  statLabel: { fontSize: 12, color: COLORS.gray, marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: COLORS.dark, paddingHorizontal: SIZES.lg, marginBottom: SIZES.md, marginTop: SIZES.sm },
  reportCard: { backgroundColor: COLORS.white, marginHorizontal: SIZES.lg, marginBottom: SIZES.sm, padding: SIZES.md, borderRadius: SIZES.borderRadius },
  reportHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  reportTitle: { fontSize: 14, fontWeight: '600', color: COLORS.dark },
  reportTime: { fontSize: 12, color: COLORS.gray },
  reportType: { fontSize: 12, color: COLORS.secondary, marginTop: 4 },
});
