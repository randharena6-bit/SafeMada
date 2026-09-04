import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { COLORS, SIZES, REPORT_TYPES, PRIORITY_LEVELS } from '../../constants/theme';

export default function ReportScreen({ navigation }: any) {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState('MEDIUM');

  const handleSubmit = () => {
    if (!type || !description) {
      Alert.alert('Erreur', 'Veuillez remplir les champs obligatoires');
      return;
    }
    Alert.alert(
      'Signalement créé',
      'Votre signalement a été enregistré avec succès.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Nouveau signalement</Text>

      <Text style={styles.label}>Type de signalement *</Text>
      <View style={styles.typeContainer}>
        {REPORT_TYPES.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.typeButton, type === t && styles.typeButtonActive]}
            onPress={() => setType(t)}
          >
            <Text style={[styles.typeText, type === t && styles.typeTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Description *</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Décrivez la situation..."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={5}
      />

      <TextInput
        style={styles.input}
        placeholder="Zone / Lieu approximatif"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Niveau d'urgence</Text>
      <View style={styles.priorityContainer}>
        {Object.entries(PRIORITY_LEVELS).map(([key, value]) => (
          <TouchableOpacity
            key={key}
            style={[styles.priorityButton, priority === key && { backgroundColor: value.color }]}
            onPress={() => setPriority(key)}
          >
            <Text style={[styles.priorityText, priority === key && styles.priorityTextActive]}>
              {value.icon} {value.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Envoyer le signalement</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { padding: SIZES.lg },
  title: { fontSize: 24, fontWeight: '700', color: COLORS.dark, marginBottom: SIZES.lg },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.dark, marginBottom: SIZES.sm, marginTop: SIZES.md },
  typeContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: SIZES.sm },
  typeButton: { paddingHorizontal: SIZES.md, paddingVertical: SIZES.sm, borderRadius: SIZES.borderRadius, borderWidth: 1, borderColor: COLORS.grayLight },
  typeButtonActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  typeText: { fontSize: 12, color: COLORS.gray },
  typeTextActive: { color: COLORS.white },
  input: { borderWidth: 1, borderColor: COLORS.grayLight, borderRadius: SIZES.borderRadius, padding: SIZES.md, marginBottom: SIZES.md, fontSize: 16 },
  textArea: { height: 120, textAlignVertical: 'top' },
  priorityContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: SIZES.sm },
  priorityButton: { paddingHorizontal: SIZES.md, paddingVertical: SIZES.sm, borderRadius: SIZES.borderRadius, borderWidth: 1, borderColor: COLORS.grayLight },
  priorityText: { fontSize: 12, color: COLORS.gray },
  priorityTextActive: { color: COLORS.white },
  submitButton: { backgroundColor: COLORS.primary, borderRadius: SIZES.borderRadius, padding: SIZES.md, alignItems: 'center', marginTop: SIZES.xl },
  submitText: { color: COLORS.white, fontSize: 16, fontWeight: '600' },
});
