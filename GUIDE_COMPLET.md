# 📚 Guide d'Utilisation Complet - Cave Ray

## 🎯 Vue d'ensemble

**Cave Ray** est votre application complète pour gérer vos parties de poker, que ce soit en Cash Game ou en Tournoi. Elle vous permet de suivre les joueurs, gérer les caves, calculer les résultats et analyser vos performances.

---

## 🚀 Fonctionnalités Principales

### ✅ **Gestion des Parties**
- Créer des parties (Cash Game ou Tournoi)
- Configurer la big blind et le nombre maximum de recaves
- Ajouter/retirer des joueurs pendant la partie
- Naviguer vers les détails d'une partie en appuyant dessus

### ✅ **Gestion des Joueurs** 
- Ajouter des joueurs avec pseudo et contact (optionnel)
- Liste complète des joueurs enregistrés
- Suppression de joueurs (avec confirmation)

### ✅ **Gestion des Caves en Temps Réel**
- Ajouter des caves pour chaque joueur pendant la partie
- Suivi du montant total des caves par joueur
- Association automatique caves ↔ partie ↔ joueur

### ✅ **Calcul des Résultats**
- Enregistrer le montant restant de chaque joueur en fin de partie
- Calcul automatique du gain/perte (montant final - total caves)
- Historique des résultats par joueur et par partie

### ✅ **Statistiques et Analytics**
- Vue d'ensemble : nombre de parties, joueurs actifs
- Statistiques financières : total caves, gains, pertes, bilan net
- Historique des parties récentes
- Rafraîchissement en temps réel

---

## 📱 Navigation dans l'Application

### **Onglet Parties (🎮)**
- **Écran principal** : Liste des parties récentes avec statistiques
- **Bouton +** : Créer une nouvelle partie
- **Appuyer sur une partie** : Accéder aux détails et gestion

### **Onglet Joueurs (👥)**  
- **Liste des joueurs** : Tous les joueurs enregistrés
- **Bouton +** : Ajouter un nouveau joueur
- **Icône poubelle** : Supprimer un joueur (avec confirmation)

### **Onglet Statistiques (📊)**
- **Cartes de stats** : Parties totales, joueurs actifs
- **Stats financières** : Caves, gains, pertes, bilan net
- **Parties récentes** : Historique avec détails

---

## 🎯 Guide Étape par Étape

### **1. Créer une Nouvelle Partie**

1. **Accédez** à l'onglet **Parties**
2. **Appuyez** sur le bouton **+** (violet)
3. **Choisissez** le type :
   - **Cash Game** : Partie d'argent classique
   - **Tournoi** : Compétition avec buy-in fixe
4. **Configurez** :
   - **Big Blind** : Montant en euros (obligatoire)
   - **Max Recaves** : Nombre maximum de recaves autorisées (optionnel)
5. **Validez** avec "Créer la partie"

### **2. Ajouter des Joueurs à une Partie**

1. **Appuyez** sur une partie dans la liste
2. **Utilisez** le bouton **+** dans le header
3. **Sélectionnez** un joueur dans la liste
4. **Confirmez** avec "Ajouter"

> 💡 **Astuce** : Si le joueur n'existe pas encore, allez dans l'onglet Joueurs pour le créer d'abord.

### **3. Gérer les Caves pendant une Partie**

1. **Dans les détails** d'une partie
2. **Trouvez** le joueur dans la liste des participants
3. **Appuyez** sur l'icône **+** (cercle bleu) à côté de son nom
4. **Saisissez** le montant de la cave
5. **Validez** avec "Ajouter la cave"

> 📝 **Note** : Chaque cave est horodatée et associée automatiquement au joueur et à la partie.

### **4. Finaliser un Joueur (Calculer les Résultats)**

1. **Dans les détails** d'une partie  
2. **Appuyez** sur l'icône **✓** (cercle vert) à côté du joueur
3. **Saisissez** le montant restant final du joueur
4. **Vérifiez** le calcul automatique du gain/perte
5. **Validez** avec "Enregistrer le résultat"

**Formule** : `Gain/Perte = Montant Final - Total des Caves`

