import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schema";

const expoDb = openDatabaseSync("cave.db", { enableChangeListener: true });

export const db = drizzle(expoDb, { schema });

// Fonction d'initialisation de la base de données
export async function initDatabase() {
  try {
    // Créer les tables
    expoDb.execSync(`
      CREATE TABLE IF NOT EXISTS cave (
        id_cave INTEGER PRIMARY KEY AUTOINCREMENT,
        montant REAL NOT NULL DEFAULT 0,
        heure_cave TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS joueur (
        id_joueur INTEGER PRIMARY KEY AUTOINCREMENT,
        pseudo TEXT NOT NULL UNIQUE,
        contact TEXT
      );

      CREATE TABLE IF NOT EXISTS partie (
        id_partie INTEGER PRIMARY KEY AUTOINCREMENT,
        date_partie TEXT NOT NULL,
        big_blind REAL NOT NULL,
        type_partie TEXT NOT NULL,
        max_recave INTEGER
      );

      CREATE TABLE IF NOT EXISTS resultat (
        id_resultat INTEGER PRIMARY KEY AUTOINCREMENT,
        montant_restant REAL NOT NULL DEFAULT 0,
        gain_perte REAL NOT NULL DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS acheter (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_joueur INTEGER NOT NULL,
        id_cave INTEGER NOT NULL,
        FOREIGN KEY (id_joueur) REFERENCES joueur(id_joueur),
        FOREIGN KEY (id_cave) REFERENCES cave(id_cave)
      );

      CREATE TABLE IF NOT EXISTS participer (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_joueur INTEGER NOT NULL,
        id_partie INTEGER NOT NULL,
        heure TEXT,
        FOREIGN KEY (id_joueur) REFERENCES joueur(id_joueur),
        FOREIGN KEY (id_partie) REFERENCES partie(id_partie)
      );

      CREATE TABLE IF NOT EXISTS contenir (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_cave INTEGER NOT NULL,
        id_partie INTEGER NOT NULL,
        FOREIGN KEY (id_cave) REFERENCES cave(id_cave),
        FOREIGN KEY (id_partie) REFERENCES partie(id_partie)
      );

      CREATE TABLE IF NOT EXISTS decaver (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_joueur INTEGER NOT NULL,
        id_resultat INTEGER NOT NULL,
        FOREIGN KEY (id_joueur) REFERENCES joueur(id_joueur),
        FOREIGN KEY (id_resultat) REFERENCES resultat(id_resultat)
      );

      CREATE TABLE IF NOT EXISTS appartenir (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_resultat INTEGER NOT NULL,
        id_partie INTEGER NOT NULL,
        FOREIGN KEY (id_resultat) REFERENCES resultat(id_resultat),
        FOREIGN KEY (id_partie) REFERENCES partie(id_partie)
      );
    `);
    console.log("✅ Base de données initialisée avec succès");
  } catch (error) {
    console.error(
      "❌ Erreur lors de l'initialisation de la base de données:",
      error
    );
    throw error;
  }
}
