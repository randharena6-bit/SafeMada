import * as Crypto from 'expo-crypto';
import { getDatabase } from './init';
import type {
  Utilisateur,
  ContactConfiance,
  Signalement,
  PieceJointe,
  Alerte,
  Dossier,
  DossierDisparition,
  Observation,
  Historique,
  JournalActivite,
  Notification,
  PartagePosition,
  Localisation,
  GeoZone,
  VSignalementAvecUtilisateur,
  VDossierComplet,
} from './types';

type DB = Awaited<ReturnType<typeof getDatabase>>;

export function newId(): string {
  return Crypto.randomUUID();
}

// ============================================================
// UTILISATEUR
// ============================================================
export async function createUtilisateur(
  data: Omit<Utilisateur, 'id' | 'date_creation' | 'actif'>
): Promise<Utilisateur> {
  const db = await getDatabase();
  const id = newId();
  await db.runAsync(
    `INSERT INTO utilisateur (id, nom, prenom, email, telephone, mot_de_passe, role)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    id,
    data.nom,
    data.prenom,
    data.email,
    data.telephone ?? null,
    data.mot_de_passe,
    data.role
  );
  return (await getUtilisateurById(id))!;
}

export async function getUtilisateurById(id: string): Promise<Utilisateur | null> {
  const db = await getDatabase();
  return db.getFirstAsync<Utilisateur>('SELECT * FROM utilisateur WHERE id = ?', id);
}

export async function getUtilisateurByEmail(email: string): Promise<Utilisateur | null> {
  const db = await getDatabase();
  return db.getFirstAsync<Utilisateur>('SELECT * FROM utilisateur WHERE email = ?', email);
}

export async function updateUtilisateur(
  id: string,
  data: Partial<Pick<Utilisateur, 'nom' | 'prenom' | 'telephone' | 'role' | 'actif'>>
): Promise<void> {
  const db = await getDatabase();
  const entries = Object.entries(data).filter(
    ([, v]) => v !== undefined
  ) as [string, string | boolean | null][];
  if (entries.length === 0) return;
  const sets = entries.map(([k]) => `${k} = ?`).join(', ');
  await db.runAsync(
    `UPDATE utilisateur SET ${sets} WHERE id = ?`,
    ...entries.map(([, v]) => v),
    id
  );
}

export async function deleteUtilisateur(id: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM utilisateur WHERE id = ?', id);
}

// ============================================================
// CONTACT CONFIANCE
// ============================================================
export async function createContactConfiance(
  data: Omit<ContactConfiance, 'id' | 'date_ajout' | 'autorise_sos'>
): Promise<ContactConfiance> {
  const db = await getDatabase();
  const id = newId();
  await db.runAsync(
    `INSERT INTO contact_confiance (id, utilisateur_id, nom, telephone, relation)
     VALUES (?, ?, ?, ?, ?)`,
    id,
    data.utilisateur_id,
    data.nom,
    data.telephone,
    data.relation
  );
  return (await getContactConfianceById(id))!;
}

export async function getContactConfianceById(id: string): Promise<ContactConfiance | null> {
  const db = await getDatabase();
  return db.getFirstAsync<ContactConfiance>('SELECT * FROM contact_confiance WHERE id = ?', id);
}

export async function getContactsConfianceByUtilisateur(
  utilisateurId: string
): Promise<ContactConfiance[]> {
  const db = await getDatabase();
  return db.getAllAsync<ContactConfiance>(
    'SELECT * FROM contact_confiance WHERE utilisateur_id = ? ORDER BY date_ajout DESC',
    utilisateurId
  );
}

export async function setAutoriseSos(id: string, autorise: boolean): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('UPDATE contact_confiance SET autorise_sos = ? WHERE id = ?', autorise ? 1 : 0, id);
}

// ============================================================
// SIGNALEMENT
// ============================================================
export async function createSignalement(
  data: Omit<Signalement, 'id' | 'date_creation' | 'date_modification' | 'statut'>
): Promise<Signalement> {
  const db = await getDatabase();
  const id = newId();
  await db.runAsync(
    `INSERT INTO signalement
       (id, utilisateur_id, type, description, niveau_priorite, zone_generale, latitude, longitude)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    id,
    data.utilisateur_id,
    data.type,
    data.description,
    data.niveau_priorite,
    data.zone_generale ?? null,
    data.latitude ?? null,
    data.longitude ?? null
  );
  await logActivite(data.utilisateur_id, `CRÉATION SIGNALEMENT ${id}`);
  return (await getSignalementById(id))!;
}

