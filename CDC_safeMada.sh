Cahier des charges — SAFE MADAGASCAR
1. Identification du projet

Nom du projet : SAFE MADAGASCAR
Signification : Système numérique de prévention, d’alerte et de coordination pour la protection des jeunes.

Type : Application web + application mobile
Domaine : Protection sociale, sécurité des jeunes, prévention et gestion des alertes
Public cible : Jeunes, p    arents/tuteurs, établissements scolaires, associations et structures autorisées.

2. Contexte

Les situations de disparition, d'enlèvement, de violence ou de danger concernant les jeunes peuvent nécessiter une réaction rapide et une bonne coordination entre les familles, les établissements et les structures compétentes.

Cependant, plusieurs difficultés peuvent apparaître :

transmission tardive des informations ;
informations dispersées entre différents acteurs ;
difficulté à suivre l'évolution d'un signalement ;
absence d'un historique centralisé ;
difficulté à identifier rapidement le niveau d'urgence ;
manque de statistiques permettant d'identifier les tendances.

SAFE MADAGASCAR propose donc une plateforme numérique permettant de centraliser les signalements, faciliter l'alerte et améliorer la coordination entre les acteurs autorisés.

Le système ne remplace pas les forces de l'ordre, les services sociaux, les professionnels de santé ou les dispositifs d'urgence existants. Il sert principalement à faciliter le signalement, l'orientation et le suivi.

3. Problématique
Problématique principale

Comment utiliser les technologies numériques pour améliorer la prévention, le signalement rapide et la coordination autour des situations mettant en danger les jeunes à Madagascar ?

Problèmes spécifiques
Comment permettre à une personne de signaler rapidement une situation préoccupante ?
Comment transmettre une alerte aux personnes autorisées ?
Comment faciliter le suivi d'une disparition ou d'un incident ?
Comment éviter la diffusion publique d'informations sensibles ?
Comment aider les responsables à prioriser les signalements ?
Comment produire des statistiques utiles à la prévention ?
4. Objectifs du projet
4.1 Objectif général

Développer une plateforme numérique permettant de prévenir, signaler, gérer et suivre les situations de danger concernant les jeunes, tout en facilitant la coordination entre les différents acteurs autorisés.

4.2 Objectifs spécifiques

Le système devra permettre de :

créer un signalement ;
envoyer une alerte ;
déclarer une disparition ;
enregistrer les informations nécessaires à un dossier ;
transmettre les informations aux acteurs autorisés ;
suivre l'état d'un dossier ;
gérer les utilisateurs et leurs permissions ;
conserver un historique des actions ;
produire des statistiques ;
utiliser une carte pour visualiser certaines informations de manière contrôlée ;
proposer une aide à la priorisation des signalements.
5. Utilisateurs du système
5.1 Jeune / citoyen

Il peut :

créer un compte ;
enregistrer des contacts de confiance ;
effectuer un signalement ;
envoyer une alerte ;
consulter l'état de ses signalements ;
recevoir des notifications.
5.2 Parent / tuteur

Il peut :

gérer son profil ;
recevoir certaines alertes autorisées ;
consulter les dossiers auxquels il a accès ;
communiquer avec les structures compétentes ;
suivre l'évolution d'un signalement.
5.3 Établissement scolaire

L'établissement peut :

effectuer un signalement ;
recevoir des notifications concernant certains dossiers ;
suivre les incidents relevant de son périmètre ;
transmettre des informations aux structures compétentes.
5.4 Travailleur social / association autorisée

Il peut :

recevoir des signalements ;
analyser les informations ;
orienter un dossier ;
modifier son statut ;
ajouter des observations ;
assurer le suivi.
5.5 Administrateur

L'administrateur peut :

gérer les comptes ;
gérer les rôles ;
contrôler les accès ;
gérer les catégories de signalements ;
consulter les statistiques ;
consulter les journaux d'activité.
6. Fonctionnalités principales
6.1 Authentification

Le système devra proposer :

