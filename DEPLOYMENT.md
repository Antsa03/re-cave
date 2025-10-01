# 🚀 Déploiement & Production - Cave Ray

Guide complet pour déployer **Cave Ray** sur les stores iOS et Android.

---

## 📋 Prérequis

### Comptes Nécessaires

- [ ] Compte **Expo** (gratuit) - [expo.dev](https://expo.dev)
- [ ] Compte **Apple Developer** ($99/an) - Pour iOS
- [ ] Compte **Google Play Developer** ($25 one-time) - Pour Android

### Installations Requises

```bash
# EAS CLI (Expo Application Services)
npm install -g eas-cli

# Se connecter à Expo
eas login
```

---

## 🔧 Configuration Initiale

### 1. Initialiser EAS

```bash
cd cave-ray
eas build:configure
```

### 2. Configurer app.json

```json
{
  "expo": {
    "name": "Cave Ray",
    "slug": "cave-ray",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "cave-ray",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#8B5CF6"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.votrenom.caveray",
      "buildNumber": "1"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png",
        "backgroundColor": "#8B5CF6"
      },
      "package": "com.votrenom.caveray",
      "versionCode": 1
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": ["expo-router", "expo-sqlite"],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

### 3. Créer eas.json

```json
{
  "cli": {
    "version": ">= 7.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

---

## 📱 Build Android

### 1. Build de Production

```bash
# Build APK (pour test)
eas build --platform android --profile preview

# Build AAB (pour Google Play)
eas build --platform android --profile production
```

### 2. Télécharger le Build

Une fois le build terminé :

1. Allez sur [expo.dev](https://expo.dev/accounts/[votre-compte]/projects/cave-ray/builds)
2. Téléchargez l'APK ou AAB

### 3. Soumettre à Google Play

```bash
# Automatique
eas submit --platform android

# Ou manuellement sur play.google.com/console
```

#### Configuration Google Play Console

1. **Créer une Application**

   - Nom : Cave Ray
   - Langue par défaut : Français
   - Type : Application

2. **Contenu de l'Application**

   - Description courte (80 caractères max)
   - Description complète (4000 caractères max)
   - Screenshots (minimum 2)
   - Icône haute résolution (512x512)

3. **Classification du Contenu**

   - Questionnaire de classification
   - Pas de contenu sensible

4. **Prix et Distribution**
   - Gratuit
   - Pays : Tous ou sélection

---

## 🍎 Build iOS

### 1. Prérequis iOS

- **Certificats iOS** (générés par EAS)
- **Profils de provisioning** (générés par EAS)
- **App ID** sur developer.apple.com

### 2. Build de Production

```bash
# Build pour simulateur (test)
eas build --platform ios --profile preview

# Build pour App Store
eas build --platform ios --profile production
```

### 3. Soumettre à App Store

```bash
# Automatique
eas submit --platform ios

# Ou via Transporter app
```

#### Configuration App Store Connect

1. **Créer une App**

   - Bundle ID : com.votrenom.caveray
   - Nom : Cave Ray
   - Langue principale : Français

2. **Informations App**

   - Nom (30 caractères max)
   - Sous-titre (30 caractères)
   - Description (4000 caractères)
   - Mots-clés (100 caractères)
   - URL de support
   - URL marketing

3. **Captures d'Écran**

   - iPhone 6.7" (iPhone 14 Pro Max) : 2 minimum
   - iPhone 6.5" (iPhone 11 Pro Max) : 2 minimum
   - iPad Pro 12.9" : 2 minimum (optionnel)

4. **Informations sur la Build**

   - Version : 1.0.0
   - Build : Auto-généré
   - Notes de version

5. **Informations Générales**
   - Icône (1024x1024)
   - Classification par âge
   - Licence
   - Prix (Gratuit)

---

## 🔄 Mises à Jour

### Version Patch (1.0.0 → 1.0.1)

```bash
# 1. Mettre à jour la version
# Dans app.json : "version": "1.0.1"

# 2. Build
eas build --platform all --profile production

# 3. Soumettre
eas submit --platform all
```

### Version Mineure (1.0.0 → 1.1.0)

Même processus, changez juste la version.

### Version Majeure (1.0.0 → 2.0.0)

Pour les breaking changes :

1. Mettre à jour la version
2. Documenter les changements dans CHANGELOG.md
3. Communiquer aux utilisateurs
4. Build et submit

---

## 📊 Over-The-Air (OTA) Updates

Pour les mises à jour instantanées (sans rebuild) :

```bash
# 1. Installer EAS Update
npm install expo-updates

# 2. Publier une mise à jour
eas update --branch production --message "Fix bug X"
```

### Limitations OTA

✅ **Peut être OTA** :

- JavaScript/TypeScript
- Assets (images, fonts)
- Styling

❌ **Ne peut PAS être OTA** :

- Changements natifs
- Nouveaux packages natifs
- Modifications app.json importantes

---

## 🎨 Assets de Production

### Icônes Requises

```
iOS:
- icon.png (1024x1024)

Android:
- adaptive icon foreground (1024x1024)
- adaptive icon background (1024x1024)
- monochrome icon (1024x1024)
```

### Splash Screen

```
- splash-icon.png (1242x2436 recommandé)
- Fond : #8B5CF6 (violet)
```

### Screenshots

**iOS** :

- 6.7" (1290x2796) - iPhone 14 Pro Max
- 6.5" (1242x2688) - iPhone 11 Pro Max
- 5.5" (1242x2208) - iPhone 8 Plus

**Android** :

- 16:9 ratio minimum
- 1080x1920 recommandé

---

## 📈 Analytics & Monitoring

### Expo Analytics (Gratuit)

Inclus automatiquement :

- Nombre de téléchargements
- Crashes
- Performances

### Firebase Analytics (Optionnel)

```bash
npm install @react-native-firebase/app @react-native-firebase/analytics

# Configurer dans app.json
{
  "expo": {
    "plugins": [
      "@react-native-firebase/app"
    ]
  }
}
```

### Sentry (Optionnel)

Pour le tracking d'erreurs :

```bash
npm install @sentry/react-native

# Configuration dans app.js
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'YOUR_DSN',
});
```

---

## 🔒 Sécurité

### Environment Variables

Créez un fichier `.env` :

```bash
API_KEY=votre_cle_api
DATABASE_URL=votre_url
```

**Ne commitez JAMAIS les secrets dans Git !**

Ajoutez à `.gitignore` :

```
.env
.env.local
```

### Obfuscation du Code

Pour protéger votre code :

```json
// eas.json
{
  "build": {
    "production": {
      "env": {
        "EXPO_PUBLIC_MINIFY": "true"
      }
    }
  }
}
```

---

## ✅ Checklist Avant Publication

### Technique

- [ ] Aucune erreur TypeScript
- [ ] App testée sur iOS Simulator
- [ ] App testée sur Android Emulator
- [ ] Testé sur devices réels
- [ ] Base de données fonctionne
- [ ] Toutes les fonctionnalités opérationnelles
- [ ] Pas de console.log en production
- [ ] Assets optimisés

### Store

- [ ] Icône haute résolution (1024x1024)
- [ ] Screenshots de qualité
- [ ] Description bien rédigée
- [ ] Mots-clés pertinents
- [ ] URL de support fonctionnelle
- [ ] Politique de confidentialité (si applicable)
- [ ] Conditions d'utilisation (si applicable)

### Légal

- [ ] Classification par âge correcte
- [ ] Permissions justifiées
- [ ] RGPD compliant (si collecte de données)
- [ ] Licence définie

---

## 🐛 Troubleshooting

### Build Failed

```bash
# Nettoyer le cache
eas build:clean

# Rebuild
eas build --platform [ios/android] --clear-cache
```

### Certificats iOS Expirés

```bash
# Régénérer
eas credentials
```

### APK ne s'installe pas

- Vérifier la signature
- Vérifier l'architecture (arm64-v8a, armeabi-v7a)

---

## 📞 Support

### Expo Support

- [Documentation](https://docs.expo.dev/)
- [Forums](https://forums.expo.dev/)
- [Discord](https://chat.expo.dev/)

### App Store Support

- [App Store Connect](https://appstoreconnect.apple.com/)
- [Developer Forums](https://developer.apple.com/forums/)

### Google Play Support

- [Play Console](https://play.google.com/console/)
- [Play Academy](https://playacademy.exceedlms.com/)

---

## 💰 Coûts

| Service               | Coût     | Fréquence |
| --------------------- | -------- | --------- |
| Apple Developer       | $99      | /an       |
| Google Play Developer | $25      | unique    |
| Expo (gratuit)        | $0       | -         |
| Expo (production)     | $29/mois | optionnel |
| Hosting (si backend)  | Variable | /mois     |

---

## 🎉 Post-Lancement

### Marketing

1. Créer une page de présentation
2. Partager sur les réseaux sociaux
3. Demander des reviews
4. Créer un support utilisateur

### Maintenance

1. Monitorer les crashes
2. Répondre aux reviews
3. Corriger les bugs rapidement
4. Planifier les mises à jour

### Évolution

1. Écouter les retours utilisateurs
2. Prioriser les fonctionnalités
3. Maintenir un changelog
4. Communiquer la roadmap

---

**Bon lancement ! 🚀**

---

**Dernière mise à jour** : Octobre 2025
