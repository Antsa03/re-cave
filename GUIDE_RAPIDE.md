# 🎮 Guide Rapide - Cave Ray

## 📱 Fonctionnalités Disponibles

### 1️⃣ Onglet "Parties" (Accueil)
**Vous pouvez :**
- ➕ Créer une nouvelle partie (bouton + en haut à droite)
- 👁️ Voir toutes vos parties avec :
  - Type (Cash Game ou Tournoi)
  - Date
  - Big Blind
  - Max recaves
- 📊 Voir les statistiques globales :
  - Nombre total de parties
  - Nombre total de joueurs
- 🗑️ **NOUVEAU** : Supprimer une partie (icône corbeille rouge à droite)
- 🔄 Rafraîchir en tirant vers le bas (pull to refresh)

**Comment créer une partie :**
1. Appuyez sur le bouton ➕
2. Remplissez le formulaire :
   - Big Blind (requis)
   - Type de partie : Cash Game ou Tournoi
   - Date et heure
   - Max recaves (optionnel)
3. Appuyez sur "Créer la partie"
4. ✅ La liste se recharge automatiquement

**Comment supprimer une partie :**
1. Trouvez la partie dans la liste
2. Appuyez sur l'icône 🗑️ à droite
3. Confirmez la suppression
4. ✅ La liste se recharge automatiquement

---

### 2️⃣ Onglet "Joueurs"
**Vous pouvez :**
- ➕ Ajouter un nouveau joueur
- 👁️ Voir tous les joueurs avec leur pseudo et contact
- ✏️ **NOUVEAU** : Modifier un joueur (icône crayon violet)
- 🗑️ Supprimer un joueur (icône corbeille rouge)

**Comment créer un joueur :**
1. Appuyez sur le bouton ➕ en haut à droite
2. Entrez le pseudo (requis)
3. Entrez le contact (optionnel) : email ou téléphone
4. Appuyez sur "Créer le joueur"
5. ✅ La liste se recharge automatiquement

**Comment modifier un joueur :**
1. Trouvez le joueur dans la liste
2. Appuyez sur l'icône ✏️ (crayon violet)
3. Modifiez le pseudo ou le contact
4. Appuyez sur "Modifier"
5. ✅ La liste se recharge automatiquement

**Comment supprimer un joueur :**
1. Trouvez le joueur dans la liste
2. Appuyez sur l'icône 🗑️ (corbeille rouge)
3. Confirmez la suppression
4. ✅ La liste se recharge automatiquement

---

### 3️⃣ Détails d'une Partie
**Pour accéder :** Appuyez sur une partie dans l'onglet "Parties"

**Vous pouvez :**

#### 👥 Gérer les participants
- ➕ Ajouter un joueur à la partie (bouton + en haut à droite)
- ❌ **NOUVEAU** : Retirer un participant (icône rouge)
  - ⚠️ Impossible si le joueur a déjà des caves

#### 💰 Gérer les caves
- ➕ Ajouter une cave à un joueur (icône + bleue)
- 👁️ **NOUVEAU** : Voir toutes les caves d'un joueur
  - Numéro de la cave
  - Montant
  - Heure d'achat
- 🗑️ **NOUVEAU** : Supprimer une cave (icône corbeille dans la liste)

#### 📊 Voir les statistiques en temps réel
Pour chaque participant :
- **Caves** : Total investi
- **Restant** : Montant final (après finalisation)
- **Gain/Perte** : Calculé automatiquement (vert = gain, rouge = perte)

#### ✅ Finaliser un joueur
- Appuyez sur l'icône ✓ verte
- Entrez le montant restant final
- Le gain/perte est calculé automatiquement
- Le joueur passe en statut "Terminé"

**Workflow typique :**
1. Créez une partie
2. Ajoutez les joueurs participants
3. Ajoutez les caves au fur et à mesure
4. En fin de partie, finalisez chaque joueur
5. Consultez les statistiques

---

### 4️⃣ Onglet "Statistiques"
**Vous pouvez voir :**
- Total des caves (argent mis en jeu)
- Gains totaux de tous les gagnants
- Pertes totales de tous les perdants
- Bilan global

