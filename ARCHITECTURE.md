# 🏗️ Architecture Technique - Cave Ray

## 📚 Stack Technologique

### Frontend

- **React Native** 0.81.4
- **Expo** ~54.0.12
- **TypeScript** ~5.9.2
- **Expo Router** ~6.0.10 (Navigation file-based)

### Base de Données

- **expo-sqlite** (SQLite embarqué)
- **Drizzle ORM** (TypeScript ORM)

### UI/UX

- **@expo/vector-icons** (Ionicons)
- **React Native Reanimated** (Animations)
- **React Native Gesture Handler** (Gestures)

---

## 🗂️ Structure des Dossiers

```
cave-ray/
├── app/                        # Screens (Expo Router)
│   ├── (tabs)/                 # Tabs navigation
│   │   ├── _layout.tsx         # Tabs configuration
│   │   ├── index.tsx           # Screen: Parties
│   │   └── explore.tsx         # Screen: Joueurs
│   ├── _layout.tsx             # Root layout
│   └── modal.tsx               # Modal: Créer partie
│
├── db/                         # Database layer
│   ├── schema.ts               # Drizzle schema definitions
│   ├── database.ts             # Database initialization
│   └── queries.ts              # Database queries
│
├── components/                 # Reusable components
│   ├── stat-card.tsx           # Statistics card
│   ├── empty-state.tsx         # Empty state component
│   ├── themed-text.tsx         # Themed text
│   ├── themed-view.tsx         # Themed view
│   └── ui/                     # UI components
│
├── constants/                  # Constants & theme
│   ├── colors.ts               # Color palette
│   └── theme.ts                # Theme configuration
│
├── hooks/                      # Custom hooks
│   ├── use-refresh.ts          # Pull-to-refresh hook
│   ├── use-color-scheme.ts     # Color scheme hook
│   └── use-theme-color.ts      # Theme color hook
│
├── utils/                      # Utility functions
│   └── formatters.ts           # Date/number formatters
│
└── assets/                     # Static assets
    └── images/                 # Images
```

---

## 🗄️ Modèle de Données

### Schéma Relationnel

```sql
-- Tables principales
CAVE (id_cave, montant, heure_cave)
JOUEUR (id_joueur, pseudo, contact)
PARTIE (id_partie, date_partie, big_blind, type_partie, max_recave)
RESULTAT (id_resultat, montant_restant, gain_perte)

-- Tables d'association (Many-to-Many)
ACHETER (id, id_joueur, id_cave)
PARTICIPER (id, id_joueur, id_partie, heure)
CONTENIR (id, id_cave, id_partie)
DECAVER (id, id_joueur, id_resultat)
APPARTENIR (id, id_resultat, id_partie)
```

### Diagramme de Relations

```
JOUEUR ──┬─ Acheter ──> CAVE ── Contenir ──> PARTIE
         ├─ Participer ────────────────────> PARTIE
         └─ Decaver ──> RESULTAT ── Appartenir ──> PARTIE
```

### Types TypeScript

```typescript
// Drizzle Schema
export const joueur = sqliteTable("joueur", {
  id_joueur: integer("id_joueur").primaryKey({ autoIncrement: true }),
  pseudo: text("pseudo").notNull().unique(),
  contact: text("contact"),
});

export const partie = sqliteTable("partie", {
  id_partie: integer("id_partie").primaryKey({ autoIncrement: true }),
  date_partie: text("date_partie").notNull(),
  big_blind: real("big_blind").notNull(),
  type_partie: text("type_partie").notNull(),
  max_recave: integer("max_recave"),
});
```

---

## 🔄 Flux de Données

### Création d'une Partie

```
User Input (Modal)
    ↓
Validation
    ↓
createPartie(data)
    ↓
Drizzle ORM
    ↓
SQLite Database
    ↓
Refresh UI
    ↓
Display Updated List
```

### Récupération des Données

```
Component Mount
    ↓
loadData()
    ↓
getAllParties() / getAllJoueurs()
    ↓
Drizzle ORM Query
    ↓
SQLite Database
    ↓
setState(data)
    ↓
Render UI
```

---

## 🎨 Design Patterns

### Component Architecture

```typescript
// Functional Components avec Hooks
export default function Screen() {
  const [state, setState] = useState();

  useEffect(() => {
    // Side effects
  }, []);

  return <View>...</View>;
}
```

### Custom Hooks

```typescript
// hooks/use-refresh.ts
export function useRefresh(refreshFunction) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshFunction();
    setRefreshing(false);
  }, [refreshFunction]);

  return { refreshing, onRefresh };
}
```

### Database Queries Pattern

```typescript
// db/queries.ts
export async function createEntity(data) {
  return await db.insert(table).values(data).returning();
}

export async function getAllEntities() {
  return await db.select().from(table);
}

export async function getEntityById(id) {
  return await db.select().from(table).where(eq(table.id, id));
}
```

---

## 🔌 API (Database Queries)

### Joueurs

