import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export default function MapScreen({ navigation }: any) {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    // TODO: Request location permission and get current location
    setLocation({ latitude: -18.8792, longitude: 47.5079 }); // Antananarivo default
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapIcon}>🗺️</Text>
        <Text style={styles.mapText}>Carte interactive</Text>
        <Text style={styles.mapSubtext}>
          {location
            ? `Position: ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
            : 'Localisation en cours...'}
        </Text>
      </View>

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Légende</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.danger }]} />
          <Text style={styles.legendText}>Alerte SOS</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.warning }]} />
          <Text style={styles.legendText}>Signalement</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.success }]} />
          <Text style={styles.legendText}>Zone sûre</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: COLORS.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
    margin: SIZES.md,
    borderRadius: SIZES.borderRadius,
  },
  mapIcon: { fontSize: 64, marginBottom: SIZES.md },
  mapText: { fontSize: 18, fontWeight: '600', color: COLORS.dark },
  mapSubtext: { fontSize: 14, color: COLORS.gray, marginTop: SIZES.sm },
  legend: {
    backgroundColor: COLORS.white,
    margin: SIZES.md,
    padding: SIZES.md,
    borderRadius: SIZES.borderRadius,
  },
  legendTitle: { fontSize: 14, fontWeight: '600', color: COLORS.dark, marginBottom: SIZES.sm },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  legendDot: { width: 10, height: 10, borderRadius: 5, marginRight: SIZES.sm },
  legendText: { fontSize: 12, color: COLORS.gray },
});
