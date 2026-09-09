
-- ============================================================================
-- SAFE MADAGASCAR — SCHÉMA OPTIMISÉ SQLITE
-- Optimisations:
--   • WITHOUT ROWID sur les tables de référence et de jonction (clustering par PK)
--   • Index composés "couvrants" calés sur les requêtes réelles (WHERE + ORDER BY)
--   • Index DESC pour les tris décroissants (SQLite ≥ 3.30)
--   • PRAGMAs de performance (WAL, cache, mmap, temp_store) appliqués au chargement
-- ============================================================================

-- Optimisation au niveau fichier (avant création des tables)
PRAGMA auto_vacuum = FULL;
PRAGMA journal_mode = WAL;

-- ============================================================================
-- 1. TABLES DE RÉFÉRENCE (ENUMS) — WITHOUT ROWID : clustering par code
-- ============================================================================

CREATE TABLE IF NOT EXISTS role_ref (
    code        TEXT PRIMARY KEY,
    libelle     TEXT NOT NULL
) WITHOUT ROWID;

CREATE TABLE IF NOT EXISTS type_signalement_ref (
    code        TEXT PRIMARY KEY,
    libelle     TEXT NOT NULL
) WITHOUT ROWID;

CREATE TABLE IF NOT EXISTS statut_dossier_ref (
    code        TEXT PRIMARY KEY,
    libelle     TEXT NOT NULL
) WITHOUT ROWID;

CREATE TABLE IF NOT EXISTS niveau_priorite_ref (
    code        TEXT PRIMARY KEY,
    libelle     TEXT NOT NULL
) WITHOUT ROWID;

CREATE TABLE IF NOT EXISTS statut_alerte_ref (
    code        TEXT PRIMARY KEY,
    libelle     TEXT NOT NULL
) WITHOUT ROWID;

CREATE TABLE IF NOT EXISTS statut_partage_ref (
    code        TEXT PRIMARY KEY,
    libelle     TEXT NOT NULL
) WITHOUT ROWID;

-- ============================================================================
-- 2. TABLES PRINCIPALES
-- ============================================================================

-- 2.1 UTILISATEUR
CREATE TABLE IF NOT EXISTS utilisateur (
    id              TEXT PRIMARY KEY,
    nom             TEXT NOT NULL,
    prenom          TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE,
    telephone       TEXT,
    mot_de_passe    TEXT NOT NULL,
    role            TEXT NOT NULL DEFAULT 'JEUNE',
    actif           INTEGER NOT NULL DEFAULT 1,
    date_creation   TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (role) REFERENCES role_ref(code)
);

CREATE INDEX IF NOT EXISTS idx_utilisateur_role ON utilisateur(role);
CREATE INDEX IF NOT EXISTS idx_utilisateur_date ON utilisateur(date_creation DESC);

