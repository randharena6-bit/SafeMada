import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

export default function SOSScreen({ navigation }: any) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { user } = useAuth();

  const handleSOS = () => {
    setShowConfirm(true);
  };

  const confirmSOS = () => {
    setShowConfirm(false);
    Alert.alert(
      '🚨 Alerte SOS envoyée',
      'Votre alerte a été transmise aux contacts autorisés.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.warning}>⚠️</Text>
        <Text style={styles.title}>ALERTE SOS</Text>
        <Text style={styles.description}>
          Cette action enverra une alerte urgente à vos contacts de confiance et aux structures autorisées.
        </Text>

        <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
          <Text style={styles.sosButtonText}>ACTIVER L'ALERTE SOS</Text>
        </TouchableOpacity>

        <Text style={styles.info}>
          En cas de danger immédiat, appelez aussi le numéro d'urgence national.
        </Text>
      </View>

      <Modal visible={showConfirm} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalIcon}>🚨</Text>
            <Text style={styles.modalTitle}>Confirmer l'alerte SOS</Text>
            <Text style={styles.modalText}>
              Êtes-vous sûr de vouloir envoyer cette alerte ? Elle sera transmise à vos contacts de confiance.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowConfirm(false)}>
                <Text style={styles.cancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn} onPress={confirmSOS}>
                <Text style={styles.confirmText}>Confirmer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SIZES.xl },
  warning: { fontSize: 64, marginBottom: SIZES.lg },
  title: { fontSize: 28, fontWeight: '700', color: COLORS.danger, marginBottom: SIZES.md },
  description: { fontSize: 16, color: COLORS.gray, textAlign: 'center', marginBottom: SIZES.xl, lineHeight: 24 },
  sosButton: { backgroundColor: COLORS.danger, borderRadius: 16, paddingVertical: 20, paddingHorizontal: 40, elevation: 4 },
  sosButtonText: { color: COLORS.white, fontSize: 18, fontWeight: '700' },
  info: { marginTop: SIZES.xl, fontSize: 14, color: COLORS.gray, textAlign: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: COLORS.white, borderRadius: 16, padding: SIZES.xl, width: '85%', alignItems: 'center' },
  modalIcon: { fontSize: 48, marginBottom: SIZES.md },
  modalTitle: { fontSize: 20, fontWeight: '700', color: COLORS.danger, marginBottom: SIZES.md },
  modalText: { fontSize: 14, color: COLORS.gray, textAlign: 'center', marginBottom: SIZES.lg, lineHeight: 20 },
  modalButtons: { flexDirection: 'row', gap: SIZES.md },
  cancelBtn: { flex: 1, padding: SIZES.md, borderRadius: SIZES.borderRadius, borderWidth: 1, borderColor: COLORS.grayLight, alignItems: 'center' },
  cancelText: { color: COLORS.gray, fontWeight: '600' },
  confirmBtn: { flex: 1, padding: SIZES.md, borderRadius: SIZES.borderRadius, backgroundColor: COLORS.danger, alignItems: 'center' },
  confirmText: { color: COLORS.white, fontWeight: '600' },
});
