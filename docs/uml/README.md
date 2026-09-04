# UML — SAFE MADAGASCAR

Ce dossier contient les diagrammes UML du projet **SAFE MADAGASCAR** (Système numérique de prévention, d'alerte, de suivi et de coordination pour la protection des jeunes).

## Format

Les diagrammes sont écrits en **PlantUML** (`.puml`). Ils peuvent être rendus en PNG/SVG :

- **VS Code** : extension *PlantUML*
- **IntelliJ/IDEA** : *PlantUML integration*
- **CLI** : `plantuml diagramme.puml`
- **En ligne** : https://www.plantuml.com/plantuml

## Contenu

| Fichier | Type de diagramme | Description |
|---------|-------------------|-------------|
| `01_use_case.puml` | Cas d'utilisation | Interactions des différents acteurs avec le système |
| `02_class_diagram.puml` | Classes | Structure du domaine (entités, relations, rôles, états) |
| `03_sequence_sos.puml` | Séquence | Déroulement d'une alerte SOS |
| `04_sequence_signalement.puml` | Séquence | Création et traitement d'un signalement |
| `05_sequence_tracking.puml` | Séquence | Suivi de déplacement en temps réel (GPS + WebSocket) |
| `06_activity.puml` | Activité | Flux global de traitement d'un dossier |
| `07_component.puml` | Composants | Architecture applicative (mobile, web, API, IA, notifications) |
| `08_deployment.puml` | Déploiement | Infrastructure matérielle |
| `09_database.puml` | Entité-Relation | Schéma complet de la base de données |
| `10_state_machine_dossier.puml` | Diagramme d'états | Cycle de vie d'un dossier de signalement |

## Génération

Pour générer toutes les images d'un coup :

```bash
cd docs/uml
plantuml -tpng *.puml
```