-- 2.2 CONTACT CONFIANCE
CREATE TABLE IF NOT EXISTS contact_confiance (
    id              TEXT PRIMARY KEY,
    utilisateur_id  TEXT NOT NULL,
    nom             TEXT NOT NULL,
    telephone       TEXT NOT NULL,
    relation        TEXT NOT NULL,
    autorise_sos    INTEGER NOT NULL DEFAULT 0,
    date_ajout      TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_contact_utilisateur ON contact_confiance(utilisateur_id);
-- Liste des contacts SOS autorisés d'un utilisateur (appel SOS)
CREATE INDEX IF NOT EXISTS idx_contact_sos ON contact_confiance(utilisateur_id, autorise_sos);

-- 2.3 SIGNALEMENT
CREATE TABLE IF NOT EXISTS signalement (
    id                  TEXT PRIMARY KEY,
    utilisateur_id      TEXT NOT NULL,
    type                TEXT NOT NULL,
    description         TEXT NOT NULL,
    niveau_priorite     TEXT NOT NULL DEFAULT 'MOYENNE',
    statut              TEXT NOT NULL DEFAULT 'NOUVEAU',
    zone_generale       TEXT,
    latitude            REAL,
    longitude           REAL,
    date_creation       TEXT NOT NULL DEFAULT (datetime('now')),
    date_modification   TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE,
    FOREIGN KEY (type) REFERENCES type_signalement_ref(code),
    FOREIGN KEY (niveau_priorite) REFERENCES niveau_priorite_ref(code),
    FOREIGN KEY (statut) REFERENCES statut_dossier_ref(code)
);

-- Signalements d'un utilisateur, triés par date (écran profil/liste)
CREATE INDEX IF NOT EXISTS idx_signalement_user_date ON signalement(utilisateur_id, date_creation DESC);
-- Filtrage dashboard par statut + priorité
CREATE INDEX IF NOT EXISTS idx_signalement_statut_priorite ON signalement(statut, niveau_priorite);
CREATE INDEX IF NOT EXISTS idx_signalement_type ON signalement(type);
-- Fil d'actualité global (accueil / admin)
CREATE INDEX IF NOT EXISTS idx_signalement_date ON signalement(date_creation DESC);

-- 2.4 PIÈCE JOINTE
CREATE TABLE IF NOT EXISTS piece_jointe (
    id              TEXT PRIMARY KEY,
    signalement_id  TEXT NOT NULL,
    nom_fichier     TEXT NOT NULL,
    type_mime       TEXT NOT NULL,
    url_stockage    TEXT NOT NULL,
    date_ajout      TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (signalement_id) REFERENCES signalement(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_piece_jointe_signalement ON piece_jointe(signalement_id);

-- 2.5 ALERTE
CREATE TABLE IF NOT EXISTS alerte (
    id              TEXT PRIMARY KEY,
    utilisateur_id  TEXT NOT NULL,
    signalement_id  TEXT,
    type            TEXT NOT NULL,
    statut          TEXT NOT NULL DEFAULT 'ACTIVE',
    latitude        REAL,
    longitude       REAL,
    description     TEXT,
    date_creation   TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE,
    FOREIGN KEY (signalement_id) REFERENCES signalement(id) ON DELETE SET NULL,
    FOREIGN KEY (statut) REFERENCES statut_alerte_ref(code)
);

-- Alertes actives triées par date (fil d'alerte temps réel)
CREATE INDEX IF NOT EXISTS idx_alerte_statut_date ON alerte(statut, date_creation DESC);
CREATE INDEX IF NOT EXISTS idx_alerte_user_date ON alerte(utilisateur_id, date_creation DESC);
CREATE INDEX IF NOT EXISTS idx_alerte_signalement ON alerte(signalement_id);

-- 2.6 DOSSIER
CREATE TABLE IF NOT EXISTS dossier (
    id              TEXT PRIMARY KEY,
    signalement_id  TEXT NOT NULL UNIQUE,
    responsable_id  TEXT,
    statut          TEXT NOT NULL DEFAULT 'NOUVEAU',
    date_ouverture  TEXT NOT NULL DEFAULT (datetime('now')),
    date_cloture    TEXT,
    FOREIGN KEY (signalement_id) REFERENCES signalement(id) ON DELETE CASCADE,
    FOREIGN KEY (responsable_id) REFERENCES utilisateur(id) ON DELETE SET NULL,
    FOREIGN KEY (statut) REFERENCES statut_dossier_ref(code)
);

CREATE INDEX IF NOT EXISTS idx_dossier_responsable ON dossier(responsable_id);
-- Tableau de bord dossier : par statut trié par ouverture
CREATE INDEX IF NOT EXISTS idx_dossier_statut_date ON dossier(statut, date_ouverture DESC);

-- 2.7 DOSSIER DISPARITION
CREATE TABLE IF NOT EXISTS dossier_disparition (
    id                      TEXT PRIMARY KEY,
    dossier_id              TEXT NOT NULL UNIQUE,
    identite_jeune          TEXT NOT NULL,
    photo_url               TEXT,
    derniere_zone_connue    TEXT,
    date_heure_disparition  TEXT NOT NULL,
    description             TEXT,
    informations_utiles     TEXT,
    FOREIGN KEY (dossier_id) REFERENCES dossier(id) ON DELETE CASCADE
);

-- 2.8 OBSERVATION
CREATE TABLE IF NOT EXISTS observation (
    id              TEXT PRIMARY KEY,
    dossier_id      TEXT NOT NULL,
    utilisateur_id  TEXT NOT NULL,
    contenu         TEXT NOT NULL,
    date_ajout      TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (dossier_id) REFERENCES dossier(id) ON DELETE CASCADE,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_observation_dossier_date ON observation(dossier_id, date_ajout DESC);
CREATE INDEX IF NOT EXISTS idx_observation_utilisateur ON observation(utilisateur_id);

-- 2.9 HISTORIQUE
CREATE TABLE IF NOT EXISTS historique (
    id              TEXT PRIMARY KEY,
    dossier_id      TEXT NOT NULL,
    utilisateur_id  TEXT,
    action          TEXT NOT NULL,
    date_action     TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (dossier_id) REFERENCES dossier(id) ON DELETE CASCADE,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_historique_dossier_date ON historique(dossier_id, date_action DESC);
CREATE INDEX IF NOT EXISTS idx_historique_utilisateur ON historique(utilisateur_id);

-- 2.10 JOURNAL ACTIVITÉ
CREATE TABLE IF NOT EXISTS journal_activite (
    id              TEXT PRIMARY KEY,
    utilisateur_id  TEXT,
    action          TEXT NOT NULL,
    ip_adresse      TEXT,
    date_action     TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_journal_utilisateur ON journal_activite(utilisateur_id);
CREATE INDEX IF NOT EXISTS idx_journal_date ON journal_activite(date_action DESC);

-- 2.11 NOTIFICATION
CREATE TABLE IF NOT EXISTS notification (
    id              TEXT PRIMARY KEY,
    utilisateur_id  TEXT NOT NULL,
    titre           TEXT NOT NULL,
    message         TEXT NOT NULL,
    lu              INTEGER NOT NULL DEFAULT 0,
    date_creation   TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE
);

-- Notifications non lues d'un utilisateur, triées par date (badge + liste)
CREATE INDEX IF NOT EXISTS idx_notification_user_lu ON notification(utilisateur_id, lu, date_creation DESC);

-- 2.12 PARTAGE POSITION
CREATE TABLE IF NOT EXISTS partage_position (
    id                  TEXT PRIMARY KEY,
    jeune_id            TEXT NOT NULL,
    statut              TEXT NOT NULL DEFAULT 'ACTIF',
    duree_configuree    INTEGER,
    date_debut          TEXT NOT NULL DEFAULT (datetime('now')),
    date_fin            TEXT,
    FOREIGN KEY (jeune_id) REFERENCES utilisateur(id) ON DELETE CASCADE,
    FOREIGN KEY (statut) REFERENCES statut_partage_ref(code)
);

-- Partage actif d'un jeune (suivi temps réel)
CREATE INDEX IF NOT EXISTS idx_partage_jeune_statut ON partage_position(jeune_id, statut);
CREATE INDEX IF NOT EXISTS idx_partage_statut ON partage_position(statut);

-- 2.13 LOCALISATION
CREATE TABLE IF NOT EXISTS localisation (
    id              TEXT PRIMARY KEY,
    partage_id      TEXT NOT NULL,
    latitude        REAL NOT NULL,
    longitude       REAL NOT NULL,
    precision_metre REAL,
    date            TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (partage_id) REFERENCES partage_position(id) ON DELETE CASCADE
);

-- Dernière position d'un partage (requête la plus chaude du tracking)
CREATE INDEX IF NOT EXISTS idx_localisation_partage_date ON localisation(partage_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_localisation_coords ON localisation(latitude, longitude);

-- 2.14 GEOZONE
CREATE TABLE IF NOT EXISTS geozone (
    id                  TEXT PRIMARY KEY,
    nom                 TEXT NOT NULL,
    description         TEXT,
    rayon               REAL NOT NULL,
    latitude_centre     REAL NOT NULL,
    longitude_centre    REAL NOT NULL,
    type_zone           TEXT DEFAULT 'GENERALE'
);

CREATE INDEX IF NOT EXISTS idx_geozone_coords ON geozone(latitude_centre, longitude_centre);

-- 2.15 PARTAGE GEOZONE (table de jonction N:N) — WITHOUT ROWID
CREATE TABLE IF NOT EXISTS partage_geozone (
    partage_id  TEXT NOT NULL,
    geozone_id  TEXT NOT NULL,
    PRIMARY KEY (partage_id, geozone_id),
    FOREIGN KEY (partage_id) REFERENCES partage_position(id) ON DELETE CASCADE,
    FOREIGN KEY (geozone_id) REFERENCES geozone(id) ON DELETE CASCADE
) WITHOUT ROWID;

CREATE INDEX IF NOT EXISTS idx_partage_geozone_geozone ON partage_geozone(geozone_id);

-- ============================================================================
-- 3. VUES UTILES
-- ============================================================================

-- Vue: signalements avec le nom de l'utilisateur
CREATE VIEW IF NOT EXISTS v_signalement_avec_utilisateur AS
SELECT
    s.id,
    s.utilisateur_id,
    u.nom || ' ' || u.prenom AS auteur,
    u.role AS role_auteur,
    s.type,
    tsr.libelle AS type_libelle,
    s.description,
    s.niveau_priorite,
    npr.libelle AS priorite_libelle,
    s.statut,
    sdr.libelle AS statut_libelle,
    s.zone_generale,
    s.latitude,
    s.longitude,
    s.date_creation,
    s.date_modification
FROM signalement s
JOIN utilisateur u ON s.utilisateur_id = u.id
JOIN type_signalement_ref tsr ON s.type = tsr.code
JOIN niveau_priorite_ref npr ON s.niveau_priorite = npr.code
JOIN statut_dossier_ref sdr ON s.statut = sdr.code;

-- Vue: dossiers avec informations complètes
CREATE VIEW IF NOT EXISTS v_dossier_complet AS
SELECT
    d.id,
    d.signalement_id,
    d.responsable_id,
    r.nom || ' ' || r.prenom AS responsable,
    d.statut,
    sdr.libelle AS statut_libelle,
    d.date_ouverture,
    d.date_cloture,
    s.description AS signalement_description,
    s.type AS type_signalement,
    u.nom || ' ' || u.prenom AS signaleur
FROM dossier d
LEFT JOIN utilisateur r ON d.responsable_id = r.id
JOIN statut_dossier_ref sdr ON d.statut = sdr.code
JOIN signalement s ON d.signalement_id = s.id
JOIN utilisateur u ON s.utilisateur_id = u.id;

-- Vue: partage position avec dernières localisations
CREATE VIEW IF NOT EXISTS v_partage_position_localisation AS
SELECT
    pp.id AS partage_id,
    pp.jeune_id,
    u.nom || ' ' || u.prenom AS jeune,
    pp.statut,
    pp.date_debut,
    pp.date_fin,
    l.latitude,
    l.longitude,
    l.precision_metre,
    l.date AS date_localisation
FROM partage_position pp
JOIN utilisateur u ON pp.jeune_id = u.id
LEFT JOIN localisation l ON l.partage_id = pp.id
  AND l.date = (SELECT MAX(date) FROM localisation WHERE partage_id = pp.id);

-- Vue: alertes actives
CREATE VIEW IF NOT EXISTS v_alertes_actives AS
SELECT
    a.id,
    a.utilisateur_id,
    u.nom || ' ' || u.prenom AS declarant,
    a.type,
    a.statut,
    a.latitude,
    a.longitude,
    a.description,
    a.date_creation
FROM alerte a
JOIN utilisateur u ON a.utilisateur_id = u.id
WHERE a.statut != 'ANNULEE';

-- DONNÉES DE RÉFÉRENCE (SEED DATA)

INSERT OR IGNORE INTO role_ref (code, libelle) VALUES
    ('ADMIN', 'Administrateur'),
    ('PARENT', 'Parent / Tuteur'),
    ('JEUNE', 'Jeune'),
    ('ECOLE', 'École / Institution éducative'),
    ('TRAVAILLEUR_SOCIAL', 'Travailleur social'),
    ('ASSOCIATION', 'Association / ONG');

INSERT OR IGNORE INTO type_signalement_ref (code, libelle) VALUES
    ('DISPARITION', 'Disparition'),
    ('SITUATION_DANGEREUSE', 'Situation dangereuse'),
    ('VIOLENCE', 'Violence'),
    ('MENACE', 'Menace'),
    ('PROBLEME_SCOLAIRE', 'Problème scolaire'),
    ('EXPLOITATION', 'Exploitation'),
    ('AUTRE', 'Autre situation préoccupante');

INSERT OR IGNORE INTO statut_dossier_ref (code, libelle) VALUES
    ('NOUVEAU', 'Nouveau'),
    ('EN_ANALYSE', 'En analyse'),
    ('TRANSMIS', 'Transmis'),
    ('EN_SUIVI', 'En suivi'),
    ('RETROUVE', 'Retrouvé'),
    ('CLOS', 'Clôturé');

INSERT OR IGNORE INTO niveau_priorite_ref (code, libelle) VALUES
    ('FAIBLE', 'Faible'),
    ('MOYENNE', 'Moyenne'),
    ('ELEVEE', 'Élevée'),
    ('CRITIQUE', 'Critique');

INSERT OR IGNORE INTO statut_alerte_ref (code, libelle) VALUES
    ('ACTIVE', 'Active'),
    ('PRISE_EN_CHARGE', 'Prise en charge'),
    ('RESOLUE', 'Résolue'),
    ('ANNULEE', 'Annulée');

INSERT OR IGNORE INTO statut_partage_ref (code, libelle) VALUES
    ('ACTIF', 'Actif'),
    ('INACTIF', 'Inactif'),
    ('EXPIRE', 'Expiré');
