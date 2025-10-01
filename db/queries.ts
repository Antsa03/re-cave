import { desc, eq } from "drizzle-orm";
import { db } from "./database";
import * as schema from "./schema";

// ===== JOUEUR QUERIES =====
export async function createJoueur(pseudo: string, contact?: string) {
  return await db.insert(schema.joueur).values({ pseudo, contact }).returning();
}

export async function getAllJoueurs() {
  return await db.select().from(schema.joueur);
}

export async function getJoueurById(id: number) {
  return await db
    .select()
    .from(schema.joueur)
    .where(eq(schema.joueur.id_joueur, id));
}

export async function updateJoueur(
  id: number,
  data: { pseudo?: string; contact?: string }
) {
  return await db
    .update(schema.joueur)
    .set(data)
    .where(eq(schema.joueur.id_joueur, id));
}

export async function deleteJoueur(id: number) {
  return await db.delete(schema.joueur).where(eq(schema.joueur.id_joueur, id));
}

// ===== PARTIE QUERIES =====
export async function createPartie(
  date_partie: string,
  big_blind: number,
  type_partie: string,
  max_recave?: number
) {
  return await db
    .insert(schema.partie)
    .values({
      date_partie,
      big_blind,
      type_partie,
      max_recave,
    })
    .returning();
}

export async function getAllParties() {
  return await db
    .select()
    .from(schema.partie)
    .orderBy(desc(schema.partie.date_partie));
}

export async function getPartieById(id: number) {
  return await db
    .select()
    .from(schema.partie)
    .where(eq(schema.partie.id_partie, id));
}

export async function deletePartie(id: number) {
  return await db.delete(schema.partie).where(eq(schema.partie.id_partie, id));
}

// ===== CAVE QUERIES =====
export async function createCave(montant: number, heure_cave: string) {
  return await db
    .insert(schema.cave)
    .values({ montant, heure_cave })
    .returning();
}

export async function getAllCaves() {
  return await db.select().from(schema.cave);
}

export async function getCaveById(id: number) {
  return await db.select().from(schema.cave).where(eq(schema.cave.id_cave, id));
}

// ===== RESULTAT QUERIES =====
export async function createResultat(
  montant_restant: number,
  gain_perte: number
) {
  return await db
    .insert(schema.resultat)
    .values({ montant_restant, gain_perte })
    .returning();
}

export async function getAllResultats() {
  return await db.select().from(schema.resultat);
}

// ===== ACHETER (JOUEUR -> CAVE) =====
export async function acheterCave(id_joueur: number, id_cave: number) {
  return await db.insert(schema.acheter).values({ id_joueur, id_cave });
}

// ===== PARTICIPER (JOUEUR -> PARTIE) =====
export async function participerPartie(
  id_joueur: number,
  id_partie: number,
  heure?: string
) {
  return await db
    .insert(schema.participer)
    .values({ id_joueur, id_partie, heure });
}

export async function getParticipantsPartie(id_partie: number) {
  return await db
    .select({
      joueur: schema.joueur,
      heure: schema.participer.heure,
    })
    .from(schema.participer)
    .innerJoin(
      schema.joueur,
      eq(schema.participer.id_joueur, schema.joueur.id_joueur)
    )
    .where(eq(schema.participer.id_partie, id_partie));
}

// ===== CONTENIR (CAVE -> PARTIE) =====
export async function contenirCave(id_cave: number, id_partie: number) {
  return await db.insert(schema.contenir).values({ id_cave, id_partie });
}

// ===== DECAVER (JOUEUR -> RESULTAT) =====
export async function decaverJoueur(id_joueur: number, id_resultat: number) {
  return await db.insert(schema.decaver).values({ id_joueur, id_resultat });
}

// ===== APPARTENIR (RESULTAT -> PARTIE) =====
export async function appartenirResultat(
  id_resultat: number,
  id_partie: number
) {
  return await db.insert(schema.appartenir).values({ id_resultat, id_partie });
}