inscription ;
connexion ;
déconnexion ;
récupération de compte ;
modification du mot de passe ;
gestion des rôles ;
contrôle des permissions.
Exemple de rôles
ADMIN
PARENT
JEUNE
ECOLE
TRAVAILLEUR_SOCIAL
ASSOCIATION
7. Module de signalement

L'utilisateur pourra créer un signalement.

Informations possibles
Type de signalement
Date
Zone générale
Description
Niveau d'urgence
Pièces justificatives éventuelles
Contact du déclarant
Types de signalement
disparition ;
situation dangereuse ;
violence ;
menace ;
problème scolaire ;
exploitation ;
autre situation préoccupante.

Les catégories exactes devront être définies avec des professionnels compétents.

8. Module d'alerte SOS

L'application pourra proposer un bouton SOS.

Lorsqu'il est activé, le système :

Utilisateur
     ↓
Bouton SOS
     ↓
Confirmation
     ↓
Création d'une alerte
     ↓
Notification des contacts autorisés
     ↓
Prise en charge
     ↓
Suivi de l'alerte

Pour éviter les fausses alertes, une confirmation peut être demandée avant l'envoi.

9. Module de disparition

Ce module permet de créer un dossier de disparition.

Informations
identité du jeune ;
photo, uniquement lorsque son utilisation est légalement et opérationnellement justifiée ;
dernière zone connue ;
date/heure ;
description ;
informations utiles ;
personne ayant effectué le signalement ;
statut du dossier.
États possibles
NOUVEAU
EN_ANALYSE
TRANSMIS
EN_SUIVI
RETROUVE
CLOS

Les informations permettant d'identifier ou de localiser précisément un jeune ne doivent pas être publiées automatiquement au grand public.

10. Module de géolocalisation

Une carte pourra permettre aux utilisateurs autorisés de visualiser :

les zones générales des signalements ;
les zones présentant davantage de signalements ;
certains points utiles ;
les zones d'intervention.
Exemple
        CARTE MADAGASCAR

       ● Antananarivo
       ● Toamasina
       ● Antsirabe
       ● Mahajanga

     Zone avec plusieurs signalements

Pour protéger les personnes, la plateforme pourra afficher une zone approximative plutôt qu'une position exacte lorsque la précision n'est pas nécessaire.

11. Notifications

Le système devra envoyer des notifications concernant :

nouveau signalement ;
changement de statut ;
nouvelle affectation ;
demande d'information ;
clôture d'un dossier ;
alerte importante.
Canaux possibles

Version universitaire :

Application → Notification

Version avancée :

Application
     ↓
Firebase
     ↓
Notification mobile

Selon les besoins et les contraintes, SMS ou autres canaux pourraient être ajoutés ultérieurement.

12. Module de coordination

C'est l'un des modules les plus importants.

Un signalement peut être transféré vers une structure autorisée.

Exemple
Signalement
     ↓
Analyse
     ↓
Priorisation
     ↓
Structure compétente
     ↓
Prise en charge
     ↓
Suivi
     ↓
Clôture

Chaque dossier possède un historique.

Exemple d'historique
04/09 - Signalement créé
04/09 - Dossier analysé
04/09 - Dossier transmis
05/09 - Suivi effectué
06/09 - Statut modifié
13. Système de priorisation

Le système peut attribuer automatiquement un niveau de priorité.

Exemple
Niveau	Signification
🟢 Faible	Situation nécessitant un suivi
🟡 Moyenne	Situation préoccupante
🟠 Élevée	Intervention rapide nécessaire
🔴 Critique	Situation nécessitant une réaction immédiate

La priorité automatique doit être considérée comme une aide à la décision, et non comme un remplacement du jugement des professionnels.

14. Intelligence artificielle

Pour une version avancée du projet, l'IA pourrait aider à :

14.1 Classification

Analyser la description d'un signalement afin de proposer une catégorie.

Description
     ↓
IA
     ↓
Catégorie proposée
     ↓
Validation humaine
14.2 Priorisation

L'IA peut analyser certains critères afin de proposer une priorité.