---

## 🔄 Reload Automatique

**Après chaque opération, les données se rechargent automatiquement :**
- ✅ Après création
- ✅ Après modification
- ✅ Après suppression
- ✅ Après ajout de cave
- ✅ Après finalisation

**Plus besoin de :**
- Fermer et rouvrir l'app
- Changer d'onglet
- Tirer pour rafraîchir (sauf si vous voulez)

---

## 💡 Astuces

### Gérer les erreurs
- **"Ce joueur a déjà des caves"** : Supprimez d'abord toutes ses caves avant de retirer le participant
- **"Le pseudo est requis"** : Le pseudo ne peut pas être vide
- **"Le montant doit être un nombre positif"** : Vérifiez votre saisie

### Organisation
1. **Créez vos joueurs d'abord** dans l'onglet "Joueurs"
2. **Créez une partie** dans l'onglet "Parties"
3. **Ajoutez les participants** dans les détails de la partie
4. **Gérez les caves** pendant la partie
5. **Finalisez** en fin de partie

### Corrections rapides
- Mauvais montant de cave ? ➡️ Supprimez et recréez
- Mauvais participant ? ➡️ Retirez-le (s'il n'a pas de caves)
- Faute dans un pseudo ? ➡️ Modifiez-le directement
- Partie test ? ➡️ Supprimez-la

---

## 🎯 Exemples d'Utilisation

### Exemple 1 : Cash Game du vendredi
```
1. Créer partie : "Cash Game - Big Blind 1€"
2. Ajouter participants : Alice, Bob, Charlie
3. Alice achète 1 cave de 50€ → Total : 50€
4. Bob achète 2 caves de 50€ → Total : 100€
5. Charlie achète 1 cave de 50€ → Total : 50€
6. Fin de partie :
   - Alice reste avec 120€ → Gain : +70€ ✅
   - Bob reste avec 60€ → Perte : -40€ ❌
   - Charlie reste avec 20€ → Perte : -30€ ❌
```

### Exemple 2 : Tournoi buy-in 20€
```
1. Créer partie : "Tournoi - Big Blind 2€"
2. 5 joueurs participent
3. Chaque joueur 1 cave de 20€
4. Pas de recaves
5. Finaliser :
   - 1er : 120€ → +100€
   - 2ème : 40€ → +20€
   - 3ème à 5ème : 0€ → -20€
```

---

## ⚠️ Points Importants

### Avant de supprimer
- **Participant** : Vérifiez qu'il n'a pas de caves
- **Joueur** : Vérifiez qu'il ne participe à aucune partie en cours
- **Partie** : Toutes les données associées seront perdues

### Données sauvegardées localement
- Toutes les données sont stockées sur votre téléphone
- Aucune synchronisation cloud
- Faites des backups réguliers si nécessaire

### Performance
- L'app recharge automatiquement après chaque modification
- Si c'est trop lent, c'est que vous avez beaucoup de données
- Les anciennes parties peuvent être supprimées

---

## 🎨 Légende des Icônes

| Icône | Signification |
|-------|---------------|
| ➕ | Ajouter / Créer |
| ✏️ | Modifier |
| 🗑️ | Supprimer |
| ✅ | Finaliser / Terminer |
| ❌ | Retirer |
| 🔄 | Rafraîchir |
| 👁️ | Voir les détails |
| 💰 | Caves / Argent |
| 📊 | Statistiques |

---

## 🆘 Besoin d'Aide ?

### L'app ne se recharge pas ?
- Vérifiez votre connexion (pour l'Expo)
- Redémarrez l'app
- Vérifiez la console pour les erreurs

### Les données ne s'affichent pas ?
- Tirez vers le bas pour rafraîchir
- Changez d'onglet et revenez
- Redémarrez l'app

### Bug ou problème ?
1. Notez l'action qui cause le problème
2. Vérifiez la console
3. Redémarrez l'app
4. Si ça persiste, signalez le bug

---

## 🚀 Bon jeu ! 🎰
