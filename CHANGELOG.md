# 📝 Changelog - Cave Ray

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

---

## [1.0.0] - 2025-10-01

### 🎉 Version Initiale

#### ✨ Ajouté

**Base de Données**

- Implémentation de SQLite avec Drizzle ORM
- Schéma complet avec 9 tables selon la conception UML
- Tables principales : `cave`, `joueur`, `partie`, `resultat`
- Tables d'association : `acheter`, `participer`, `contenir`, `decaver`, `appartenir`
- Initialisation automatique de la base de données au premier lancement
- Queries typées pour toutes les opérations CRUD

**Écran Parties (Home)**

- Liste des parties récentes avec affichage chronologique
- Création de nouvelles parties (Cash Game / Tournoi)
- Configuration de la big blind (obligatoire)
- Configuration du nombre maximum de recaves (optionnel)
- Cartes statistiques : nombre de parties et nombre de joueurs
- Pull-to-refresh pour actualiser les données
- Empty state informatif quand aucune partie
- Design moderne avec cartes et ombres

**Écran Joueurs**

- Liste de tous les joueurs enregistrés
- Ajout de nouveaux joueurs avec pseudo (obligatoire) et contact (optionnel)
- Suppression de joueurs avec dialogue de confirmation
- Compteur dynamique de joueurs en header
- Avatars colorés pour chaque joueur
- Empty state informatif quand aucun joueur
- Modal bottom-sheet pour la création

**Navigation**

- Navigation par tabs (Parties / Joueurs)
- Icônes Ionicons cohérentes
- Couleurs personnalisées (violet/rose)
- Feedback haptique sur les tabs

**UI/UX**

- Design moderne et épuré
- Palette de couleurs cohérente (violet #8B5CF6, rose #EC4899)
- Typographie hiérarchisée
- Ombres et arrondis pour la profondeur
- Animations fluides
- Empty states informatifs
- Loading states avec ActivityIndicator
- Pull-to-refresh sur toutes les listes
- Modals bottom-sheet natives

**Hooks & Utils**

- Hook `useRefresh` pour le pull-to-refresh
- Fonctions de formatage de dates et montants
- Gestion du temps relatif

**Composants Réutilisables**

- `StatCard` : Carte de statistiques
- `EmptyState` : État vide générique

**Configuration**

- Constants pour les couleurs, espacements, ombres
- Types TypeScript complets pour toutes les entités
- Configuration ESLint

**Documentation**

- README complet avec fonctionnalités et installation
- Guide utilisateur détaillé
- Architecture technique documentée
- Guide de contribution
- Ce changelog

#### 🔒 Sécurité

- Validation des entrées utilisateur
- Gestion des erreurs avec try/catch
- Alerts pour les confirmations de suppression

#### 🎨 Palette de Couleurs

```
Primary Purple: #8B5CF6
Secondary Pink: #EC4899
Text Dark: #111827
Text Gray: #6B7280
Background: #F9FAFB
Border: #E5E7EB
```

---

## [Unreleased]

### 🚧 En Cours de Développement

#### 📋 Prévu pour v1.1.0

- Écran de détail d'une partie
- Association joueurs ↔ parties
- Gestion complète des caves (acheter, recaver)
- Enregistrement de l'heure d'arrivée des joueurs
- Liste des participants par partie

#### 📋 Prévu pour v1.2.0

- Enregistrement des décaves
- Calcul automatique des gains/pertes
- Historique détaillé par joueur
- Statistiques avancées :
  - Gain/perte moyen par partie
  - Nombre de parties par joueur
  - Classement des joueurs

#### 📋 Prévu pour v2.0.0

- Graphiques de performance
- Export des données (CSV, PDF)
- Mode sombre complet
- Notifications push
- Filtres et recherche avancée
- Synchronisation cloud (optionnel)

---

## Types de Changements

- **✨ Ajouté** : Nouvelles fonctionnalités
- **🔄 Modifié** : Changements dans les fonctionnalités existantes
- **🗑️ Déprécié** : Fonctionnalités bientôt supprimées
- **❌ Supprimé** : Fonctionnalités supprimées
- **🐛 Corrigé** : Corrections de bugs
- **🔒 Sécurité** : Corrections de vulnérabilités

---

## Notes de Version

### v1.0.0 - Version Initiale

Cette première version établit les fondations de l'application avec :

1. **Architecture Solide**

   - Base de données SQLite avec Drizzle ORM
   - Schéma relationnel complet
   - Navigation moderne avec Expo Router

2. **Fonctionnalités de Base**

   - Gestion des parties (création, lecture)
   - Gestion des joueurs (création, lecture, suppression)
   - Statistiques basiques

3. **UX/UI Professionnelle**
   - Design moderne et intuitif
   - Feedback visuel constant
   - Animations fluides
   - Pull-to-refresh

### Limitations Connues v1.0.0

- ⚠️ Pas encore d'association joueurs ↔ parties
- ⚠️ Gestion des caves non implémentée
- ⚠️ Calcul des résultats non disponible
- ⚠️ Pas de synchronisation entre devices
- ⚠️ Mode clair uniquement

Ces limitations seront adressées dans les versions futures.

---

## Roadmap

### Court Terme (v1.1.0 - v1.2.0)

- Implémentation complète du système de caves
- Association joueurs et parties
- Calcul automatique des résultats
- Statistiques avancées

### Moyen Terme (v2.0.0)

- Graphiques et visualisations
- Export de données
- Mode sombre
- Filtres avancés

### Long Terme (v3.0.0+)

- Synchronisation multi-devices
- Partage de parties entre utilisateurs
- Historique illimité
- Backup automatique
- Analytics avancés

---

## Remerciements

Merci à tous les contributeurs et utilisateurs de Cave Ray !

---

**Dernière mise à jour** : 1er octobre 2025  
**Version actuelle** : 1.0.0