14.3 Détection de doublons

Deux personnes peuvent signaler le même événement.

Le système pourrait détecter :

Signalement A
       +
Signalement B
       ↓
Similarité élevée
       ↓
"Signalements potentiellement liés"

Un professionnel doit ensuite confirmer.

15. Tableau de bord

Les utilisateurs autorisés disposeront d'un dashboard.

Exemple
┌────────────────────────────────────┐
│       SAFE MADAGASCAR              │
├────────────┬────────────┬──────────┤
│ Signalements│ En suivi  │ Alertes  │
│     128     │    47     │    12    │
├────────────┴────────────┴──────────┤
│                                    │
│          CARTE DES ZONES           │
│                                    │
├────────────────────────────────────┤
│ Signalements récents               │
│ • Dossier #102                     │
│ • Dossier #103                     │
│ • Dossier #104                     │
└────────────────────────────────────┘
16. Statistiques

Le système pourra générer :

nombre de signalements ;
évolution dans le temps ;
catégories de signalements ;
répartition géographique générale ;
délai moyen de traitement ;
nombre de dossiers clôturés ;
nombre d'alertes.

Les statistiques destinées au public devront être anonymisées et agrégées.

17. Architecture technique

Une architecture moderne pourrait être :

                 SAFE MADAGASCAR
                       │
        ┌──────────────┴──────────────┐
        │                             │
   Application                    Application
      Mobile                           Web
    Flutter                         React
        │                             │
        └──────────────┬──────────────┘
                       │
                    API REST
                       │
                  Spring Boot
                       │
        ┌──────────────┼──────────────┐
        │              │              │
    PostgreSQL      Firebase       Service IA
        │              │              │
    Données       Notifications    Python
Technologies proposées

Frontend web

React
Vite
Tailwind CSS

Mobile

Flutter

Backend

Java
Spring Boot
Spring Security
REST API

Base de données

PostgreSQL

IA

Python
Scikit-learn
éventuellement NLP

Cartographie

OpenStreetMap
Leaflet

Notifications

Firebase Cloud Messaging
18. Base de données
Principales tables
UTILISATEUR
-----------
id
nom
prenom
email
telephone
mot_de_passe
role
date_creation
SIGNALEMENT
-----------
id
utilisateur_id
type
description
niveau_priorite
statut
date_creation
date_modification
ALERTE
------
id
utilisateur_id
type
statut
date_creation
DOSSIER
-------
id
signalement_id
responsable_id
statut
date_ouverture
date_cloture
LOCALISATION
------------
id
signalement_id
latitude
longitude
precision
date
NOTIFICATION
------------
id
utilisateur_id
titre
message
lu
date_creation
HISTORIQUE
----------
id
dossier_id
utilisateur_id
action
date_action
19. Sécurité

La sécurité est fondamentale pour ce projet.

Le système devra prévoir :

Authentification
mots de passe correctement protégés ;
sessions sécurisées ;
éventuellement authentification à deux facteurs pour certains comptes.
Autorisation

Un utilisateur ne doit accéder qu'aux données nécessaires à son rôle.

Exemple :

JEUNE
 ↓
Ses propres signalements

TRAVAILLEUR SOCIAL
 ↓
Dossiers qui lui sont attribués

ADMIN
 ↓
Administration du système
Protection des données
chiffrement des communications avec HTTPS ;
contrôle d'accès ;
journalisation des actions importantes ;
sauvegardes ;
minimisation des données collectées ;
suppression ou archivage selon les règles applicables.
20. Confidentialité

Le projet doit appliquer le principe :

Collecter uniquement les informations nécessaires et ne les rendre accessibles qu'aux personnes autorisées.

Il faut notamment éviter :

❌ publier automatiquement les coordonnées d'un jeune ;
❌ afficher publiquement sa position exacte ;
❌ permettre à n'importe qui de consulter les dossiers ;
❌ diffuser une photo sans justification et autorisation appropriée.

21. Exigences non fonctionnelles
Performance

