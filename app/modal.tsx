import { createPartie } from "@/db/queries";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function CreatePartieModal() {
  const router = useRouter();
  const [typePartie, setTypePartie] = useState<"cash_game" | "tournament">(
    "cash_game"
  );
  const [bigBlind, setBigBlind] = useState("");
  const [maxRecave, setMaxRecave] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreatePartie() {
    if (!bigBlind.trim()) {
      Alert.alert("Erreur", "La big blind est requise");
      return;
    }

    const bigBlindValue = parseFloat(bigBlind);
    if (isNaN(bigBlindValue) || bigBlindValue <= 0) {
      Alert.alert("Erreur", "La big blind doit être un nombre positif");
      return;
    }

    setLoading(true);
    try {
      const datePartie = new Date().toISOString();
      const maxRecaveValue = maxRecave.trim() ? parseInt(maxRecave) : undefined;

      await createPartie(datePartie, bigBlindValue, typePartie, maxRecaveValue);

      // Revenir à la page d'accueil (qui se rafraîchira automatiquement)
      router.back();
    } catch (error) {
      Alert.alert("Erreur", "Impossible de créer la partie");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="close" size={28} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nouvelle partie</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Type de partie */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Type de partie</Text>
          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                typePartie === "cash_game" && styles.typeButtonActive,
              ]}
              onPress={() => setTypePartie("cash_game")}
            >
              <Ionicons
                name="cash"
                size={24}
                color={typePartie === "cash_game" ? "#8B5CF6" : "#6B7280"}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  typePartie === "cash_game" && styles.typeButtonTextActive,
                ]}
              >
                Cash Game
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                typePartie === "tournament" && styles.typeButtonActive,
              ]}
              onPress={() => setTypePartie("tournament")}
            >
              <Ionicons
                name="trophy"
                size={24}
                color={typePartie === "tournament" ? "#8B5CF6" : "#6B7280"}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  typePartie === "tournament" && styles.typeButtonTextActive,
                ]}
              >
                Tournoi
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Big Blind */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Big Blind *</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="logo-euro" size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              value={bigBlind}
              onChangeText={setBigBlind}
              placeholder="Montant de la big blind"
              placeholderTextColor="#9CA3AF"
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        {/* Max Recave */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nombre max de recaves</Text>
          <Text style={styles.sectionSubtitle}>Optionnel</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="refresh" size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              value={maxRecave}
              onChangeText={setMaxRecave}
              placeholder="Nombre de recaves autorisées"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
            />
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color="#8B5CF6" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>À propos des parties</Text>
            <Text style={styles.infoText}>
              Les parties sont enregistrées avec la date et l'heure actuelles.
              Vous pourrez ajouter des joueurs et gérer les caves après la
              création.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Create Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.createButton, loading && styles.createButtonDisabled]}
          onPress={handleCreatePartie}
          disabled={loading}
        >
          <Text style={styles.createButtonText}>
            {loading ? "Création..." : "Créer la partie"}
          </Text>
          {!loading && (
            <Ionicons name="arrow-forward" size={20} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  typeButton: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  typeButtonActive: {
    borderColor: "#8B5CF6",
    backgroundColor: "#F3E8FF",
  },
  typeButtonText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  typeButtonTextActive: {
    color: "#8B5CF6",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 12,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: "#111827",
    marginLeft: 8,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: "#F3E8FF",
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7C3AED",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: "#6B21A8",
    lineHeight: 18,
  },
  footer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  createButton: {
    backgroundColor: "#8B5CF6",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  createButtonDisabled: {
    opacity: 0.6,
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
