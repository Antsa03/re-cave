import { createJoueur, deleteJoueur, getAllJoueurs, updateJoueur } from "@/db/queries";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function JoueursScreen() {
  const [joueurs, setJoueurs] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingJoueur, setEditingJoueur] = useState<any | null>(null);

  useEffect(() => {
    loadJoueurs();
  }, []);

  async function loadJoueurs() {
    try {
      const data = await getAllJoueurs();
      setJoueurs(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  }

  async function handleCreateJoueur() {
    if (!pseudo.trim()) {
      return;
    }

    setLoading(true);
    try {
      if (editingJoueur) {
        await updateJoueur(editingJoueur.id_joueur, {
          pseudo: pseudo.trim(),
          contact: contact.trim() || undefined
        });
      } else {
        await createJoueur(pseudo.trim(), contact.trim() || undefined);
      }
      setPseudo("");
      setContact("");
      setEditingJoueur(null);
      setModalVisible(false);
      await loadJoueurs();
    } catch (error) {
      Alert.alert("Erreur", editingJoueur ? "Impossible de modifier le joueur" : "Impossible de créer le joueur");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenEditModal(joueur: any) {
    setEditingJoueur(joueur);
    setPseudo(joueur.pseudo);
    setContact(joueur.contact || "");
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
    setPseudo("");
    setContact("");
    setEditingJoueur(null);
  }

  async function handleDeleteJoueur(id: number, pseudo: string) {
    Alert.alert(
      "Confirmer la suppression",
      `Êtes-vous sûr de vouloir supprimer ${pseudo} ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteJoueur(id);
              await loadJoueurs();
            } catch (error) {
              Alert.alert("Erreur", "Impossible de supprimer le joueur");
            }
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Joueurs</Text>
          <Text style={styles.headerSubtitle}>
            {joueurs.length} joueur(s) enregistré(s)
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="person-add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Joueurs List */}
      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {joueurs.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyStateText}>Aucun joueur enregistré</Text>
            <Text style={styles.emptyStateSubtext}>
              Ajoutez des joueurs pour suivre leurs performances
            </Text>
          </View>
        ) : (
          joueurs.map((joueur) => (
            <View key={joueur.id_joueur} style={styles.joueurCard}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person" size={24} color="#8B5CF6" />
              </View>
              <View style={styles.joueurInfo}>
                <Text style={styles.joueurPseudo}>{joueur.pseudo}</Text>
                {joueur.contact && (
                  <Text style={styles.joueurContact}>{joueur.contact}</Text>
                )}
              </View>
              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleOpenEditModal(joueur)}
                >
                  <Ionicons name="create-outline" size={20} color="#8B5CF6" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() =>
                    handleDeleteJoueur(joueur.id_joueur, joueur.pseudo)
                  }
                >
                  <Ionicons name="trash-outline" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Modal Création Joueur avec KeyboardAvoidingView */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView 
          style={styles.modalOverlay} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingJoueur ? "Modifier le joueur" : "Nouveau joueur"}
              </Text>
              <TouchableOpacity onPress={handleCloseModal}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Pseudo *</Text>
              <TextInput
                style={styles.input}
                value={pseudo}
                onChangeText={setPseudo}
                placeholder="Entrez le pseudo"
                placeholderTextColor="#9CA3AF"
                returnKeyType="next"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Contact</Text>
              <TextInput
                style={styles.input}
                value={contact}
                onChangeText={setContact}
                placeholder="Email ou téléphone"
                placeholderTextColor="#9CA3AF"
                returnKeyType="done"
              />
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                loading && styles.submitButtonDisabled,
              ]}
              onPress={handleCreateJoueur}
              disabled={loading}
            >
              <Text style={styles.submitButtonText}>
                {loading ? (editingJoueur ? "Modification..." : "Création...") : (editingJoueur ? "Modifier" : "Créer le joueur")}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  joueurCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  joueurInfo: {
    flex: 1,
  },
  joueurPseudo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  joueurContact: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    padding: 8,
  },
  deleteButton: {
    padding: 8,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 400,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#111827",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  submitButton: {
    backgroundColor: "#8B5CF6",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 12,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});