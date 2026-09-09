export interface Utilisateur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string | null;
  mot_de_passe: string;
  role: string;
  actif: boolean;
  date_creation: string;
}

export interface ContactConfiance {
  id: string;
  utilisateur_id: string;
  nom: string;
  telephone: string;
  relation: string;
  autorise_sos: boolean;
  date_ajout: string;
}

export interface Signalement {
  id: string;
  utilisateur_id: string;
  type: string;
  description: string;
  niveau_priorite: string;
  statut: string;
  zone_generale: string | null;
  latitude: number | null;
  longitude: number | null;
  date_creation: string;
  date_modification: string;
}

export interface PieceJointe {
  id: string;
  signalement_id: string;
  nom_fichier: string;
  type_mime: string;
  url_stockage: string;
  date_ajout: string;
}

export interface Alerte {
  id: string;
  utilisateur_id: string;
  signalement_id: string | null;
  type: string;
  statut: string;
  latitude: number | null;
  longitude: number | null;
  description: string | null;
  date_creation: string;
}

export interface Dossier {
  id: string;
  signalement_id: string;
  responsable_id: string | null;
  statut: string;
  date_ouverture: string;
  date_cloture: string | null;
}

export interface DossierDisparition {
  id: string;
  dossier_id: string;
  identite_jeune: string;
  photo_url: string | null;
  derniere_zone_connue: string | null;
  date_heure_disparition: string;
  description: string | null;
  informations_utiles: string | null;
}

export interface Observation {
  id: string;
  dossier_id: string;
  utilisateur_id: string;
  contenu: string;
  date_ajout: string;
}

export interface Historique {
  id: string;
  dossier_id: string;
  utilisateur_id: string | null;
  action: string;
  date_action: string;
}

export interface JournalActivite {
  id: string;
  utilisateur_id: string | null;
  action: string;
  ip_adresse: string | null;
  date_action: string;
}

export interface Notification {
  id: string;
  utilisateur_id: string;
  titre: string;
  message: string;
  lu: boolean;
  date_creation: string;
}

export interface PartagePosition {
  id: string;
  jeune_id: string;
  statut: string;
  duree_configuree: number | null;
  date_debut: string;
  date_fin: string | null;
}

export interface Localisation {
  id: string;
  partage_id: string;
  latitude: number;
  longitude: number;
  precision_metre: number | null;
  date: string;
}

export interface GeoZone {
  id: string;
  nom: string;
  description: string | null;
  rayon: number;
  latitude_centre: number;
  longitude_centre: number;
  type_zone: string;
}

export interface VSignalementAvecUtilisateur extends
  Omit<Signalement, 'latitude' | 'longitude'> {
  auteur: string;
  role_auteur: string;
  type_libelle: string;
  priorite_libelle: string;
  statut_libelle: string;
  latitude: number | null;
  longitude: number | null;
}

export interface VDossierComplet extends Dossier {
  responsable: string | null;
  statut_libelle: string;
  signalement_description: string;
  type_signalement: string;
  signaleur: string;
}