export async function getSignalementById(id: string): Promise<Signalement | null> {
  const db = await getDatabase();
  return db.getFirstAsync<Signalement>('SELECT * FROM signalement WHERE id = ?', id);
}

export async function getSignalementsByUtilisateur(
  utilisateurId: string
): Promise<Signalement[]> {
  const db = await getDatabase();
  return db.getAllAsync<Signalement>(
    'SELECT * FROM signalement WHERE utilisateur_id = ? ORDER BY date_creation DESC',
    utilisateurId
  );
}

export async function getSignalementsAvecUtilisateur(): Promise<VSignalementAvecUtilisateur[]> {
  const db = await getDatabase();
  return db.getAllAsync<VSignalementAvecUtilisateur>(
    'SELECT * FROM v_signalement_avec_utilisateur ORDER BY date_creation DESC'
  );
}

export async function updateStatutSignalement(id: string, statut: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `UPDATE signalement SET statut = ?, date_modification = datetime('now') WHERE id = ?`,
    statut,
    id
  );
  const s = await getSignalementById(id);
  if (s) await logActivite(s.utilisateur_id, `STATUT SIGNALEMENT ${id} → ${statut}`);
}

// ============================================================
// PIÈCE JOINTE
// ============================================================
export async function createPieceJointe(
  data: Omit<PieceJointe, 'id' | 'date_ajout'>
): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO piece_jointe (id, signalement_id, nom_fichier, type_mime, url_stockage)
     VALUES (?, ?, ?, ?, ?)`,
    newId(),
    data.signalement_id,
    data.nom_fichier,
    data.type_mime,
    data.url_stockage
  );
}

export async function getPiecesJointesBySignalement(
  signalementId: string
): Promise<PieceJointe[]> {
  const db = await getDatabase();
  return db.getAllAsync<PieceJointe>(
    'SELECT * FROM piece_jointe WHERE signalement_id = ? ORDER BY date_ajout DESC',
    signalementId
  );
}

// ============================================================
// ALERTE
// ============================================================
export async function createAlerte(
  data: Omit<Alerte, 'id' | 'date_creation' | 'statut'>
): Promise<Alerte> {
  const db = await getDatabase();
  const id = newId();
  await db.runAsync(
    `INSERT INTO alerte (id, utilisateur_id, signalement_id, type, latitude, longitude, description)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    id,
    data.utilisateur_id,
    data.signalement_id ?? null,
    data.type,
    data.latitude ?? null,
    data.longitude ?? null,
    data.description ?? null
  );
  await logActivite(data.utilisateur_id, `ALERTE DÉCLENCHÉE ${id}`);
  return (await getAlerteById(id))!;
}

export async function getAlerteById(id: string): Promise<Alerte | null> {
  const db = await getDatabase();
  return db.getFirstAsync<Alerte>('SELECT * FROM alerte WHERE id = ?', id);
}

export async function getAlertesActives(): Promise<Alerte[]> {
  const db = await getDatabase();
  return db.getAllAsync<Alerte>(
    "SELECT * FROM alerte WHERE statut = 'ACTIVE' ORDER BY date_creation DESC"
  );
}

export async function updateStatutAlerte(id: string, statut: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('UPDATE alerte SET statut = ? WHERE id = ?', statut, id);
}

// ============================================================
// DOSSIER
// ============================================================
export async function ouvrirDossier(
  signalementId: string,
  responsableId: string | null
): Promise<Dossier> {
  const db = await getDatabase();
  const id = newId();
  await db.runAsync(
    'INSERT INTO dossier (id, signalement_id, responsable_id) VALUES (?, ?, ?)',
    id,
    signalementId,
    responsableId
  );
  await updateStatutSignalement(signalementId, 'EN_ANALYSE');
  if (responsableId) await logActivite(responsableId, `DOSSIER OUVERT ${id}`);
  return (await getDossierById(id))!;
}

