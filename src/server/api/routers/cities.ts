// AI Assist: router mínimo de cidades (autocomplete + byId)
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const citiesRouter = createTRPCRouter({
  // Autocomplete: digita -> busca por city contendo o termo
  autocomplete: publicProcedure
    .input(
      z.object({ q: z.string().min(1), limit: z.number().int().default(10) }),
    )
    .query(async ({ ctx, input }) => {
      const rows = await ctx.db.city.findMany({
        where: { city_ascii: { contains: input.q } }, // <- busca sem acento
        select: { id: true, city: true, country: true }, // <- exibe nome oficial
        orderBy: { city: "asc" },
        take: input.limit,
      });
      return rows; // [{ id, city, country }]
    }),

  byId: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.city.findUnique({
        where: { id: input.id },
      });
    }),
});