Le système doit :

répondre rapidement aux requêtes ;
supporter plusieurs utilisateurs simultanés ;
permettre l'envoi rapide des notifications.
Disponibilité

La plateforme doit être disponible autant que possible, avec une stratégie de sauvegarde.

Ergonomie

L'interface doit être :

simple ;
claire ;
adaptée aux smartphones ;
utilisable par des personnes ayant différents niveaux de maîtrise informatique.
Accessibilité linguistique

Une évolution intéressante serait de proposer :

🇫🇷 Français
🇲🇬 Malagasy
🇬🇧 Anglais

22. Cas d'utilisation principaux
                 ┌─────────────────┐
                 │      JEUNE       │
                 └────────┬────────┘
                          │
             ┌────────────┼────────────┐
             ↓            ↓            ↓
          Signaler      SOS       Consulter
             │                         │
             └──────────┬──────────────┘
                        ↓
                  ┌─────────────┐
                  │    SYSTÈME  │
                  └──────┬──────┘
                         ↓
                    Notification
                         ↓
                ┌─────────────────┐
                │ Travailleur     │
                │ social /        │
                │ structure       │
                └────────┬────────┘
                         ↓
                     Traitement
                         ↓
                      Suivi
23. MVP — Première version

Pour éviter que le projet soit trop grand, je recommande de commencer avec un MVP.

Version 1

✅ Inscription / connexion
✅ Gestion des rôles
✅ Création de signalement
✅ Bouton SOS
✅ Gestion des dossiers
✅ Notifications
✅ Tableau de bord
✅ Carte
✅ Historique
✅ PostgreSQL
✅ API Spring Boot

Version 2

➕ Application mobile Flutter
➕ SMS
➕ Multilingue
➕ Statistiques avancées

Version 3

🤖 IA de classification
🤖 Détection de doublons
🤖 Priorisation intelligente
📊 Analyse prédictive
🗺️ Analyse géographique avancée

24. Planning de développement

Pour une équipe de 4 à 5 étudiants, par exemple :

Phase	Travail
Semaine 1	Analyse + cahier des charges
Semaine 2	UML + conception BDD
Semaine 3	Backend Spring Boot
Semaine 4	Authentification + sécurité
Semaine 5	Frontend
Semaine 6	Signalements + dossiers
Semaine 7	Notifications + carte
Semaine 8	Dashboard + statistiques
Semaine 9	Tests
Semaine 10	Déploiement + présentation
25. Résultat attendu

À la fin du projet, SAFE MADAGASCAR devra fournir une plateforme permettant de :

PRÉVENIR → SIGNALER → ALERTER → ORIENTER → SUIVRE → ANALYSER

L'objectif n'est donc pas de créer une application qui « remplace » les autorités, mais un outil numérique de coordination et de protection pouvant faciliter la transmission et le suivi des informations par les acteurs habilités.

Formulation courte pour présenter le projet

SAFE MADAGASCAR est une plateforme web et mobile destinée à améliorer la prévention et le signalement des situations dangereuses concernant les jeunes. Elle permet de transmettre des alertes, gérer les signalements, coordonner les acteurs autorisés et analyser les données de manière sécurisée afin d'améliorer la protection sociale à Madagascar.

Ajoute aussi un suivi de déplacement instantannées du jeune via carte (Map intéractive)

Oui. On peut ajouter un module de suivi de déplacement en temps réel, mais comme il concerne la localisation d’un jeune, il faut le concevoir avec un consentement approprié, des accès strictement contrôlés et une possibilité de désactivation. La localisation exacte ne doit pas être accessible à n’importe quel utilisateur.

10. Module de suivi de déplacement en temps réel

Objectif : permettre à un jeune, dans un cadre de protection défini, de partager temporairement sa position avec des contacts de confiance ou des professionnels autorisés.

Fonctionnement
Jeune
  │
  │ GPS du téléphone
  ↓
Application mobile
  │
  │ Position GPS
  ↓