export async function getDossierById(id: string): Promise<Dossier | null> {
  const db = await getDatabase();
  return db.getFirstAsync<Dossier>('SELECT * FROM dossier WHERE id = ?', id);
}

export async function getDossierBySignalement(signalementId: string): Promise<Dossier | null> {
  const db = await getDatabase();
  return db.getFirstAsync<Dossier>('SELECT * FROM dossier WHERE signalement_id = ?', signalementId);
}

export async function getDossiersComplets(): Promise<VDossierComplet[]> {
  const db = await getDatabase();
  return db.getAllAsync<VDossierComplet>('SELECT * FROM v_dossier_complet');
}

export async function updateStatutDossier(id: string, statut: string): Promise<void> {
  const db = await getDatabase();
  const cloture = statut === 'CLOS' ? `, date_cloture = datetime('now')` : '';
  await db.runAsync(`UPDATE dossier SET statut = ?${cloture} WHERE id = ?`, statut, id);
  await addHistorique({ dossier_id: id, utilisateur_id: null, action: `STATUT → ${statut}` });
}

// ============================================================
// DOSSIER DISPARITION
// ============================================================
export async function createDossierDisparition(
  data: Omit<DossierDisparition, 'id'>
): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO dossier_disparition
     (id, dossier_id, identite_jeune, photo_url, derniere_zone_connue, date_heure_disparition, description, informations_utiles)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    newId(),
    data.dossier_id,
    data.identite_jeune,
    data.photo_url ?? null,
    data.derniere_zone_connue ?? null,
    data.date_heure_disparition,
    data.description ?? null,
    data.informations_utiles ?? null
  );
}

export async function getDossierDisparitionByDossier(
  dossierId: string
): Promise<DossierDisparition | null> {
  const db = await getDatabase();
  return db.getFirstAsync<DossierDisparition>(
    'SELECT * FROM dossier_disparition WHERE dossier_id = ?',
    dossierId
  );
}

// ============================================================
// OBSERVATION
// ============================================================
export async function addObservation(data: Omit<Observation, 'id' | 'date_ajout'>): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    'INSERT INTO observation (id, dossier_id, utilisateur_id, contenu) VALUES (?, ?, ?, ?)',
    newId(),
    data.dossier_id,
    data.utilisateur_id,
    data.contenu
  );
}

export async function getObservationsByDossier(dossierId: string): Promise<Observation[]> {
  const db = await getDatabase();
  return db.getAllAsync<Observation>(
    'SELECT * FROM observation WHERE dossier_id = ? ORDER BY date_ajout DESC',
    dossierId
  );
}

// ============================================================
// HISTORIQUE & JOURNAL ACTIVITÉ
// ============================================================
export async function addHistorique(data: Omit<Historique, 'id' | 'date_action'>): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    'INSERT INTO historique (id, dossier_id, utilisateur_id, action) VALUES (?, ?, ?, ?)',
    newId(),
    data.dossier_id,
    data.utilisateur_id ?? null,
    data.action
  );
}

export async function getHistoriqueByDossier(dossierId: string): Promise<Historique[]> {
  const db = await getDatabase();
  return db.getAllAsync<Historique>(
    'SELECT * FROM historique WHERE dossier_id = ? ORDER BY date_action DESC',
    dossierId
  );
}

export async function logActivite(
  utilisateurId: string | null,
  action: string,
  ipAdresse?: string
): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    'INSERT INTO journal_activite (id, utilisateur_id, action, ip_adresse) VALUES (?, ?, ?, ?)',
    newId(),
    utilisateurId,
    action,
    ipAdresse ?? null
  );
}

export async function getJournalActivite(): Promise<JournalActivite[]> {
  const db = await getDatabase();
  return db.getAllAsync<JournalActivite>(
    'SELECT * FROM journal_activite ORDER BY date_action DESC'
  );
}

