import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Table CAVE
export const cave = sqliteTable("cave", {
  id_cave: integer("id_cave").primaryKey({ autoIncrement: true }),
  montant: real("montant").notNull().default(0),
  heure_cave: text("heure_cave").notNull(),
});

// Table JOUEUR
export const joueur = sqliteTable("joueur", {
  id_joueur: integer("id_joueur").primaryKey({ autoIncrement: true }),
  pseudo: text("pseudo").notNull().unique(),
  contact: text("contact"),
});

// Table PARTIE
export const partie = sqliteTable("partie", {
  id_partie: integer("id_partie").primaryKey({ autoIncrement: true }),
  date_partie: text("date_partie").notNull(),
  big_blind: real("big_blind").notNull(),
  type_partie: text("type_partie").notNull(), // 'cash_game' ou 'tournament'
  max_recave: integer("max_recave"),
});

// Table RESULTAT
export const resultat = sqliteTable("resultat", {
  id_resultat: integer("id_resultat").primaryKey({ autoIncrement: true }),
  montant_restant: real("montant_restant").notNull().default(0),
  gain_perte: real("gain_perte").notNull().default(0),
});

// Table d'association Acheter (JOUEUR -> CAVE)
export const acheter = sqliteTable("acheter", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  id_joueur: integer("id_joueur")
    .notNull()
    .references(() => joueur.id_joueur),
  id_cave: integer("id_cave")
    .notNull()
    .references(() => cave.id_cave),
});

// Table d'association Participer (JOUEUR -> PARTIE)
export const participer = sqliteTable("participer", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  id_joueur: integer("id_joueur")
    .notNull()
    .references(() => joueur.id_joueur),
  id_partie: integer("id_partie")
    .notNull()
    .references(() => partie.id_partie),
  heure: text("heure"),
});

// Table d'association Contenir (CAVE -> PARTIE)
export const contenir = sqliteTable("contenir", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  id_cave: integer("id_cave")
    .notNull()
    .references(() => cave.id_cave),
  id_partie: integer("id_partie")
    .notNull()
    .references(() => partie.id_partie),
});

// Table d'association Decaver (JOUEUR -> RESULTAT)
export const decaver = sqliteTable("decaver", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  id_joueur: integer("id_joueur")
    .notNull()
    .references(() => joueur.id_joueur),
  id_resultat: integer("id_resultat")
    .notNull()
    .references(() => resultat.id_resultat),
});

// Table d'association Appartenir (RESULTAT -> PARTIE)
export const appartenir = sqliteTable("appartenir", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  id_resultat: integer("id_resultat")
    .notNull()
    .references(() => resultat.id_resultat),
  id_partie: integer("id_partie")
    .notNull()
    .references(() => partie.id_partie),
});
