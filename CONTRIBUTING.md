# 🤝 Guide de Contribution - Cave Ray

Merci de votre intérêt pour contribuer à **Cave Ray** ! Ce document vous guidera à travers le processus.

---

## 📋 Table des Matières

1. [Code de Conduite](#code-de-conduite)
2. [Comment Contribuer](#comment-contribuer)
3. [Structure du Projet](#structure-du-projet)
4. [Standards de Code](#standards-de-code)
5. [Processus de Review](#processus-de-review)

---

## 🌟 Code de Conduite

- Soyez respectueux et professionnel
- Accueillez les nouvelles idées
- Acceptez les critiques constructives
- Concentrez-vous sur ce qui est le mieux pour la communauté

---

## 🚀 Comment Contribuer

### 1. Fork et Clone

```bash
# Forkez le projet sur GitHub puis :
git clone https://github.com/votre-username/cave-ray.git
cd cave-ray
npm install
```

### 2. Créer une Branche

```bash
# Pour une nouvelle fonctionnalité
git checkout -b feature/nom-de-la-fonctionnalite

# Pour un bug fix
git checkout -b fix/description-du-bug

# Pour de la documentation
git checkout -b docs/description
```

### 3. Faire vos Modifications

Assurez-vous que votre code :

- ✅ Respecte les standards de code
- ✅ Est bien typé (TypeScript)
- ✅ Fonctionne sur iOS et Android
- ✅ Est documenté si nécessaire

### 4. Commit vos Changements

```bash
# Commits clairs et descriptifs
git add .
git commit -m "feat: ajout de la fonctionnalité X"
git commit -m "fix: correction du bug Y"
git commit -m "docs: mise à jour du README"
```

### 5. Push et Pull Request

```bash
git push origin feature/nom-de-la-fonctionnalite
```

Puis créez une Pull Request sur GitHub avec :

- Une description claire de vos changements
- Des captures d'écran si UI modifiée
- Les issues résolues (si applicable)

---

## 📁 Structure du Projet

```
cave-ray/
├── app/              # Screens (Expo Router)
├── db/               # Database (Schema, Queries)
├── components/       # Composants réutilisables
├── hooks/            # Custom hooks
├── utils/            # Fonctions utilitaires
├── constants/        # Constantes (couleurs, thème)
├── types/            # Types TypeScript
└── assets/           # Images, fonts
```

---

## 📝 Standards de Code

### TypeScript

```typescript
// ✅ Bon
export async function createJoueur(
  pseudo: string,
  contact?: string
): Promise<Joueur[]> {
  return await db.insert(schema.joueur).values({ pseudo, contact }).returning();
}

// ❌ Mauvais
export async function createJoueur(pseudo, contact) {
  return await db.insert(schema.joueur).values({ pseudo, contact }).returning();
}
```

### Composants React

```typescript
// ✅ Bon
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  title: string;
  onPress?: () => void;
};

export function Component({ title, onPress }: Props) {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
```

### Naming Conventions

- **Fichiers** : kebab-case (`stat-card.tsx`)
- **Composants** : PascalCase (`StatCard`)
- **Fonctions** : camelCase (`createJoueur`)
- **Constants** : UPPER_SNAKE_CASE (`MAX_RECAVE`)
- **Types** : PascalCase (`CreateJoueurInput`)

### Imports

```typescript
// Ordre des imports :
// 1. React & React Native
import React from "react";
import { View } from "react-native";

// 2. Bibliothèques externes
import { Ionicons } from "@expo/vector-icons";

// 3. Imports relatifs
import { db } from "@/db/database";
import { Colors } from "@/constants/colors";
```

---

## 🎨 Standards UI/UX

### Couleurs

Utilisez les couleurs définies dans `constants/colors.ts` :

```typescript
import { Colors } from "@/constants/colors";

// ✅ Bon
backgroundColor: Colors.primary;

// ❌ Mauvais
backgroundColor: "#8B5CF6";
```

### Espacements

Utilisez les espacements standardisés :

```typescript
import { Spacing } from "@/constants/colors";

padding: Spacing.lg; // 16
margin: Spacing.md; // 12
```

### Composants

- Utilisez `StyleSheet.create` pour les styles
- Ajoutez des ombres avec `Shadows` constants
- Utilisez `BorderRadius` constants

---

## 🗄️ Base de Données

### Ajouter une Table

1. Définir le schema dans `db/schema.ts`
2. Créer les queries dans `db/queries.ts`
3. Mettre à jour `db/database.ts` pour l'initialisation
4. Ajouter les types dans `types/index.ts`

### Queries Pattern

```typescript
// Toujours typer les retours
export async function getEntity(id: number): Promise<Entity[]> {
  return await db.select().from(schema.entity).where(eq(schema.entity.id, id));
}

// Toujours gérer les erreurs
try {
  const result = await createEntity(data);
  return result;
} catch (error) {
  console.error("Error:", error);
  throw error;
}
```

---

## 🧪 Tests (À venir)

Pour l'instant, testez manuellement :

1. Test sur iOS Simulator
2. Test sur Android Emulator
3. Test sur device réel si possible

---

## 🔍 Processus de Review

### Avant de Soumettre

- [ ] Le code compile sans erreurs
- [ ] Testé sur iOS et Android
- [ ] Documentation mise à jour si nécessaire
- [ ] Commits clairs et atomiques
- [ ] Pas de console.log() oubliés

### Checklist Pull Request

```markdown
## Description

[Description des changements]

## Type de changement

- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Tests

- [ ] Testé sur iOS
- [ ] Testé sur Android
- [ ] Pas de régression

## Screenshots

[Si UI modifiée]
```

---

## 🐛 Rapporter un Bug

Ouvrez une issue avec :

1. **Description claire** du bug
2. **Étapes pour reproduire**
3. **Comportement attendu** vs **comportement actuel**
4. **Screenshots** si applicable
5. **Environnement** (OS, version app, device)

Exemple :

```markdown
## Bug: Les parties ne se chargent pas

**Description**
Les parties ne s'affichent pas sur l'écran d'accueil

**Reproduction**

1. Ouvrir l'app
2. Aller dans l'onglet Parties
3. Aucune partie n'apparaît

**Attendu**
Les parties devraient s'afficher

**Environnement**

- iOS 17.0
- iPhone 14 Pro
- Version app: 1.0.0
```

---

## 💡 Proposer une Fonctionnalité

Ouvrez une issue "Feature Request" avec :

1. **Description** de la fonctionnalité
2. **Problème résolu** par cette fonctionnalité
3. **Solution proposée**
4. **Alternatives** considérées
5. **Mockups** si UI impliquée

---

## 📚 Ressources

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🎯 Roadmap

### v1.1.0

- [ ] Gestion complète des caves
- [ ] Association joueurs ↔ parties

### v1.2.0

- [ ] Calcul automatique des résultats
- [ ] Statistiques avancées

### v2.0.0

- [ ] Graphiques
- [ ] Export de données
- [ ] Mode sombre

---

## 📞 Contact

Pour toute question :

- Ouvrir une issue GitHub
- Discussion dans les Pull Requests

---

**Merci de contribuer à Cave Ray ! 🎴**