```typescript
// Créer un joueur
createJoueur(pseudo: string, contact?: string): Promise<Joueur[]>

// Lister tous les joueurs
getAllJoueurs(): Promise<Joueur[]>

// Obtenir un joueur par ID
getJoueurById(id: number): Promise<Joueur[]>

// Supprimer un joueur
deleteJoueur(id: number): Promise<void>
```

### Parties

```typescript
// Créer une partie
createPartie(
  date_partie: string,
  big_blind: number,
  type_partie: string,
  max_recave?: number
): Promise<Partie[]>

// Lister toutes les parties
getAllParties(): Promise<Partie[]>

// Obtenir une partie par ID
getPartieById(id: number): Promise<Partie[]>

// Supprimer une partie
deletePartie(id: number): Promise<void>
```

### Caves

```typescript
// Créer une cave
createCave(montant: number, heure_cave: string): Promise<Cave[]>

// Lister toutes les caves
getAllCaves(): Promise<Cave[]>
```

### Relations

```typescript
// Associer joueur et cave
acheterCave(id_joueur: number, id_cave: number): Promise<void>

// Associer joueur et partie
participerPartie(
  id_joueur: number,
  id_partie: number,
  heure?: string
): Promise<void>

// Obtenir les participants d'une partie
getParticipantsPartie(id_partie: number): Promise<{
  joueur: Joueur,
  heure: string
}[]>
```

---

## 🎯 State Management

### Local Component State

```typescript
// useState pour l'état local
const [data, setData] = useState<Type[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<Error | null>(null);
```

### Database as Single Source of Truth

```
SQLite Database
    ↓
Component State (temporary)
    ↓
UI Render
```

Pas de state management global (Redux, MobX) nécessaire pour cette version.

---

## 🔐 Validation & Error Handling

### Input Validation

```typescript
if (!pseudo.trim()) {
  Alert.alert("Erreur", "Le pseudo est requis");
  return;
}

if (isNaN(bigBlind) || bigBlind <= 0) {
  Alert.alert("Erreur", "La big blind doit être positive");
  return;
}
```

### Error Handling Pattern

```typescript
async function operation() {
  setLoading(true);
  try {
    await databaseOperation();
    Alert.alert("Succès", "Opération réussie");
  } catch (error) {
    console.error("Erreur:", error);
    Alert.alert("Erreur", "Opération échouée");
  } finally {
    setLoading(false);
  }
}
```

---

## 🎨 Styling Architecture

### StyleSheet Pattern

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  card: {
    ...Shadows.small,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
});
```

### Theme Constants

```typescript
// constants/colors.ts
export const Colors = {
  primary: "#8B5CF6",
  secondary: "#EC4899",
  textDark: "#111827",
  // ...
};

// constants/colors.ts
export const Spacing = {
  sm: 8,
  md: 12,
  lg: 16,
  // ...
};
```

---

## 🚀 Performance Optimizations

### Database Initialization

```typescript
// Initialisation unique au premier lancement
let isInitialized = false;

export async function initDatabase() {
  if (isInitialized) return;
  // ... création des tables
  isInitialized = true;
}
```

### Lazy Loading

```typescript
// Import dynamique pour réduire le bundle initial
const { getAllJoueurs } = await import("@/db/queries");
```

### Memoization (Future)

```typescript
// À implémenter si nécessaire
const memoizedValue = useMemo(() => computeValue(data), [data]);
```

---

## 🧪 Testing Strategy (À implémenter)

### Unit Tests

- Tests des fonctions utilitaires
- Tests des queries de base de données
- Tests des custom hooks

### Integration Tests

- Tests des flows complets (création, lecture, suppression)
- Tests des interactions entre composants

### E2E Tests

- Tests des parcours utilisateur complets
- Tests sur simulateurs/devices réels

---

## 📦 Build & Deployment

### Development

```bash
npm start              # Expo development server
npm run android        # Run on Android
npm run ios            # Run on iOS
```

### Production Build

```bash
# Android
eas build --platform android --profile production

# iOS
eas build --platform ios --profile production
```

---

## 🔮 Évolutions Futures

### Architecture

- [ ] Ajouter un state manager global (Zustand/Jotai)
- [ ] Implémenter un système de cache
- [ ] Ajouter des migrations de base de données
- [ ] Synchronisation cloud (Supabase/Firebase)

### Fonctionnalités

- [ ] Système complet de caves
- [ ] Calcul automatique des résultats
- [ ] Graphiques et analytics
- [ ] Export de données
- [ ] Notifications push

### Performance

- [ ] Lazy loading des images
- [ ] Pagination des listes
- [ ] Virtual scrolling pour grandes listes
- [ ] Optimistic UI updates

---

## 📚 Ressources

### Documentation

- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Expo Router](https://docs.expo.dev/router/introduction/)

### Outils

- [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
- [Expo Dev Tools](https://docs.expo.dev/workflow/debugging/)

---

**Version**: 1.0.0  
**Date**: Octobre 2025