// ============================================================
// NOTIFICATION
// ============================================================
export async function createNotification(
  data: Omit<Notification, 'id' | 'date_creation' | 'lu'>
): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    'INSERT INTO notification (id, utilisateur_id, titre, message) VALUES (?, ?, ?, ?)',
    newId(),
    data.utilisateur_id,
    data.titre,
    data.message
  );
}

export async function getNotificationsByUtilisateur(
  utilisateurId: string
): Promise<Notification[]> {
  const db = await getDatabase();
  return db.getAllAsync<Notification>(
    'SELECT * FROM notification WHERE utilisateur_id = ? ORDER BY date_creation DESC',
    utilisateurId
  );
}

export async function marquerNotificationLue(id: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('UPDATE notification SET lu = 1 WHERE id = ?', id);
}

// ============================================================
// PARTAGE DE POSITION & LOCALISATION
// ============================================================
export async function activerPartagePosition(
  jeuneId: string,
  dureeConfigureeMinutes?: number
): Promise<PartagePosition> {
  const db = await getDatabase();
  const id = newId();
  const dateFin = dureeConfigureeMinutes
    ? new Date(Date.now() + dureeConfigureeMinutes * 60_000).toISOString()
    : null;
  await db.runAsync(
    `INSERT INTO partage_position (id, jeune_id, duree_configuree, date_fin)
     VALUES (?, ?, ?, ?)`,
    id,
    jeuneId,
    dureeConfigureeMinutes ?? null,
    dateFin
  );
  const row = await db.getFirstAsync<PartagePosition>('SELECT * FROM partage_position WHERE id = ?', id);
  return row!;
}

export async function desactiverPartagePosition(id: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    "UPDATE partage_position SET statut = 'INACTIF', date_fin = datetime('now') WHERE id = ?",
    id
  );
}

export async function addLocalisation(data: Omit<Localisation, 'id' | 'date'>): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    'INSERT INTO localisation (id, partage_id, latitude, longitude, precision_metre) VALUES (?, ?, ?, ?, ?)',
    newId(),
    data.partage_id,
    data.latitude,
    data.longitude,
    data.precision_metre ?? null
  );
}

export async function getLocalisationsByPartage(partageId: string): Promise<Localisation[]> {
  const db = await getDatabase();
  return db.getAllAsync<Localisation>(
    'SELECT * FROM localisation WHERE partage_id = ? ORDER BY date DESC',
    partageId
  );
}

// ============================================================
// GEOZONE & PARTAGE GEOZONE
// ============================================================
export async function createGeoZone(data: Omit<GeoZone, 'id'>): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO geozone (id, nom, description, rayon, latitude_centre, longitude_centre, type_zone)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    newId(),
    data.nom,
    data.description ?? null,
    data.rayon,
    data.latitude_centre,
    data.longitude_centre,
    data.type_zone ?? 'GENERALE'
  );
}

export async function getGeoZones(): Promise<GeoZone[]> {
  const db = await getDatabase();
  return db.getAllAsync<GeoZone>('SELECT * FROM geozone');
}

export async function associerGeoZoneAuPartage(
  partageId: string,
  geozoneId: string
): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    'INSERT INTO partage_geozone (partage_id, geozone_id) VALUES (?, ?)',
    partageId,
    geozoneId
  );
}

export async function getGeoZonesByPartage(partageId: string): Promise<GeoZone[]> {
  const db = await getDatabase();
  return db.getAllAsync<GeoZone>(
    `SELECT g.* FROM geozone g
     JOIN partage_geozone pg ON pg.geozone_id = g.id
     WHERE pg.partage_id = ?`,
    partageId
  );
}

// ============================================================
// GLOBAL
// ============================================================
export async function healthCheck(): Promise<boolean> {
  try {
    const db = await getDatabase();
    const row = await db.getFirstAsync<{ n: number }>('SELECT COUNT(*) AS n FROM role_ref');
    return (row?.n ?? 0) > 0;
  } catch {
    return false;
  }
}

export type { DB };