API Spring Boot
  │
  ├──→ Base de données
  │
  └──→ Service temps réel
           │
           ↓
     Carte interactive
           │
           ↓
Utilisateur autorisé
Fonctionnalités

1. Partage de position

Activation volontaire du partage.
Durée configurable : par exemple 15 min, 1 h ou jusqu'à désactivation.
Affichage de l'état : PARTAGE ACTIF / INACTIF.

2. Carte interactive

La carte pourrait utiliser OpenStreetMap + Leaflet.

Elle afficherait :

📍 position actuelle ;
🧭 direction/déplacement récent, si disponible ;
🗺️ trajet récent ;
🕐 heure de dernière position ;
🔋 état de la batterie, seulement si réellement nécessaire.

Exemple :

┌──────────────────────────────────┐
│       SAFE MADAGASCAR            │
│                                  │
│       🗺️ CARTE INTERACTIVE       │
│                                  │
│             📍                   │
│             │                    │
│          ───┼───                 │
│             │                    │
│          Trajet                  │
│                                  │
│  Dernière position : 09:48       │
│  Statut : ● Partage actif       │
│                                  │
│ [Arrêter le partage]             │
└──────────────────────────────────┘
3. Mise à jour instantanée

Pour éviter de recharger la carte continuellement :

Application mobile → WebSocket → Serveur → Carte

Par exemple :

09:45 → 📍 Position A
09:46 → 📍 Position B
09:47 → 📍 Position C
09:48 → 📍 Position D

La position du marqueur est alors actualisée automatiquement sur la carte.

Technologies possibles :

Flutter : récupération de la localisation ;
Spring Boot : API backend ;
WebSocket/STOMP : communication temps réel ;
PostgreSQL/PostGIS : stockage géographique ;
Leaflet + OpenStreetMap : carte interactive.
4. Mode « trajet sécurisé »

On peut également ajouter une fonctionnalité intéressante :

« Je rentre chez moi »

Le jeune définit une destination et active temporairement le partage de position.

Le système peut afficher :

Départ
  📍
  │
  │ trajet
  │
  ├──────────────→ 🏠 Destination
  │
  ↓
Position actuelle 📍

Si le partage est interrompu ou si le jeune rencontre un problème, il peut déclencher une alerte.

5. Géozone

Une géozone peut être ajoutée autour d'une zone autorisée.

Exemple :

        ┌─────────────────┐
        │    Zone sûre    │
        │                 │
        │       📍        │
        │                 │
        └─────────────────┘

Le système peut détecter qu'un jeune quitte une zone préalablement définie, mais cela doit être utilisé uniquement dans un cadre de protection approprié et transparent.

6. Sécurité du module

Pour ce module, je recommande fortement :

partage volontaire et temporaire ;
accès uniquement aux personnes autorisées ;
chiffrement des communications ;
historique de consultation des positions ;
possibilité d'arrêter immédiatement le partage ;
conservation limitée de l'historique ;
aucune publication publique de la position ;
affichage d'une zone approximative lorsque la précision exacte n'est pas nécessaire.
Mise à jour du cahier des charges

Le projet devient donc :

SAFE MADAGASCAR : Système numérique de prévention, d’alerte, de suivi et de coordination pour la protection des jeunes

Avec le cycle principal :

PRÉVENIR → LOCALISER → SIGNALER → ALERTER → COORDONNER → SUIVRE → PROTÉGER

Et les modules principaux :

👤 Gestion des utilisateurs
🚨 Alertes SOS
📝 Signalements
👦 Gestion des dossiers de jeunes
📍 Suivi de déplacement en temps réel
🗺️ Carte interactive
🛡️ Géozones
🔔 Notifications
🤝 Coordination des intervenants
📊 Tableau de bord et statistiques
🤖 Assistance IA
🔐 Sécurité et confidentialité

Cette fonctionnalité rend le projet beaucoup plus intéressant techniquement, car elle permet d'intégrer Flutter, GPS, cartographie, WebSocket, Spring Boot et PostgreSQL/PostGIS dans un seul projet.