# 🎴 Cave Ray - Application de Gestion de Cave de Poker

Application mobile React Native / Expo pour la gestion de parties de poker, des joueurs et des caves.

## 📱 Fonctionnalités

### ✅ Implémentées

- **Gestion des Parties**

  - Création de parties (Cash Game / Tournoi)
  - Affichage des parties récentes
  - Configuration de la big blind
  - Nombre maximum de recaves

- **Gestion des Joueurs**
  - Ajout de joueurs avec pseudo et contact
  - Liste des joueurs enregistrés
  - Suppression de joueurs
- **Base de données SQLite avec Drizzle ORM**

  - Schéma complet selon la conception UML
  - Tables : Cave, Joueur, Partie, Résultat
  - Tables d'association pour les relations many-to-many

- **Interface UX/UI Mobile Moderne**
  - Design épuré avec palette de couleurs violet/rose
  - Cards avec ombres et arrondis
  - Animations et feedbacks tactiles
  - Empty states informatifs
  - Modals bottom-sheet

## 🏗️ Architecture de la Base de Données

```
CAVE (id_cave, montant, heure_cave)
  ├─ Acheter ─> JOUEUR
  └─ Contenir ─> PARTIE

JOUEUR (id_joueur, pseudo, contact)
  ├─ Acheter ─> CAVE
  ├─ Participer ─> PARTIE
  └─ Decaver ─> RESULTAT

PARTIE (id_partie, date_partie, big_blind, type_partie, max_recave)
  ├─ Contenir ─> CAVE
  ├─ Participer ─> JOUEUR
  └─ Appartenir ─> RESULTAT

RESULTAT (id_resultat, montant_restant, gain_perte)
  ├─ Decaver ─> JOUEUR
  └─ Appartenir ─> PARTIE
```

## 📂 Structure du Projet

```
cave-ray/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx        # Navigation tabs
│   │   ├── index.tsx           # Écran des parties
│   │   └── explore.tsx         # Écran des joueurs
│   ├── modal.tsx               # Modal création de partie
│   └── _layout.tsx
├── db/
│   ├── schema.ts               # Schéma Drizzle ORM
│   ├── database.ts             # Configuration SQLite
│   └── queries.ts              # Requêtes base de données
├── components/                 # Composants réutilisables
├── constants/                  # Thèmes et constantes
└── assets/                     # Images et ressources
```

## 🚀 Installation et Démarrage

```bash
# Installation des dépendances
npm install

# Démarrer l'application
npm start

# Lancer sur Android
npm run android

# Lancer sur iOS
npm run ios
```

## 📦 Dépendances Principales

- **React Native** - Framework mobile
- **Expo** - Plateforme de développement
- **Expo Router** - Navigation
- **Drizzle ORM** - ORM TypeScript
- **expo-sqlite** - Base de données SQLite
- **@expo/vector-icons** - Icônes

## 🎨 Design System

### Couleurs

- **Primary Purple**: `#8B5CF6`
- **Primary Pink**: `#EC4899`
- **Text Dark**: `#111827`
- **Text Gray**: `#6B7280`
- **Background**: `#F9FAFB`
- **Border**: `#E5E7EB`

### Typography

- **Title**: 28px, Bold
- **Subtitle**: 20px, Semibold
- **Body**: 16px, Regular
- **Caption**: 14px, Regular

## 🔮 Fonctionnalités à Venir

- [ ] Gestion complète des caves (acheter, décaver)
- [ ] Association joueurs ↔ parties
- [ ] Calcul automatique des gains/pertes
- [ ] Historique détaillé par joueur
- [ ] Statistiques avancées
- [ ] Graphiques de performance
- [ ] Export des données
- [ ] Mode sombre complet
- [ ] Filtres et recherche
- [ ] Notifications

## 🛠️ Développement

### Requêtes Disponibles

```typescript
// Joueurs
createJoueur(pseudo, contact?)
getAllJoueurs()
getJoueurById(id)
deleteJoueur(id)

// Parties
createPartie(date, bigBlind, type, maxRecave?)
getAllParties()
getPartieById(id)
deletePartie(id)

// Caves
createCave(montant, heure)
getAllCaves()
getCaveById(id)

// Relations
acheterCave(idJoueur, idCave)
participerPartie(idJoueur, idPartie, heure?)
getParticipantsPartie(idPartie)
```

## 📝 Notes Techniques

- Base de données initialisée au premier lancement
- Gestion d'erreurs avec try/catch et Alerts
- États de chargement avec ActivityIndicator
- Formulaires avec validation
- TypeScript strict activé

## 👨‍💻 Développé avec

- TypeScript
- React Native
- Expo SDK 54
- Drizzle ORM
- SQLite

---

**Version**: 1.0.0  
**License**: MIT
