import { useCurrency } from "@/contexts/CurrencyContext";
import { getAllJoueurs, getAllParties, getStatistiquesPartie } from "@/db/queries";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface Stats {
  totalParties: number;
  totalJoueurs: number;
  totalCaves: number;
  totalGains: number;
  totalPertes: number;
  partiesRecentes: any[];
}

export default function StatistiquesScreen() {
  const { formatCurrency } = useCurrency();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const parties = await getAllParties();
      const joueurs = await getAllJoueurs();
      
      let totalCaves = 0;
      let totalGains = 0;
      let totalPertes = 0;
      
      // Calculer les stats pour toutes les parties
      for (const partie of parties.slice(0, 10)) { // Limiter pour éviter les performances
        try {
          const statsPartie = await getStatistiquesPartie(partie.id_partie);
          totalCaves += statsPartie.totalCaves;
          totalGains += statsPartie.totalGains;
          totalPertes += statsPartie.totalPertes;
        } catch (error) {
          console.log(`Erreur stats partie ${partie.id_partie}:`, error);
        }
      }
      
      setStats({
        totalParties: parties.length,
        totalJoueurs: joueurs.length,
        totalCaves,
        totalGains,
        totalPertes,
        partiesRecentes: parties.slice(0, 5),
      });
    } catch (error) {
      console.error("Erreur chargement stats:", error);
    } finally {
      setLoading(false);
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    await loadStats();
    setRefreshing(false);
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#8B5CF6" />
      </View>
    );
  }

  if (!stats) {
    return (
      <View style={styles.centerContainer}>
        <Text>Erreur lors du chargement des statistiques</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Statistiques</Text>
          <Text style={styles.headerSubtitle}>Vue d'ensemble de vos parties</Text>
        </View>
        <View style={styles.headerIcon}>
          <Ionicons name="analytics" size={24} color="#8B5CF6" />
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: "#8B5CF6" }]}>
            <Ionicons name="game-controller" size={32} color="white" />
            <Text style={styles.statNumber}>{stats.totalParties}</Text>
            <Text style={styles.statLabel}>Parties</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: "#EC4899" }]}>
            <Ionicons name="people" size={32} color="white" />
            <Text style={styles.statNumber}>{stats.totalJoueurs}</Text>
            <Text style={styles.statLabel}>Joueurs</Text>
          </View>
        </View>

        {/* Financial Stats */}
        <View style={styles.financialSection}>
          <Text style={styles.sectionTitle}>Statistiques financières</Text>
          
          <View style={styles.financialGrid}>
            <View style={[styles.financialCard, { backgroundColor: "#F59E0B" }]}>
              <Ionicons name="cash-outline" size={24} color="white" />
              <Text style={styles.financialAmount}>{formatCurrency(stats.totalCaves)}</Text>
              <Text style={styles.financialLabel}>Total caves</Text>
            </View>
            
            <View style={[styles.financialCard, { backgroundColor: "#10B981" }]}>
              <Ionicons name="trending-up" size={24} color="white" />
              <Text style={styles.financialAmount}>{formatCurrency(stats.totalGains)}</Text>
              <Text style={styles.financialLabel}>Gains totaux</Text>
            </View>
            
            <View style={[styles.financialCard, { backgroundColor: "#EF4444" }]}>
              <Ionicons name="trending-down" size={24} color="white" />
              <Text style={styles.financialAmount}>{formatCurrency(stats.totalPertes)}</Text>
              <Text style={styles.financialLabel}>Pertes totales</Text>
            </View>
            
            <View style={[styles.financialCard, { backgroundColor: "#6366F1" }]}>
              <Ionicons name="calculator" size={24} color="white" />
              <Text style={[
                styles.financialAmount,
                { color: stats.totalGains - stats.totalPertes >= 0 ? "white" : "white" }
              ]}>
                {formatCurrency(stats.totalGains - stats.totalPertes)}
              </Text>
              <Text style={styles.financialLabel}>Bilan net</Text>
            </View>
          </View>
        </View>

        {/* Parties récentes */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Parties récentes</Text>
          
          {stats.partiesRecentes.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="analytics-outline" size={64} color="#D1D5DB" />
              <Text style={styles.emptyStateText}>Aucune donnée</Text>
              <Text style={styles.emptyStateSubtext}>
                Créez des parties pour voir les statistiques
              </Text>
            </View>
          ) : (
            stats.partiesRecentes.map((partie) => (
              <View key={partie.id_partie} style={styles.recentCard}>
                <View style={styles.recentHeader}>
                  <View style={styles.recentIcon}>
                    <Ionicons 
                      name={partie.type_partie === "cash_game" ? "cash" : "trophy"} 
                      size={20} 
                      color="#8B5CF6" 
                    />
                  </View>
                  <View style={styles.recentInfo}>
                    <Text style={styles.recentType}>
                      {partie.type_partie === "cash_game" ? "Cash Game" : "Tournoi"}
                    </Text>
                    <Text style={styles.recentDate}>
                      {formatDate(partie.date_partie)}
                    </Text>
                  </View>
                  <View style={styles.recentStats}>
                    <Text style={styles.recentBigBlind}>
                      BB: {formatCurrency(partie.big_blind)}
                    </Text>
                    {partie.max_recave && (
                      <Text style={styles.recentRecave}>
                        Max recave: {partie.max_recave}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Informations supplémentaires */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={24} color="#8B5CF6" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>À propos des statistiques</Text>
              <Text style={styles.infoText}>
                Les statistiques sont calculées en temps réel à partir de toutes vos parties. 
                Les montants incluent toutes les caves et résultats enregistrés.
              </Text>
            </View>
          </View>
        </View>
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
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 16,
    marginTop: 20,
    marginBottom: 24,
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
    fontSize: 32,
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
  financialSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  financialGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  financialCard: {
    width: "48%",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  financialAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 8,
  },
  financialLabel: {
    fontSize: 12,
    color: "white",
    opacity: 0.9,
    marginTop: 4,
    textAlign: "center",
  },
  recentSection: {
    marginBottom: 24,
  },
  recentCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recentHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  recentInfo: {
    flex: 1,
  },
  recentType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  recentDate: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  recentStats: {
    alignItems: "flex-end",
  },
  recentBigBlind: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  recentRecave: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: "#F3E8FF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#7C3AED",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#6B21A8",
    lineHeight: 20,
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
});