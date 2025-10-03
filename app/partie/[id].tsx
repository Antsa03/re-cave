import { useCurrency } from "@/contexts/CurrencyContext";
import {
  acheterCave,
  appartenirResultat,
  contenirCave,
  createCave,
  createResultat,
  decaverJoueur,
  deleteCave,
  getAllJoueurs,
  getCavesJoueurPartie,
  getParticipantsPartie,
  getPartieById,
  getResultatJoueurPartie,
  getTableStack,
  getTotatlRecave,
  participerPartie,
  retirerParticipant,
  updateCave
} from "@/db/queries";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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

interface Joueur {
  id_joueur: number;
  pseudo: string;
  contact?: string | null;
}

interface ParticipantData {
  joueur: Joueur;
  heure: string | null;
  caves: Cave[];
  decaves: Decave[];
  totalCave: number;
  totalDecave: number;
  isActive: boolean;
}

interface Cave {
  id_cave: number;
  montant: number;
  heure_cave: string;
}

interface Decave {
  id_resultat: number;
  montant_restant: number;
  gain_perte: number;
}

interface Partie {
  id_partie: number;
  date_partie: string;
  big_blind: number;
  type_partie: string;
  max_recave?: number;
}

export default function PartieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { formatCurrency } = useCurrency();
  
  const [partie, setPartie] = useState<Partie | null>(null);
  const [participants, setParticipants] = useState<ParticipantData[]>([]);
  const [allJoueurs, setAllJoueurs] = useState<Joueur[]>([]);
  const [tableStackt, setTableStack] = useState(0);
  const [totalRecave, setTotalRecave] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Modals
  const [addPlayerModal, setAddPlayerModal] = useState(false);
  const [addCaveModal, setAddCaveModal] = useState(false);
  const [editCaveModal, setEditCaveModal] = useState(false);
  const [decaveModal, setDecaveModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [selectedParticipant, setSelectedParticipant] = useState<ParticipantData | null>(null);
  const [selectedCave, setSelectedCave] = useState<Cave | null>(null);
  
  // Form states
  const [caveMontant, setCaveMontant] = useState("");
  const [cashOutMontant, setCashOutMontant] = useState("");
  
  // Montants prédéfinis
  const predefinedAmounts = [
    100, 1000, 2000, 10000,
    200, 1200, 2500, 20000, 
    400, 1400, 4000, 40000,
    500, 1500, 5000, 50000,
    600, 1600, 6000, 60000,
    800, 1800, 8000, 80000];

  useEffect(() => {
    if (id) {
      loadPartieDetails();
    }
  }, [id]);
  const handleChangeCashOut = (text: string) => {
    // Convertir la saisie en nombre
    const valeur = parseFloat(text);
  
    // Vérifie si c'est un nombre valide et inférieur à une limite
    if (!isNaN(valeur) && valeur <= tableStackt) {
      setCashOutMontant(text);
      
    } else if (text === "") {
      setCashOutMontant(""); 
    } else {
    }
  };

  const handleChangeRecave = (text: string) => {
    // Convertir la saisie en nombre
    const valeur = parseFloat(text);
  
    // Vérifie si c'est un nombre valide et inférieur à une limite
    if(partie?.big_blind){
      if (!isNaN(valeur) && valeur <= partie?.big_blind * 200) {
        setCaveMontant(text);
        
      } else if (text === "") {
        setCaveMontant(""); 
      } else {
      }
    }
  };

  async function loadPartieDetails() {
    try {
      setLoading(true);
      
      // Charger les détails de la partie
      const partieData = await getPartieById(parseInt(id!));
      if (partieData.length > 0) {
        setPartie(partieData[0] as Partie);
      }
      
      // Charger les participants
      const participantsData = await getParticipantsPartie(parseInt(id!));
      
      // Pour chaque participant, charger ses caves et résultat
      const participantsWithData: ParticipantData[] = await Promise.all(
        participantsData.map(async (p) => {
          // Charger les caves du joueur pour cette partie
          const cavesData = await getCavesJoueurPartie(p.joueur.id_joueur, parseInt(id!));
          const caves: Cave[] = cavesData.map((c) => c.cave);
          const totalCave = caves.reduce((sum: number, cave: Cave) => sum + cave.montant, 0);
          
          // Charger tous les résultats (décaves) du joueur
          const resultatData = await getResultatJoueurPartie(p.joueur.id_joueur, parseInt(id!));
          const decaves: Decave[] = resultatData.map((r: any) => ({
            id_resultat: r.resultat.id_resultat,
            montant_restant: r.resultat.montant_restant,
            gain_perte: r.resultat.gain_perte
          }));
          const totalDecave = decaves.reduce((sum: number, d: Decave) => sum + d.montant_restant, 0);
          
          return {
            joueur: p.joueur,
            heure: p.heure,
            caves,
            decaves,
            totalCave,
            totalDecave,
            isActive: true // Le joueur est toujours actif, on peut toujours décaver
          };
        })
      );
      
      setParticipants(participantsWithData);
      
      // Charger tous les joueurs pour la sélection
      const joueursData = await getAllJoueurs();
      setAllJoueurs(joueursData);

      const tableStackResponse = await getTableStack(parseInt(id!));
      setTableStack(tableStackResponse);
      const totalRecaveResponse = await getTotatlRecave(parseInt(id!));
      setTotalRecave(totalRecaveResponse);
      
    } catch (error) {
      console.error("Erreur:", error);
      Alert.alert("Erreur", "Impossible de charger les détails de la partie");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddPlayer() {
    if (!selectedPlayer) return;
    
    try {
      const heure = new Date().toISOString();
      await participerPartie(selectedPlayer, parseInt(id!), heure);

      setAddPlayerModal(false);
      setSelectedPlayer(null);
      await loadPartieDetails();
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'ajouter le joueur");
    }
  }

  async function handleAddCave() {
    if (!selectedParticipant || !caveMontant.trim()) return;
    
    const montant = parseFloat(caveMontant);
    if(partie?.big_blind){
      if (isNaN(montant) || montant <= 0 || montant > partie?.big_blind * 200 || montant < partie.big_blind * 20) {
        console.log(montant <= partie.big_blind * 20 ," ", montant >= partie?.big_blind * 200);
        Alert.alert("Erreur", "Montant autorisé : entre 20 BB et 200 BB.(BB: Big Blind)");
        return;
      }
    }
    
    try {
      const heure = new Date().toISOString();
      
      // Créer la cave
      const cave = await createCave(montant, heure);
      const caveId = cave[0].id_cave;
      
      // Associer le joueur à la cave
      await acheterCave(selectedParticipant.joueur.id_joueur, caveId);
      
      // Associer la cave à la partie
      await contenirCave(caveId, parseInt(id!));
      setAddCaveModal(false);
      setSelectedParticipant(null);
      setCaveMontant("");
      await loadPartieDetails();
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'ajouter la cave");
    }
  }

  async function handleDecave() {
    if (!selectedParticipant || !cashOutMontant.trim()) return;
    
    const montant = parseFloat(cashOutMontant);
    if (isNaN(montant) || montant < 0) {
      Alert.alert("Erreur", "Le montant du cash out doit être un nombre positif ou zéro");
      return;
    }
    
    try {
      // Créer le résultat (décave)
      const gainPerte = montant - selectedParticipant.totalCave + selectedParticipant.totalDecave;
      const resultat = await createResultat(montant, gainPerte);
      const resultatId = resultat[0].id_resultat;
      
      // Associer le joueur au résultat
      await decaverJoueur(selectedParticipant.joueur.id_joueur, resultatId);
      
      // Associer le résultat à la partie
      await appartenirResultat(resultatId, parseInt(id!));
      setDecaveModal(false);
      setSelectedParticipant(null);
      setCashOutMontant("");
      await loadPartieDetails();
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'enregistrer le décave");
    }
  }

  async function handleRemoveParticipant(participant: ParticipantData) {
    if (participant.caves.length > 0) {
      Alert.alert(
        "Impossible de retirer",
        "Ce joueur a déjà des caves. Veuillez d'abord les supprimer.",
        [{ text: "OK" }]
      );
      return;
    }

    Alert.alert(
      "Confirmer le retrait",
      `Êtes-vous sûr de vouloir retirer ${participant.joueur.pseudo} de cette partie ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Retirer",
          style: "destructive",
          onPress: async () => {
            try {
              await retirerParticipant(participant.joueur.id_joueur, parseInt(id!));
              await loadPartieDetails();
            } catch (error) {
              Alert.alert("Erreur", "Impossible de retirer le joueur");
            }
          },
        },
      ]
    );
  }

  async function handleDeleteCave(caveId: number, participantPseudo: string) {
    Alert.alert(
      "Confirmer la suppression",
      `Êtes-vous sûr de vouloir supprimer cette cave de ${participantPseudo} ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteCave(caveId);
              await loadPartieDetails();
            } catch (error) {
              Alert.alert("Erreur", "Impossible de supprimer la cave");
            }
          },
        },
      ]
    );
  }

  function handleOpenEditCaveModal(cave: Cave, participant: ParticipantData) {
    setSelectedCave(cave);
    setSelectedParticipant(participant);
    setCaveMontant(cave.montant.toString());
    setEditCaveModal(true);
  }

  function handleCloseEditCaveModal() {
    setEditCaveModal(false);
    setSelectedCave(null);
    setSelectedParticipant(null);
    setCaveMontant("");
  }

  async function handleUpdateCave() {
    if (!selectedCave || !caveMontant.trim()) return;

    const montant = parseFloat(caveMontant);
    if (isNaN(montant) || montant <= 0) {
      Alert.alert("Erreur", "Le montant doit être un nombre positif");
      return;
    }

    try {
      await updateCave(selectedCave.id_cave, { montant });
      handleCloseEditCaveModal();
      await loadPartieDetails();
    } catch (error) {
      Alert.alert("Erreur", "Impossible de modifier la cave");
    }
  }

  function selectPredefinedAmount(amount: number) {
    setCaveMontant(amount.toString());
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const availableJoueurs = allJoueurs.filter(
    joueur => !participants.some(p => p.joueur.id_joueur === joueur.id_joueur)
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#8B5CF6" />
      </View>
    );
  }

  if (!partie) {
    return (
      <View style={styles.centerContainer}>
        <Text>Partie introuvable</Text>
      </View>
    );
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
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>
            {partie.type_partie === "cash_game" ? "Cash Game" : "Tournoi"}
          </Text>
          <Text style={styles.headerSubtitle}>
            {formatDate(partie.date_partie)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setAddPlayerModal(true)}
        >
          <Ionicons name="person-add" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Partie Info */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Big Blind:</Text>
          <Text style={styles.infoValue}>{formatCurrency(partie.big_blind)}</Text>
        </View>
        {partie.max_recave && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Max Recaves:</Text>
            <Text style={styles.infoValue}>{partie.max_recave}</Text>
          </View>
        )}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Participants:</Text>
          <Text style={styles.infoValue}>{participants.length}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Total recave:</Text>
          <Text style={styles.infoValue}>{totalRecave}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Table stakes:</Text>
          <Text style={styles.infoValue}>{tableStackt}</Text>
        </View>
      </View>

      {/* Participants List */}
      <ScrollView style={styles.participantsList} showsVerticalScrollIndicator={false}>
        {participants.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyStateText}>Aucun participant</Text>
            <Text style={styles.emptyStateSubtext}>
              Ajoutez des joueurs pour commencer la partie
            </Text>
          </View>
        ) : (
          participants.map((participant) => (
            <View key={participant.joueur.id_joueur} style={styles.participantCard}>
              <View style={styles.participantHeader}>
                <View style={styles.avatarContainer}>
                  <Ionicons name="person" size={24} color="#8B5CF6" />
                </View>
                <View style={styles.participantInfo}>
                  <Text style={styles.participantName}>
                    {participant.joueur.pseudo}
                  </Text>
                  <Text style={styles.participantStatus}>
                    {participant.isActive ? "En jeu" : "Terminé"}
                  </Text>
                </View>
                <View style={styles.participantActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                      setSelectedParticipant(participant);
                      setAddCaveModal(true);
                    }}
                  >
                    <Ionicons name="add-circle" size={20} color="#8B5CF6" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                      setSelectedParticipant(participant);
                      setDecaveModal(true);
                    }}
                  >
                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleRemoveParticipant(participant)}
                  >
                    <Ionicons name="remove-circle" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.participantStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Caves</Text>
                  <Text style={styles.statValue}>{formatCurrency(participant.totalCave)}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Cash out</Text>
                  <Text style={styles.statValue}>{formatCurrency(participant.totalDecave)}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Gain/Perte</Text>
                  <Text style={[
                    styles.statValue,
                    { color: participant.totalDecave - participant.totalCave >= 0 ? "#10B981" : "#EF4444" }
                  ]}>
                    {formatCurrency(participant.totalDecave - participant.totalCave)}
                  </Text>
                </View>
              </View>

              {/* Liste des caves */}
              {participant.caves.length > 0 && (
                <View style={styles.cavesContainer}>
                  <Text style={styles.cavesTitle}>Recaves ({participant.caves.length})</Text>
                  {participant.caves.map((cave, index) => (
                    <View key={cave.id_cave} style={styles.caveItem}>
                      <View style={styles.caveInfo}>
                        <Text style={styles.caveNumber}>Recave #{index + 1}</Text>
                        <Text style={styles.caveMontant}>{formatCurrency(cave.montant)}</Text>
                      </View>
                      <View style={styles.caveActions}>
                        <Text style={styles.caveTime}>
                          {new Date(cave.heure_cave).toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleOpenEditCaveModal(cave, participant)}
                        >
                          <Ionicons name="create-outline" size={16} color="#8B5CF6" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleDeleteCave(cave.id_cave, participant.joueur.pseudo)}
                        >
                          <Ionicons name="trash-outline" size={16} color="#EF4444" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* Liste des cash outs */}
              {participant.decaves.length > 0 && (
                <View style={styles.cavesContainer}>
                  <Text style={styles.cavesTitle}>Cash out ({participant.decaves.length})</Text>
                  {participant.decaves.map((decave, index) => (
                    <View key={decave.id_resultat} style={styles.caveItem}>
                      <View style={styles.caveInfo}>
                        <Text style={styles.caveNumber}>Cash out #{index + 1}</Text>
                        <Text style={styles.caveMontant}>{formatCurrency(decave.montant_restant)}</Text>
                      </View>
                      <View style={styles.caveActions}>
                        <Text style={[
                          styles.caveTime,
                          { color: decave.gain_perte >= 0 ? "#10B981" : "#EF4444" }
                        ]}>
                          {decave.gain_perte >= 0 ? '+' : ''}{formatCurrency(decave.gain_perte)}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>

      {/* Add Player Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addPlayerModal}
        onRequestClose={() => setAddPlayerModal(false)}
      >
        <KeyboardAvoidingView 
          style={styles.modalOverlay} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ajouter un joueur</Text>
              <TouchableOpacity onPress={() => setAddPlayerModal(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {availableJoueurs.map((joueur) => (
                <TouchableOpacity
                  key={joueur.id_joueur}
                  style={[
                    styles.playerOption,
                    selectedPlayer === joueur.id_joueur && styles.playerOptionSelected
                  ]}
                  onPress={() => setSelectedPlayer(joueur.id_joueur)}
                >
                  <View style={styles.avatarContainer}>
                    <Ionicons name="person" size={20} color="#8B5CF6" />
                  </View>
                  <Text style={styles.playerName}>{joueur.pseudo}</Text>
                  {selectedPlayer === joueur.id_joueur && (
                    <Ionicons name="checkmark-circle" size={20} color="#8B5CF6" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={[
                styles.submitButton,
                !selectedPlayer && styles.submitButtonDisabled,
              ]}
              onPress={handleAddPlayer}
              disabled={!selectedPlayer}
            >
              <Text style={styles.submitButtonText}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Add Cave Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addCaveModal}
        onRequestClose={() => setAddCaveModal(false)}
      >
        <KeyboardAvoidingView 
          style={styles.modalOverlay} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Recave de {selectedParticipant?.joueur.pseudo}
              </Text>
              <TouchableOpacity onPress={() => setAddCaveModal(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Montants rapides</Text>
              <View style={styles.predefinedAmountsContainer}>
                {predefinedAmounts.map((amount) => (
                  <TouchableOpacity
                    key={amount}
                    style={[
                      styles.predefinedAmountButton,
                      caveMontant === amount.toString() && styles.predefinedAmountButtonSelected
                    ]}
                    onPress={() => selectPredefinedAmount(amount)}
                  >
                    <Text style={[
                      styles.predefinedAmountText,
                      caveMontant === amount.toString() && styles.predefinedAmountTextSelected
                    ]}>
                      {amount}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Montant personnalisé *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="logo-euro" size={20} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  value={caveMontant}
                  onChangeText={handleChangeRecave}
                  placeholder="Montant"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                />
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                !caveMontant.trim() && styles.submitButtonDisabled,
              ]}
              onPress={handleAddCave}
              disabled={!caveMontant.trim()}
            >
              <Text style={styles.submitButtonText}>Ajouter la cave</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Edit Cave Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editCaveModal}
        onRequestClose={handleCloseEditCaveModal}
      >
        <KeyboardAvoidingView 
          style={styles.modalOverlay} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Modifier la cave - {selectedParticipant?.joueur.pseudo}
              </Text>
              <TouchableOpacity onPress={handleCloseEditCaveModal}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Montants rapides</Text>
              <View style={styles.predefinedAmountsContainer}>
                {predefinedAmounts.map((amount) => (
                  <TouchableOpacity
                    key={amount}
                    style={[
                      styles.predefinedAmountButton,
                      caveMontant === amount.toString() && styles.predefinedAmountButtonSelected
                    ]}
                    onPress={() => selectPredefinedAmount(amount)}
                  >
                    <Text style={[
                      styles.predefinedAmountText,
                      caveMontant === amount.toString() && styles.predefinedAmountTextSelected
                    ]}>
                      {amount}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Montant personnalisé *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="logo-euro" size={20} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  value={caveMontant}
                  onChangeText={setCaveMontant}
                  placeholder="Montant"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                />
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                !caveMontant.trim() && styles.submitButtonDisabled,
              ]}
              onPress={handleUpdateCave}
              disabled={!caveMontant.trim()}
            >
              <Text style={styles.submitButtonText}>Modifier la cave</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Decave Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={decaveModal}
        onRequestClose={() => setDecaveModal(false)}
      >
        <KeyboardAvoidingView 
          style={styles.modalOverlay} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Cash out - {selectedParticipant?.joueur.pseudo}
              </Text>
              <TouchableOpacity onPress={() => setDecaveModal(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.infoSummary}>
              <Text style={styles.infoSummaryTitle}>Résumé</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Total caves:</Text>
                <Text style={styles.infoValue}>
                  {formatCurrency(selectedParticipant?.totalCave || 0)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Cash out précédent:</Text>
                <Text style={styles.infoValue}>
                  {formatCurrency(selectedParticipant?.totalDecave || 0)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Disponible:</Text>
                <Text style={styles.infoValue}>
                  {tableStackt}
                </Text>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Montant du cash out *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="logo-euro" size={20} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  value={cashOutMontant}
                  onChangeText={handleChangeCashOut}
                  placeholder="Montant du cash out"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                />
              </View>
            </View>

            {cashOutMontant && (
              <View style={styles.calculResult}>
                <Text style={styles.calculLabel}>Nouveau total cash out:</Text>
                <Text style={[
                  styles.calculValue,
                  { color: "#111827" }
                ]}>
                  {formatCurrency(parseFloat(cashOutMontant) + (selectedParticipant?.totalDecave || 0))}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.submitButton,
                !cashOutMontant.trim() && styles.submitButtonDisabled,
              ]}
              onPress={handleDecave}
              disabled={!cashOutMontant.trim()}
            >
              <Text style={styles.submitButtonText}>Enregistrer le cash out</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </KeyboardAvoidingView>
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
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
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
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  addButton: {
    backgroundColor: "#8B5CF6",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  infoCard: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  participantsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  participantCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  participantHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  participantStatus: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  participantActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  participantStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
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
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
  },
  playerOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: "#F9FAFB",
  },
  playerOptionSelected: {
    backgroundColor: "#F3E8FF",
    borderWidth: 1,
    borderColor: "#8B5CF6",
  },
  playerName: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    marginLeft: 12,
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: "#111827",
    marginLeft: 8,
  },
  infoSummary: {
    backgroundColor: "#F3E8FF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoSummaryTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7C3AED",
    marginBottom: 8,
  },
  calculResult: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    marginBottom: 20,
  },
  calculLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  calculValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  submitButton: {
    backgroundColor: "#8B5CF6",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  cavesContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  cavesTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  caveItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    marginBottom: 6,
  },
  caveInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  caveNumber: {
    fontSize: 12,
    color: "#6B7280",
  },
  caveMontant: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  caveActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  caveTime: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  predefinedAmountsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  predefinedAmountButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  predefinedAmountButtonSelected: {
    backgroundColor: "#F3E8FF",
    borderColor: "#8B5CF6",
  },
  predefinedAmountText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  predefinedAmountTextSelected: {
    color: "#8B5CF6",
  },
});