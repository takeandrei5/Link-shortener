import { Button, Input, Typography } from '@components';
import { trpc } from '@utils/trpc';
import { useState } from 'react';
import uniqid from 'uniqid';

import type { LinkGeneratorProps } from './types';

const LinkGenerator = ({ host }: LinkGeneratorProps): JSX.Element => {
	const [actualUrl, setActualUrl] = useState<string>('');
	const [generatedUrl, setGeneratedUrl] = useState<string>('');
	const [slug, setSlug] = useState<string>('');
	const [invalid, setInvalid] = useState<boolean>(false);

	const createOneMutation = trpc.link.createOne.useMutation({
		onSuccess: (): void => {
			const url: URL = new URL(slug, host);
			setGeneratedUrl(url.href);
			reset();
		}
	});
	const findOneQuery = trpc.link.findOne.useQuery(
		{ slug },
		{
			onSuccess: async (data) => {
				if (data.found) {
					setInvalid(true);

					return;
				}

				await createOneMutation.mutateAsync({ actualUrl, slug });
			},
			enabled: false
		}
	);

	const handleOnRandomClick = (): void => {
		const randomSlug: string = uniqid();

		setSlug(randomSlug);
	};

	const handleOnGenerateClick = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		await findOneQuery.refetch();
	};

	const onCopyButtonClick = (): void => {
		navigator.clipboard.writeText(generatedUrl);
	};

	const reset = (): void => {
		setActualUrl('');
		setSlug('');
	};

	return (
		<form className='flex w-full flex-col items-center justify-center gap-2 sm:w-1/2 md:w-1/2 lg:w-1/3' onSubmit={handleOnGenerateClick}>
			{invalid && <Typography danger>Invalid slug</Typography>}
			<div className='flex w-full flex-row gap-2'>
				<Input id='urn' initialValue={slug} label={host} placeHolder='random' name='urn' onChange={setSlug} required />
				<Button onClick={handleOnRandomClick}>Randomize</Button>
			</div>
			<Input
				id='actualUrl'
				initialValue={actualUrl}
				label='Link:'
				pattern={'^(https?://)([da-z.-]+).([a-z.]{2,6})([/w .-]*)*/?$'}
				placeHolder='www.google.com'
				name='actualUrl'
				onChange={setActualUrl}
				required
			/>
			<Button fullWidth type='submit'>
				Generate!
			</Button>
			<div className={`${!!generatedUrl ? 'opacity-100' : 'opacity-0'} flex flex-row items-center gap-2`}>
				<Typography>{generatedUrl}</Typography>
				<Button fullWidth onClick={onCopyButtonClick}>
					Copy link
				</Button>
			</div>
		</form>
	);
};

export default LinkGenerator;
