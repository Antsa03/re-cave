/**
 * Types globaux pour l'application Cave Ray
 */

// Types de base de données
export type Joueur = {
  id_joueur: number;
  pseudo: string;
  contact: string | null;
};

export type Partie = {
  id_partie: number;
  date_partie: string;
  big_blind: number;
  type_partie: "cash_game" | "tournament";
  max_recave: number | null;
};

export type Cave = {
  id_cave: number;
  montant: number;
  heure_cave: string;
};

export type Resultat = {
  id_resultat: number;
  montant_restant: number;
  gain_perte: number;
};

// Types de relations
export type Acheter = {
  id: number;
  id_joueur: number;
  id_cave: number;
};

export type Participer = {
  id: number;
  id_joueur: number;
  id_partie: number;
  heure: string | null;
};

export type Contenir = {
  id: number;
  id_cave: number;
  id_partie: number;
};

export type Decaver = {
  id: number;
  id_joueur: number;
  id_resultat: number;
};

export type Appartenir = {
  id: number;
  id_resultat: number;
  id_partie: number;
};

// Types pour les vues enrichies
export type PartieAvecParticipants = Partie & {
  participants: (Joueur & { heure: string | null })[];
};

export type JoueurAvecStats = Joueur & {
  nombreParties: number;
  gainTotal: number;
  perteTotal: number;
};

// Types pour les formulaires
export type CreatePartieInput = {
  type_partie: "cash_game" | "tournament";
  big_blind: number;
  max_recave?: number;
};

export type CreateJoueurInput = {
  pseudo: string;
  contact?: string;
};

export type CreateCaveInput = {
  montant: number;
  heure_cave: string;
};

// Types pour les statistiques
export type Stats = {
  nombreParties: number;
  nombreJoueurs: number;
  nombreCaves: number;
  montantTotal: number;
};

// Types pour la navigation
export type RootStackParamList = {
  "(tabs)": undefined;
  modal: undefined;
};

export type TabsParamList = {
  index: undefined;
  explore: undefined;
};
