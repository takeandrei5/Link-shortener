import { z } from 'zod';

import { publicProcedure, router } from '../trpc';

import type { Link } from '@prisma/client';

export const linkRouter = router({
	findOne: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) => {
		const count: number = await ctx.prisma.link.count({
			where: {
				slug: {
					equals: input.slug
				}
			}
		});

		return { found: count > 0 };
	}),
	getOneBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) => {
		const link: Link | null = await ctx.prisma.link.findFirst({
			where: {
				slug: {
					equals: input.slug
				}
			}
		});

		return link;
	}),
	createOne: publicProcedure.input(z.object({ actualUrl: z.string(), slug: z.string() })).mutation(async ({ ctx, input }) => {
		await ctx.prisma.link.create({
			data: {
				actualUrl: input.actualUrl,
				slug: input.slug
			}
		});
	})
});
