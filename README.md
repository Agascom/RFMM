# 📱 RFMM - Application Mobile de Ministère Religieux

![Expo](https://img.shields.io/badge/Expo-54.0.33-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
![NativeWind](https://img.shields.io/badge/NativeWind-4.2.1-purple)

## 📋 Table des Matières

- [Description](#-description)
- [Technologies Utilisées](#-technologies-utilisées)
- [Structure du Projet](#-structure-du-projet)
- [Fonctionnalités](#-fonctionnalités)
- [Installation et Configuration](#-installation-et-configuration)
- [Guide de Test](#-guide-de-test)
- [Architecture de Navigation](#-architecture-de-navigation)
- [Services API](#-services-api)
- [Design System](#-design-system)

---

## 📝 Description

**RFMM** est une application mobile multiplateforme (iOS, Android, Web) développée avec **React Native** et **Expo**. Cette application est conçue pour un ministère religieux et offre une expérience utilisateur riche avec :

- 📚 **Librairie numérique** : E-books et audiobooks
- 🎙️ **Podcasts** : Écoute de sermons et enseignements
- 🎓 **Sessions de coaching** : Programmes de formation spirituelle
- 📰 **Actualités** : Articles et nouvelles du ministère
- 🛒 **Boutique en ligne** : Achat de contenus numériques
- 💳 **Paiement mobile** : Support Airtel Money, Moov Money et cartes bancaires

---

## 🛠️ Technologies Utilisées

| Technologie | Version | Description |
|-------------|---------|-------------|
| **Expo** | ~54.0.33 | Framework de développement React Native |
| **React Native** | 0.81.5 | Framework mobile cross-platform |
| **React** | 19.1.0 | Bibliothèque UI |
| **TypeScript** | ~5.9.2 | Typage statique JavaScript |
| **NativeWind** | ^4.2.1 | TailwindCSS pour React Native |
| **TailwindCSS** | ^3.4.19 | Framework CSS utilitaire |
| **React Navigation** | ^7.x | Navigation et routing |
| **Expo Fonts** | Various | Polices personnalisées (Plus Jakarta Sans, Newsreader) |
| **React Native Reanimated** | ^4.2.1 | Animations fluides |

---

## 📁 Structure du Projet

```
RFMM/
├── App.tsx                      # Point d'entrée principal
├── index.ts                     # Registre Expo
├── app.json                     # Configuration Expo
├── package.json                 # Dépendances NPM
├── tailwind.config.js           # Configuration TailwindCSS
├── tsconfig.json                # Configuration TypeScript
├── babel.config.js              # Configuration Babel
│
├── assets/                      # Ressources statiques
│   ├── icon.png                 # Icône de l'application
│   ├── splash-icon.png          # Écran de démarrage
│   ├── adaptive-icon.png        # Icône adaptive Android
│   └── favicon.png              # Favicon web
│
└── src/
    ├── components/              # Composants réutilisables
    │   └── ScreenWrapper.tsx    # Wrapper d'écran avec SafeAreaView
    │
    ├── navigation/              # Configuration de navigation
    │   └── AppNavigator.tsx     # Navigateur principal (Tabs + Stack)
    │
    ├── screens/                 # Écrans de l'application
    │   ├── HomeScreen.tsx       # Écran d'accueil
    │   ├── StoreScreen.tsx      # Boutique en ligne
    │   ├── LibraryScreen.tsx    # Bibliothèque personnelle
    │   ├── ProfileScreen.tsx    # Profil utilisateur
    │   ├── PlayerScreen.tsx     # Lecteur audio
    │   ├── NewsDetailScreen.tsx # Détail d'article
    │   └── CheckoutScreen.tsx   # Processus de paiement
    │
    └── services/
        └── api/
            ├── index.ts         # Fonctions API
            ├── types.ts         # Types TypeScript
            └── mockData.ts      # Données de démonstration
```

---

## ✨ Fonctionnalités

### 🏠 **Écran d'Accueil (HomeScreen)**
- Affichage du profil utilisateur avec message de bienvenue personnalisé
- Bannière d'événement en direct avec option d'inscription
- Carrousel de podcasts en vedette
- Grille d'accès rapide aux E-books et Audiobooks
- Liste des sessions de coaching avec barre de progression
- Mini-lecteur en bas de l'écran

### 🛍️ **Boutique (StoreScreen)**
- Navigation par catégories (Audiobooks, E-books, News)
- Bannière de nouveautés
- Section nouvelles sorties
- Liste des bestsellers avec classement
- Section tendances E-pubs
- Icône panier avec badge de quantité

### 📚 **Bibliothèque (LibraryScreen)**
- Onglets : Audiobooks, E-books, Coaching
- Section "Récemment joués" avec progression
- Section "Terminés & E-books"
- Navigation vers le lecteur audio
- Lien vers la boutique

### 🎧 **Lecteur Audio (PlayerScreen)**
- Affichage de la pochette en plein écran
- Contrôles de lecture (play/pause, précédent/suivant)
- Barre de progression interactive
- Boutons de recul/avance rapide (5s/30s)
- Contrôle de vitesse de lecture
- Options : téléchargement, partage, playlist

### 📰 **Détail Article (NewsDetailScreen)**
- Image d'en-tête avec overlay
- Barre de progression de lecture
- Métadonnées : catégorie, temps de lecture, auteur
- Contenu formaté avec lettrine
- Citations en style blockquote
- Articles connexes en carrousel horizontal

### 💳 **Paiement (CheckoutScreen)**
- Résumé de commande avec image du produit
- Sélection du mode de paiement :
  - Airtel Money
  - Moov Money
  - Carte bancaire (Visa/Mastercard)
- Indicateur de sécurité SSL
- Bouton de confirmation de paiement

### 👤 **Profil (ProfileScreen)**
- Avatar utilisateur
- Nom de l'utilisateur
- Date d'inscription

---

## 🚀 Installation et Configuration

### Prérequis

- **Node.js** v18+ ([Télécharger](https://nodejs.org/))
- **npm** ou **yarn**
- **Expo CLI** (optionnel, mais recommandé)
- **Expo Go** app sur votre téléphone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Étapes d'Installation

```bash
# 1. Naviguer vers le répertoire du projet
cd c:\laragon\www\RFMM

# 2. Installer les dépendances
npm install

# 3. Lancer l'application en mode développement
npm start
```

---

## 🧪 Guide de Test

### Méthode 1 : Tester sur Téléphone (Recommandé)

#### Étape 1 : Installer Expo Go
- **iPhone** : Télécharger "Expo Go" depuis l'App Store
- **Android** : Télécharger "Expo Go" depuis le Play Store

#### Étape 2 : Lancer le serveur de développement
```bash
cd c:\laragon\www\RFMM
npm start
```

#### Étape 3 : Scanner le QR Code
- Un QR code s'affiche dans le terminal
- **iPhone** : Ouvrir l'application Appareil Photo et scanner le QR code
- **Android** : Ouvrir Expo Go et scanner le QR code

### Méthode 2 : Tester sur Android

```bash
# Assurez-vous qu'un émulateur Android est lancé ou qu'un appareil est connecté
npm run android
```

### Méthode 3 : Tester sur iOS (macOS uniquement)

```bash
# Nécessite Xcode installé sur macOS
npm run ios
```

### Méthode 4 : Tester dans le Navigateur Web

```bash
npm run web
```

---

## 🧭 Scénarios de Test Fonctionnel

### Test 1 : Navigation Principale
| Étape | Action | Résultat Attendu |
|-------|--------|------------------|
| 1 | Lancer l'application | L'écran d'accueil s'affiche avec message de bienvenue |
| 2 | Appuyer sur l'onglet "Store" | La page boutique s'affiche |
| 3 | Appuyer sur l'onglet "Library" | La bibliothèque personnelle s'affiche |
| 4 | Appuyer sur l'onglet "Profile" | Le profil utilisateur s'affiche |
| 5 | Appuyer sur l'onglet "Home" | Retour à l'écran d'accueil |

### Test 2 : Lecteur Audio
| Étape | Action | Résultat Attendu |
|-------|--------|------------------|
| 1 | Depuis Home, appuyer sur un podcast | Le lecteur audio s'ouvre en modal |
| 2 | Vérifier l'affichage | Pochette, titre, contrôles visibles |
| 3 | Appuyer sur la flèche vers le bas | Fermeture du lecteur, retour à l'écran précédent |

### Test 3 : Détail Article
| Étape | Action | Résultat Attendu |
|-------|--------|------------------|
| 1 | Depuis Home, appuyer sur la bannière d'événement | L'écran de détail article s'affiche |
| 2 | Faire défiler vers le bas | Le contenu de l'article est visible |
| 3 | Appuyer sur la flèche retour | Retour à l'écran d'accueil |

### Test 4 : Processus d'Achat
| Étape | Action | Résultat Attendu |
|-------|--------|------------------|
| 1 | Depuis Store, appuyer sur l'icône panier | L'écran Checkout s'affiche |
| 2 | Sélectionner "Airtel Money" | L'option est mise en surbrillance |
| 3 | Sélectionner "Moov Money" | L'option change, Moov est sélectionné |
| 4 | Sélectionner "Visa / Mastercard" | L'option carte bancaire est sélectionnée |
| 5 | Vérifier le prix total | Le prix s'affiche correctement ($14.99) |

### Test 5 : Bibliothèque
| Étape | Action | Résultat Attendu |
|-------|--------|------------------|
| 1 | Aller dans Library | Liste des contenus en cours s'affiche |
| 2 | Appuyer sur un audiobook | Le lecteur s'ouvre |
| 3 | Appuyer sur "Browse Store" | Redirection vers la boutique |

---

## 🗺️ Architecture de Navigation

```
NavigationContainer
│
├── Stack.Navigator (screenOptions: headerShown: false)
│   │
│   ├── "Tabs" → Tab.Navigator
│   │   ├── "Home"    → HomeScreen
│   │   ├── "Store"   → StoreScreen
│   │   ├── "Library" → LibraryScreen
│   │   └── "Profile" → ProfileScreen
│   │
│   ├── "Player"      → PlayerScreen (modal)
│   ├── "NewsDetail"  → NewsDetailScreen
│   └── "Checkout"    → CheckoutScreen
```

---

## 🔌 Services API

L'application utilise actuellement des **données mockées** pour la démonstration. Les fonctions API disponibles :

| Fonction | Description | Type de Retour |
|----------|-------------|----------------|
| `getUser()` | Récupère les infos utilisateur | `User` |
| `getFeaturedEvent()` | Événement en vedette | `Event` |
| `getFeaturedPodcasts()` | Liste des podcasts | `PodcastEpisode[]` |
| `getCoachingSessions()` | Sessions de coaching | `CoachingSession[]` |
| `getNowPlaying()` | Contenu en cours de lecture | `PodcastEpisode` |
| `getBooks()` | Liste des livres en boutique | `Book[]` |
| `getNewsArticle(id)` | Détail d'un article | `NewsArticle` |
| `getLibraryItems()` | Contenus de la bibliothèque | `{inProgress, completed}` |

---

## 🎨 Design System

### Palette de Couleurs

| Nom | Hex | Utilisation |
|-----|-----|-------------|
| `primary` | `#f2d00d` | Couleur principale (jaune doré) |
| `background-light` | `#f8f8f5` | Fond mode clair |
| `background-dark` | `#221f10` | Fond mode sombre |
| `chocolate-dark` | `#1a0f00` | Fond lecteur audio |

### Polices de Caractères

| Nom | Police | Utilisation |
|-----|--------|-------------|
| `display` | Plus Jakarta Sans Bold | Titres |
| `body` | Plus Jakarta Sans Regular | Texte courant |
| `serif` | Newsreader Regular | Articles |
| `serifBold` | Newsreader Bold | Titres d'articles |
| `serifItalic` | Newsreader Italic | Citations |

### Mode Sombre

L'application supporte automatiquement le **mode sombre** basé sur les préférences système de l'utilisateur. Le composant `ScreenWrapper` gère automatiquement l'adaptation des couleurs.

---

## 📱 Captures d'Écran (Écrans Principaux)

| Home | Store | Library | Player |
|------|-------|---------|--------|
| Accueil avec podcasts | Boutique e-books | Ma bibliothèque | Lecteur audio |

---

## 🐛 Dépannage

### Problème : L'application ne démarre pas

```bash
# Nettoyer le cache et réinstaller
rm -rf node_modules
npm install
npx expo start -c
```

### Problème : Erreur de polices

Les polices sont chargées au démarrage. Si elles ne se chargent pas, un indicateur de chargement s'affiche. Vérifiez votre connexion internet.

### Problème : Le QR code ne fonctionne pas

1. Assurez-vous que votre téléphone et votre ordinateur sont sur le **même réseau WiFi**
2. Essayez le mode tunnel : `npx expo start --tunnel`

---

## 📄 Licence

Ce projet est privé et propriétaire.

---

## 👥 Auteurs

- Équipe de développement RFMM

---

*Documentation générée le 01/02/2026*