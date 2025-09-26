// AI Assist: seed base para importar worldcities.csv -> MySQL via Prisma

import { PrismaClient } from "@prisma/client";
import { parse } from "csv-parse/sync";
import { readFile } from "node:fs/promises";
import path from "node:path";

const prisma = new PrismaClient();

// Caminho do CSV (ajuste se precisar)
const CSV_PATH = path.resolve(
  process.cwd(),
  "public",
  "cities",
  "worldcities.csv",
);

// Normalizador opcional: remove acentos e deixa minúsculo
// function normalize(str: string) {
//   return str
//     ?.normalize("NFD")
//     .replace(/\p{Diacritic}/gu, "")
//     .toLowerCase()
//     .trim();
// }

// Tipagem das colunas do CSV
type Row = {
  city: string;
  city_ascii: string;
  lat: string;
  lng: string;
  country: string;
  iso2: string;
  iso3: string;
  admin_name: string;
  capital: string;
  population: string;
  id: string;
};

async function main() {
  console.time("[seed] total");

  // Lê o arquivo CSV
  const file = await readFile(CSV_PATH, "utf8");

  // Converte o CSV em objetos
  const rows = parse<Row>(file, {
    columns: true,
    skip_empty_lines: true,
    relax_quotes: true,
    trim: true,
  });

  // Transforma as linhas no formato esperado pelo Prisma
  const data = rows.map((r) => ({
    id: r.id, // PK (string no schema)
    city: r.city,
    city_ascii: r.city_ascii,
    lat: Number(r.lat),
    lng: Number(r.lng),
    country: r.country,
    iso2: r.iso2,
    iso3: r.iso3,
    admin_name: r.admin_name,
    capital: r.capital || null,
    population: r.population ? Number(r.population) : null,
    // Se no schema futuramente você criar um campo `citySearch`, dá pra usar:
    // citySearch: normalize(r.city),
  }));

  // Cria em lote (ignora duplicatas se rodar mais de uma vez)
  console.time("[seed] createMany");
  const res = await prisma.city.createMany({
    data,
    skipDuplicates: true,
  });
  console.timeEnd("[seed] createMany");

  console.log(`[seed] inseridos (ou ignorados): ${res.count}`);
  console.timeEnd("[seed] total");
}

// Executa o seed
main()
  .catch((e: unknown) => {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[seed] erro:", msg);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
