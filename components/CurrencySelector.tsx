import { CURRENCIES, Currency, useCurrency } from '@/contexts/CurrencyContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface CurrencySelectorProps {
  visible: boolean;
  onClose: () => void;
}

export default function CurrencySelector({ visible, onClose }: CurrencySelectorProps) {
  const { currency: currentCurrency, setCurrency } = useCurrency();

  function handleSelectCurrency(currency: Currency) {
    setCurrency(currency);
    onClose();
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Choisir la devise</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {CURRENCIES.map((currency) => (
              <TouchableOpacity
                key={currency.code}
                style={[
                  styles.currencyOption,
                  currentCurrency.code === currency.code && styles.currencyOptionSelected
                ]}
                onPress={() => handleSelectCurrency(currency)}
              >
                <View style={styles.currencyInfo}>
                  <Text style={styles.currencySymbol}>{currency.symbol}</Text>
                  <View style={styles.currencyDetails}>
                    <Text style={styles.currencyName}>{currency.name}</Text>
                    <Text style={styles.currencyCode}>{currency.code}</Text>
                  </View>
                </View>
                {currentCurrency.code === currency.code && (
                  <Ionicons name="checkmark-circle" size={24} color="#8B5CF6" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  currencyOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  currencyOptionSelected: {
    backgroundColor: '#F3E8FF',
    borderColor: '#8B5CF6',
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '700',
    color: '#8B5CF6',
    width: 50,
    textAlign: 'center',
  },
  currencyDetails: {
    marginLeft: 12,
  },
  currencyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  currencyCode: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
});
