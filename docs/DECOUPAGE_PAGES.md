# DÉCOUPAGE PAR PAGES — SAFE MADAGASCAR

Architecture mobile structurée en **4 pages principales** (onglets de navigation basse). Chaque page regroupe des fonctionnalités cohérentes du cahier des charges.

```
┌─────────────────────────────────────────────┐
│              SAFE MADAGASCAR                │
│  (Bottom Navigation — 4 onglets max)        │
├──────────┬──────────┬───────────┬───────────┤
│   HOME   │ SIGNALER │ DASHBOARD │   CARTE   │
│          │          │           │           │
│ SOS      │ Créer    │ Stats     │ Signal.   │
│ Actions  │ signal.  │ dossiers  │ Temps réel│
│ Disparit.│ Histor.  │ Alertes   │ Géozones  │
├──────────┴──────────┴───────────┴───────────┤
│              STACK (écrans secondaires)     │
│  Login · Register · Profil · Notifications· │
│  Détail dossier · Contacts de confiance     │
└─────────────────────────────────────────────┘
```

---

## 📱 PAGE 1 — HOME (Accueil)

**Rôle objectif** : donner accès rapide aux actions d'urgence et aux fonctionnalités personnelles.

### Écrans
| Écran | Description |
|-------|-------------|
| Home | Page d'accueil principale |
| SOS (modal/screen) | Déclenchement d'alerte urgente |

### Fonctionnalités
- ✅ Bouton **SOS** (grand bouton rouge, confirmation anti-fausse alerte)
- ✅ Raccourcis d'actions rapides (signaler, carte, suivi)
- ✅ Déclarer une **disparition** (accès rapide)
- ✅ Liste des **signalements récents** de l'utilisateur
- ✅ Notifications personnelles (badge)
- ✅ Contacts de confiance
- 🗺️ Mode « trajet sécurisé » (Je rentre chez moi)

---

## 📝 PAGE 2 — SIGNALER (Signalement)

**Rôle objectif** : créer et suivre un signalement / un dossier de disparition.

### Écrans
| Écran | Description |
|-------|-------------|
| List Signalements | Mes signalements / historiques |
| Créer Signalement | Formulaire complet |
| Détail Signalement | Statut, historique, observations |
| Déclarer Disparition | Dossier de disparition |

### Fonctionnalités
- ✅ Formulaire : type, description, zone générale, niveau d'urgence
- ✅ Types : disparition, situation dangereuse, violence, menace, problème scolaire, exploitation, autre
- ✅ Pièces justificatives (photo, documents)
- ✅ Niveau de priorité (🟢🟡🟠🔴)
- ✅ Historique chronologique du dossier
- ✅ États du dossier : NOUVEAU → EN_ANALYSE → TRANSMIS → EN_SUIVI → RETROUVE → CLOS
- 🔔 Notifications de changement de statut

---

## 📊 PAGE 3 — DASHBOARD (Tableau de bord / Statistiques)

**Rôle objectif** : visualiser les indicateurs et coordonner les acteurs (travailleur social, admin).

### Écrans
| Écran | Description |
|-------|-------------|
| Dashboard principal | Statistiques clés |
| Alertes SOS | File d'attente des alertes |
| Liste Dossiers | Tous les dossiers à traiter |
| Détail Dossier | Coordination, observations, historique |

### Fonctionnalités
- ✅ Compteurs : signalements, en suivi, alertes, résolus
- ✅ Signalements récents
- ✅ Analyse / priorisation (aide IA)
- ✅ Orientation / transmission vers une structure
- ✅ Modification du statut
- ✅ Ajout d'observations
- ✅ Journal d'activité (admin)
- 📊 Statistiques : évolution, catégories, répartition géo, délai moyen de traitement

---

## 🗺️ PAGE 4 — CARTE

**Rôle objectif** : visualisation géographique contrôlée + suivi de déplacement en temps réel.

### Écrans
| Écran | Description |
|-------|-------------|
| Carte signalements | Zones générales des signalements |
| Suivi temps réel | Position GPS du jeune partagée |
| Géozones | Zones sûres / d'intervention |
| Activer partage | Réglage du partage de position |

### Fonctionnalités
- ✅ Carte interactive (Leaflet / OpenStreetMap)
- ✅ Zones des signalements (affichage approximatif pour protéger les personnes)
- ✅ Suivi de déplacement **temps réel** (WebSocket / STOMP)
- ✅ Marqueur position actuelle + trajet récent
- ✅ **Géozones** : détection de sortie de zone sûre
- ✅ **Partage volontaire et temporaire** de position (15 min / 1 h / manuel)
- ✅ Bouton arrêter le partage immédiatement
- 🔐 Accès strictement contrôlé selon le rôle

---

## 🔐 ÉCRANS SECONDAIRES (Stack — partagés)

Non comptés dans les 4 pages principales :

| Écran | Rôle |
|-------|------|
| Login / Register | Authentification |
| Profil | Info utilisateur, rôles |
| Notifications | Centre de notifications |
| Contacts de confiance | Gestion des contacts autorisés |
| Paramètres | Réglages (langue FR/MG/EN, confidentialité) |

---

## 🗂️ CORRESPONDANCE FONCTIONS → PAGES

| Fonctionnalité (cahier des charges) | Page |
|-------------------------------------|------|
| Inscription / connexion / déconnexion | Stack (secondaire) |
| Gestion des rôles & permissions | Stack + Dashboard (admin) |
| Création de signalement | **SIGNALER** |
| Historique d'un dossier | **SIGNALER** |
| Bouton SOS | **HOME** |
| Confirmation de l'alerte | **HOME** |
| Dossier de disparition | **SIGNALER** |
| Notifications | Stack (badge sur HOME) |
| Coordination (analyse, transmission, suivi) | **DASHBOARD** |
| Priorisation (aide IA) | **DASHBOARD** |
| Statistiques | **DASHBOARD** |
| Tableau de bord | **DASHBOARD** |
| Carte des zones | **CARTE** |
| Suivi de déplacement temps réel | **CARTE** |
| Géozones | **CARTE** |
| Trajet sécurisé | **HOME** + **CARTE** |
| Contacts de confiance | Stack (accessible depuis HOME) |

---

## 🎯 PLAN DE DÉVELOPPEMENT PAR PAGE (MVP)

### Semaine 1-2 : AUTH + STRUCTURE
- Login / Register / Rôles
- Navigation 4 onglets + Stack
- Thème blanc/vert/rouge

### Semaine 3 : PAGE 1 — HOME
- Bouton SOS + confirmation
- Actions rapides
- Accès disparition

### Semaine 4-5 : PAGE 2 — SIGNALER
- Formulaire signalement
- Historique & statuts
- Dossier disparition

### Semaine 6 : PAGE 4 — CARTE (fondations)
- Carte statique des zones
- Marquers de signalements

### Semaine 7 : PAGE 3 — DASHBOARD
- Compteurs & statistiques
- Liste des dossiers à traiter

### Semaine 8 : SUIVI TEMPS RÉEL
- Partage de position (WebSocket)
- Géozones

### Semaine 9-10 : TESTS + INTÉGRATION API
- Connexion à Spring Boot
- Tests & déploiement
