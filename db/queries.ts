import { and, desc, eq, sql, sum } from "drizzle-orm";
import { db } from "./database";
import * as schema from "./schema";
import { appartenir, cave, contenir, partie, resultat } from "./schema";

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

export async function updateCave(id: number, data: { montant?: number; heure_cave?: string }) {
  return await db.update(schema.cave).set(data).where(eq(schema.cave.id_cave, id));
}

export async function deleteCave(id: number) {
  return await db.delete(schema.cave).where(eq(schema.cave.id_cave, id));
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


export async function getTableStack(id_partie: number) {
  // Total des caves pour cette partie
  const cavesResult = await db
    .select({
      totalCaves: sql<number>`CAST(COALESCE(SUM(${cave.montant}), 0) AS REAL)`,
    })
    .from(cave)
    .innerJoin(contenir, eq(cave.id_cave, contenir.id_cave))
    .where(eq(contenir.id_partie, id_partie));

  // Total des montants restants pour cette partie
  const resultatsResult = await db
    .select({
      totalRestant: sql<number>`CAST(COALESCE(SUM(${resultat.montant_restant}), 0) AS REAL)`,
    })
    .from(resultat)
    .innerJoin(appartenir, eq(resultat.id_resultat, appartenir.id_resultat))
    .where(eq(appartenir.id_partie, id_partie));

  const totalCaves = Number(cavesResult[0]?.totalCaves ?? 0);
  const totalRestant = Number(resultatsResult[0]?.totalRestant ?? 0);

  return totalCaves - totalRestant;
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

// ===== QUERIES AVANCÉES POUR LA GESTION DES PARTIES =====

// Récupérer les caves d'un joueur dans une partie spécifique
export async function getCavesJoueurPartie(id_joueur: number, id_partie: number) {
  return await db
    .select({
      cave: schema.cave,
    })
    .from(schema.acheter)
    .innerJoin(schema.cave, eq(schema.acheter.id_cave, schema.cave.id_cave))
    .innerJoin(schema.contenir, eq(schema.cave.id_cave, schema.contenir.id_cave))
    .where(
      and(
        eq(schema.acheter.id_joueur, id_joueur),
        eq(schema.contenir.id_partie, id_partie)
      )
    );
}

// Récupérer le résultat d'un joueur dans une partie
export async function getResultatJoueurPartie(id_joueur: number, id_partie: number) {
  return await db
    .select({
      resultat: schema.resultat,
    })
    .from(schema.decaver)
    .innerJoin(schema.resultat, eq(schema.decaver.id_resultat, schema.resultat.id_resultat))
    .innerJoin(schema.appartenir, eq(schema.resultat.id_resultat, schema.appartenir.id_resultat))
    .where(
      and(
        eq(schema.decaver.id_joueur, id_joueur),
        eq(schema.appartenir.id_partie, id_partie)
      )
    );
}

// Supprimer un participant d'une partie
export async function retirerParticipant(id_joueur: number, id_partie: number) {
  return await db
    .delete(schema.participer)
    .where(
      and(
        eq(schema.participer.id_joueur, id_joueur),
        eq(schema.participer.id_partie, id_partie)
      )
    );
}

// Récupérer les statistiques d'une partie
export async function getStatistiquesPartie(id_partie: number) {
  const participants = await getParticipantsPartie(id_partie);
  const tableStack = getTableStack(id_partie)
  
  let totalCaves = 0;
  let totalGains = 0;
  let totalPertes = 0;
  
  for (const participant of participants) {
    const caves = await getCavesJoueurPartie(participant.joueur.id_joueur, id_partie);
    const resultat = await getResultatJoueurPartie(participant.joueur.id_joueur, id_partie);
    
    const totalCaveJoueur = caves.reduce((sum, c) => sum + c.cave.montant, 0);
    totalCaves += totalCaveJoueur;
    
    if (resultat.length > 0) {
      const gainPerte = resultat[0].resultat.gain_perte;
      if (gainPerte >= 0) {
        totalGains += gainPerte;
      } else {
        totalPertes += Math.abs(gainPerte);
      }
    }
  }
  
  return {
    nombreParticipants: participants.length,
    tableStack,
    totalCaves,
    totalGains,
    totalPertes,
  };
}
export async function getGlobalStats() {
  // 1. Total de tous les montants de caves
  const totalCavesResult = await db
    .select({
      total: sql<number>`CAST(COALESCE(SUM(${cave.montant}), 0) AS REAL)`,
    })
    .from(cave);

  // 2. Total de tous les montants restants
  const totalRestantResult = await db
    .select({
      total: sql<number>`CAST(COALESCE(SUM(${resultat.montant_restant}), 0) AS REAL)`,
    })
    .from(resultat);

  // 3. Dernière partie
  const dernierePartieResult = await db
    .select({
      id_partie: partie.id_partie,
    })
    .from(partie)
    .orderBy(desc(partie.id_partie))
    .limit(1);

  const totalCaves = Number(totalCavesResult[0]?.total ?? 0);
  const totalRestant = Number(totalRestantResult[0]?.total ?? 0);
  const gainsMainson = totalCaves - totalRestant;

  // 4. Table stack de la dernière partie
  let tableStackDernierePartie = 0;
  if (dernierePartieResult.length > 0) {
    const idDernierePartie = dernierePartieResult[0].id_partie;
    const result  = await db
    .select({
      totalStack: sql<number>`CAST(COALESCE(SUM(${cave.montant}), 0) AS REAL)`,
    })
    .from(cave)
    .innerJoin(contenir, eq(cave.id_cave, contenir.id_cave))
    .where(eq(contenir.id_partie, idDernierePartie));
    tableStackDernierePartie = Number(result[0]?.totalStack ?? 0);
  }
  
  return {
    gainsMainson, // Jetons non décavés (gains de la maison)
    totalCaves, // Total de toutes les caves
    totalRestant, // Total de tous les montants restants
    tableStackDernierePartie, // Table stack de la dernière partie
  };
}
export async function getTotatlRecave(id_partie: number) {
  const result = await db
    .select({
      totalStack: sql<number>`CAST(COALESCE(SUM(${cave.montant}), 0) AS REAL)`,
    })
    .from(cave)
    .innerJoin(contenir, eq(cave.id_cave, contenir.id_cave))
    .where(eq(contenir.id_partie, id_partie));
  
  return Number(result[0]?.totalStack ?? 0);
}