import CurrencySelector from "@/components/CurrencySelector";
import { useCurrency } from "@/contexts/CurrencyContext";
import { initDatabase } from "@/db/database";
import { deletePartie, getAllParties } from "@/db/queries";
import { useRefresh } from "@/hooks/use-refresh";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [parties, setParties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [joueursCount, setJoueursCount] = useState(0);
  const [currencySelectorVisible, setCurrencySelectorVisible] = useState(false);
  const router = useRouter();
  const { currency, formatCurrency } = useCurrency();

  async function loadData() {
    try {
      if (loading) {
        await initDatabase();
      }
      const data = await getAllParties();
      setParties(data);

      // Charger le nombre de joueurs
      const { getAllJoueurs } = await import("@/db/queries");
      const joueurs = await getAllJoueurs();
      setJoueursCount(joueurs.length);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  }

  const { refreshing, onRefresh } = useRefresh(loadData);

  useEffect(() => {
    loadData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  async function handleDeletePartie(id: number, type: string) {
    Alert.alert(
      "Confirmer la suppression",
      `Êtes-vous sûr de vouloir supprimer cette partie ${type === "cash_game" ? "Cash Game" : "Tournoi"} ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              await deletePartie(id);
              await loadData();
              Alert.alert("Succès", "Partie supprimée avec succès");
            } catch (error) {
              Alert.alert("Erreur", "Impossible de supprimer la partie");
            }
          },
        },
      ]
    );
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#8B5CF6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Re Cave</Text>
          <Text style={styles.headerSubtitle}>Gestion de parties de poker</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.currencyButton}
            onPress={() => setCurrencySelectorVisible(true)}
          >
            <Text style={styles.currencyButtonText}>{currency.symbol}</Text>
            <Text style={styles.currencyCodeText}>{currency.code}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/modal")}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Currency Selector Modal */}
      <CurrencySelector
        visible={currencySelectorVisible}
        onClose={() => setCurrencySelectorVisible(false)}
      />

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: "#8B5CF6" }]}>
          <Ionicons name="game-controller" size={24} color="white" />
          <Text style={styles.statNumber}>{parties.length}</Text>
          <Text style={styles.statLabel}>Parties</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: "#EC4899" }]}>
          <Ionicons name="people" size={24} color="white" />
          <Text style={styles.statNumber}>{joueursCount}</Text>
          <Text style={styles.statLabel}>Joueurs</Text>
        </View>
      </View>

      {/* Parties List */}
      <ScrollView
        style={styles.partiesContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.sectionTitle}>Parties récentes</Text>

        {parties.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="game-controller-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyStateText}>Aucune partie</Text>
            <Text style={styles.emptyStateSubtext}>
              Créez votre première partie pour commencer
            </Text>
            <TouchableOpacity
              style={styles.createFirstButton}
              onPress={() => router.push("/modal")}
            >
              <Text style={styles.createFirstButtonText}>Créer une partie</Text>
            </TouchableOpacity>
          </View>
        ) : (
          parties.map((partie) => (
            <View key={partie.id_partie} style={styles.partieCard}>
              <TouchableOpacity 
                style={styles.partieCardContent}
                onPress={() => router.push(`/partie/${partie.id_partie}`)}
              >
                <View style={styles.partieHeader}>
                  <View style={styles.partieIconContainer}>
                    <Ionicons 
                      name={partie.type_partie === "cash_game" ? "cash" : "trophy"} 
                      size={24} 
                      color="#8B5CF6" 
                    />
                  </View>
                  <View style={styles.partieInfo}>
                    <Text style={styles.partieType}>
                      {partie.type_partie === "cash_game"
                        ? "Cash Game"
                        : "Tournoi"}
                    </Text>
                    <Text style={styles.partieDate}>
                      {formatDate(partie.date_partie)}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </View>
                <View style={styles.partieDivider} />
                <View style={styles.partieFooter}>
                  <View style={styles.partieDetail}>
                    <Text style={styles.partieDetailLabel}>Big Blind</Text>
                    <Text style={styles.partieDetailValue}>
                      {formatCurrency(partie.big_blind)}
                    </Text>
                  </View>
                  {partie.max_recave && (
                    <View style={styles.partieDetail}>
                      <Text style={styles.partieDetailLabel}>Max Recaves</Text>
                      <Text style={styles.partieDetailValue}>
                        {partie.max_recave}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deletePartieButton}
                onPress={() => handleDeletePartie(partie.id_partie, partie.type_partie)}
              >
                <Ionicons name="trash-outline" size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "white",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  currencyButton: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  currencyButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#8B5CF6",
  },
  currencyCodeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 2,
  },
  addButton: {
    backgroundColor: "#8B5CF6",
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: "white",
    opacity: 0.9,
    marginTop: 4,
  },
  partiesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  partieCard: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  partieCardContent: {
    flex: 1,
    padding: 16,
  },
  deletePartieButton: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  partieHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  partieIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  partieInfo: {
    flex: 1,
  },
  partieType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  partieDate: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  partieDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },
  partieFooter: {
    flexDirection: "row",
    gap: 24,
  },
  partieDetail: {
    alignItems: "center",
  },
  partieDetailLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  partieDetailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginTop: 4,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 8,
    textAlign: "center",
  },
  createFirstButton: {
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 20,
  },
  createFirstButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