### **5. Créer un Nouveau Joueur**

1. **Allez** dans l'onglet **Joueurs**
2. **Appuyez** sur le bouton **+**
3. **Remplissez** :
   - **Pseudo** : Nom d'affichage (obligatoire, unique)
   - **Contact** : Email ou téléphone (optionnel)
4. **Validez** avec "Créer le joueur"

---

## 💡 Conseils d'Utilisation

### **📋 Workflow Recommandé**

1. **Avant la séance** :
   - Créer tous les joueurs participants
   - Créer la partie avec la configuration correcte

2. **Pendant la partie** :
   - Ajouter les joueurs au fur et à mesure qu'ils arrivent
   - Enregistrer chaque cave immédiatement
   - Utiliser le pull-to-refresh pour actualiser les données

3. **Fin de partie** :
   - Finaliser chaque joueur avec son montant restant
   - Vérifier les calculs dans l'écran de statistiques

### **🔧 Fonctionnalités Avancées**

- **Pull-to-refresh** : Tirez vers le bas pour actualiser les listes
- **KeyboardAvoidingView** : Les formulaires s'adaptent automatiquement au clavier
- **Validation** : Tous les montants sont validés (nombres positifs uniquement)
- **Confirmation** : Toutes les suppressions demandent confirmation
- **Horodatage** : Chaque action est enregistrée avec date et heure

### **📊 Lecture des Statistiques**

- **Total Caves** : Somme de toutes les caves de toutes les parties
- **Gains Totaux** : Somme de tous les résultats positifs
- **Pertes Totales** : Somme de tous les résultats négatifs (en valeur absolue)
- **Bilan Net** : Gains - Pertes (peut être positif ou négatif)

---

## ⚠️ Points d'Attention

### **🔒 Sécurité des Données**
- Toutes les données sont stockées localement sur votre appareil
- Aucune synchronisation cloud automatique
- Sauvegardez régulièrement votre base de données

### **📱 Interface et Performance**
- L'interface s'adapte automatiquement à l'affichage du clavier
- Les statistiques sont calculées en temps réel
- Pour de meilleures performances, limitez à ~50 parties par calcul de stats

### **💰 Gestion Financière**
- Tous les montants sont en euros avec 2 décimales
- Les calculs de gain/perte sont automatiques et précis
- Vérifiez toujours les montants avant validation finale

---

## 🛠️ Dépannage

### **Problème : L'application ne démarre pas**
- Vérifiez que vous utilisez Node.js 16+ 
- Redémarrez l'application avec `npm start`

### **Problème : Données incohérentes**
- Utilisez le pull-to-refresh dans chaque écran
- Redémarrez l'application si nécessaire

### **Problème : Clavier cache les champs**
- Tous les formulaires utilisent KeyboardAvoidingView
- Faites défiler si nécessaire pour voir les champs

---

## 🎯 Raccourcis et Astuces

| Action | Raccourci |
|--------|-----------|
| Créer une partie | Bouton **+** (onglet Parties) |
| Créer un joueur | Bouton **+** (onglet Joueurs) |
| Ajouter un joueur à une partie | Bouton **+** (détail partie) |
| Ajouter une cave | Icône **+** bleue (à côté du joueur) |
| Finaliser un joueur | Icône **✓** verte (à côté du joueur) |
| Actualiser | Pull-to-refresh (tirer vers le bas) |
| Voir détail partie | Appuyer sur la carte de partie |
| Supprimer un joueur | Icône poubelle rouge |

---

## 📈 Évolutions Futures

### **🔄 En Développement**
- Graphiques de performance avancés
- Export des données (CSV, PDF)
- Mode sombre / clair
- Notifications de rappel

### **💡 Améliorations Planifiées**  
- Synchronisation cloud optionnelle
- Gestion multi-devises
- Templates de parties récurrentes
- Calcul de buy-ins moyens

---

**Version** : 2.0.0 - Complète  
**Dernière mise à jour** : Octobre 2025  
**Support** : Application développée avec React Native, Expo & SQLite

🎴 **Bonnes parties et bonne gestion avec Cave Ray !** 🎴