import * as SQLite from 'expo-sqlite';
import { SCHEMA_SQL, SEED_SQL } from './schema';

const DATABASE_NAME = 'safemada.db';
const DATABASE_VERSION = 2;

let db: SQLite.SQLiteDatabase | null = null;

/**
 * PRAGMAs de performance appliqués à chaque ouverture.
 * - WAL : lectures concurrentes non bloquantes, écritures plus rapides
 * - synchronous=NORMAL : sûr en WAL (pas de fsync à chaque commit)
 * - cache_size négatif = taille en KiB (-20000 => 20 Mo)
 * - mmap_size : I/O mappées en mémoire
 * - temp_store=MEMORY : tris/tables temporaires en RAM
 * - busy_timeout : attendre au lieu d'échouer si verrou
 */
async function applyPerformancePragmas(database: SQLite.SQLiteDatabase): Promise<void> {
  await database.execAsync(`
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    PRAGMA cache_size = -20000;
    PRAGMA temp_store = MEMORY;
    PRAGMA mmap_size = 268435456;
    PRAGMA busy_timeout = 5000;
    PRAGMA wal_autocheckpoint = 1000;
  `);
}

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;
  db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  await applyPerformancePragmas(db);
  await initDatabase(db);
  return db;
}

async function initDatabase(database: SQLite.SQLiteDatabase): Promise<void> {
  const result = await database.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  const currentVersion = result?.user_version ?? 0;

  if (currentVersion < 2) {
    // v0/v1 → v2 : schéma optimisé (WITHOUT ROWID, index composés DESC).
    // NON déplaçable par ALTER TABLE -> reconstruction complète.
    try {
      await database.withExclusiveTransactionAsync(async (txn) => {
        await txn.execAsync(`
          DROP VIEW IF EXISTS v_signalement_avec_utilisateur;
          DROP VIEW IF EXISTS v_dossier_complet;
          DROP VIEW IF EXISTS v_partage_position_localisation;
          DROP VIEW IF EXISTS v_alertes_actives;
          DROP TABLE IF EXISTS partage_geozone;
          DROP TABLE IF EXISTS geozone;
          DROP TABLE IF EXISTS localisation;
          DROP TABLE IF EXISTS partage_position;
          DROP TABLE IF EXISTS notification;
          DROP TABLE IF EXISTS journal_activite;
          DROP TABLE IF EXISTS historique;
          DROP TABLE IF EXISTS observation;
          DROP TABLE IF EXISTS dossier_disparition;
          DROP TABLE IF EXISTS dossier;
          DROP TABLE IF EXISTS alerte;
          DROP TABLE IF EXISTS piece_jointe;
          DROP TABLE IF EXISTS signalement;
          DROP TABLE IF EXISTS contact_confiance;
          DROP TABLE IF EXISTS utilisateur;
          DROP TABLE IF EXISTS statut_partage_ref;
          DROP TABLE IF EXISTS statut_alerte_ref;
          DROP TABLE IF EXISTS niveau_priorite_ref;
          DROP TABLE IF EXISTS statut_dossier_ref;
          DROP TABLE IF EXISTS type_signalement_ref;
          DROP TABLE IF EXISTS role_ref;
        `);
        await txn.execAsync(SCHEMA_SQL);
        await txn.execAsync(SEED_SQL);
        await txn.execAsync('PRAGMA user_version = 2;');
      });
    } catch (error) {
      console.error('Erreur lors de la création du schéma SQLite:', error);
      throw error;
    }
  }

  // Statistiques du plan d'exécution (ré-analyse incrémentale)
  await database.execAsync('PRAGMA optimize;');
}

export async function resetDatabase(): Promise<void> {
  if (db) {
    await db.closeAsync();
    db = null;
  }
  await SQLite.deleteDatabaseAsync(DATABASE_NAME);
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.closeAsync();
    db = null;
  }
}

export { DATABASE_NAME, DATABASE_VERSION };