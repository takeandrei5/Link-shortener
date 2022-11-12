import { prisma } from '@server/db/client';

import type { Link } from '.prisma/client';

import type { NextApiRequest, NextApiResponse } from 'next';

const getUrlApi = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const { slug } = req.query;

	if (!slug || typeof slug !== 'string') {
		res.status(400).json({ error: 'Enter a valid string.' });

		return;
	}

	const link: Link | null = await prisma.link.findFirst({
		where: {
			slug: {
				equals: slug
			}
		}
	});

	if (!link) {
		res.status(404).json({ error: 'Link not found.' });

		return;
	}

	res.status(200).json(link);
};

export default getUrlApi;
