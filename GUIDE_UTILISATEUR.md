# 📖 Guide d'Utilisation - Cave Ray

## 🚀 Démarrage Rapide

### 1. Premier Lancement

Au premier lancement, la base de données SQLite est automatiquement initialisée avec toutes les tables nécessaires.

### 2. Navigation

L'application dispose de 2 onglets principaux :

- **Parties** : Gestion des parties de poker
- **Joueurs** : Gestion des joueurs

---

## 🎮 Gestion des Parties

### Créer une Nouvelle Partie

1. Sur l'écran **Parties**, appuyez sur le bouton **+** (violet) en haut à droite
2. Choisissez le type de partie :
   - **Cash Game** : Partie avec mises réelles
   - **Tournoi** : Partie avec élimination
3. Renseignez la **Big Blind** (obligatoire)
4. Optionnel : Indiquez le nombre maximum de recaves
5. Appuyez sur **Créer la partie**

### Consulter les Parties

- Les parties sont affichées par ordre chronologique (plus récentes en premier)
- Chaque carte affiche :
  - Type de partie (Cash Game / Tournoi)
  - Date de la partie
  - Montant de la big blind
  - Nombre max de recaves (si défini)

### Rafraîchir les Données

Tirez vers le bas (pull-to-refresh) sur la liste pour actualiser les données.

---

## 👥 Gestion des Joueurs

### Ajouter un Joueur

1. Sur l'écran **Joueurs**, appuyez sur le bouton avec l'icône personne
2. Entrez le **pseudo** du joueur (obligatoire, unique)
3. Optionnel : Ajoutez les informations de contact (email ou téléphone)
4. Appuyez sur **Créer le joueur**

### Supprimer un Joueur

1. Trouvez le joueur dans la liste
2. Appuyez sur l'icône de poubelle rouge à droite
3. Confirmez la suppression dans la boîte de dialogue

### Consulter les Joueurs

- Les joueurs sont affichés avec leur avatar violet
- Le pseudo et les informations de contact sont visibles sur chaque carte
- Le compteur en haut indique le nombre total de joueurs enregistrés

---

## 📊 Statistiques

### Écran d'Accueil

Deux cartes statistiques sont affichées :

- **Parties** (violet) : Nombre total de parties enregistrées
- **Joueurs** (rose) : Nombre total de joueurs enregistrés

Ces statistiques se mettent à jour automatiquement.

---

## 🎨 Interface

### Palette de Couleurs

- **Violet (#8B5CF6)** : Couleur principale, actions primaires
- **Rose (#EC4899)** : Couleur secondaire, statistiques
- **Gris** : Textes et bordures

### Éléments d'Interface

- **Cards blanches** : Conteneurs d'information avec ombres légères
- **Boutons flottants** : Actions principales (ajouter)
- **Modals** : Formulaires de création (style bottom-sheet)
- **Empty states** : Messages informatifs quand il n'y a pas de données

---

## 💡 Astuces

### Organisation

1. **Créez d'abord vos joueurs** avant de commencer une partie
2. **Utilisez des pseudos uniques** pour éviter les confusions
3. **Ajoutez les contacts** pour faciliter la communication

### Bonnes Pratiques

- Créez la partie **avant** de commencer à jouer
- Notez la big blind **exactement** comme décidé
- Utilisez le type **Cash Game** pour les parties classiques
- Utilisez **Tournoi** pour les compétitions avec élimination

---

## 🔄 Rafraîchissement des Données

### Pull-to-Refresh

Sur tous les écrans avec liste :

1. Tirez vers le bas avec votre doigt
2. Relâchez pour déclencher le rafraîchissement
3. Les données sont rechargées depuis la base de données

### Rechargement Automatique

Les données se rechargent automatiquement :

- Après la création d'une partie
- Après l'ajout d'un joueur
- Après la suppression d'un joueur
- Au retour sur un écran

---

## 📱 Navigation

### Onglets Inférieurs

- **Parties** (icône manette) : Écran principal
- **Joueurs** (icône personnes) : Gestion des joueurs

### Modals

- **Modal Nouvelle Partie** : Appuyez sur le **+** de l'écran Parties
- **Modal Nouveau Joueur** : Appuyez sur le bouton avec icône personne de l'écran Joueurs
- **Fermer un modal** : Appuyez sur la **croix** ou glissez vers le bas

---

## 🛠️ Fonctionnalités à Venir

Les fonctionnalités suivantes seront ajoutées prochainement :

### Gestion des Caves

- Acheter des caves pour un joueur
- Suivre les montants des caves
- Historique des caves par joueur

### Participation aux Parties

- Ajouter des joueurs à une partie
- Enregistrer l'heure d'arrivée/départ
- Voir les participants d'une partie

### Résultats et Statistiques

- Enregistrer les résultats finaux
- Calculer les gains/pertes
- Graphiques de performance
- Classement des joueurs

### Fonctionnalités Avancées

- Export des données (CSV, PDF)
- Filtres et recherche
- Notifications
- Mode sombre
- Synchronisation cloud

---

## ⚠️ Limitations Actuelles

### Version 1.0.0

Cette version initiale permet de :

- ✅ Créer et consulter des parties
- ✅ Gérer les joueurs
- ✅ Voir les statistiques de base

Pas encore disponible :

- ❌ Association joueurs ↔ parties
- ❌ Gestion des caves
- ❌ Calcul des gains/pertes
- ❌ Historique détaillé

---

## 🆘 Support

### Problèmes Courants

**La base de données ne se charge pas**

- Redémarrez l'application
- Vérifiez les logs dans la console

**Erreur lors de la création**

- Vérifiez que tous les champs obligatoires sont remplis
- Pour les joueurs, assurez-vous que le pseudo est unique

**Les données ne s'affichent pas**

- Utilisez le pull-to-refresh
- Vérifiez votre connexion

---

## 📝 Changelog

### Version 1.0.0 (Octobre 2025)

- ✨ Interface moderne et intuitive
- 🎮 Gestion des parties (Cash Game / Tournoi)
- 👥 Gestion des joueurs
- 📊 Statistiques de base
- 🗄️ Base de données SQLite avec Drizzle ORM
- 🔄 Pull-to-refresh
- 📱 Design responsive mobile

---

**Version du guide**: 1.0.0  
**Dernière mise à jour**: Octobre 2025
