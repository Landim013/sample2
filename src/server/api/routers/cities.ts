// AI Assist: router mínimo de cidades
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const citiesRouter = createTRPCRouter({
  autocomplete: publicProcedure
    .input(
      z.object({ q: z.string().min(1), limit: z.number().int().default(10) }),
    )
    .query(async ({ ctx, input }) => {
      const rows = await ctx.db.city.findMany({
        where: { city_ascii: { contains: input.q } },
        select: { id: true, city: true, country: true },
        orderBy: { city: "asc" },
        take: input.limit,
      });
      return rows;
    }),

  byId: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.city.findUnique({
        where: { id: input.id },
      });
    }),
});
