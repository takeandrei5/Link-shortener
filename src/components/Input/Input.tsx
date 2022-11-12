import { Typography } from '@components/Typography';
import { useEffect, useState } from 'react';

import type { InputProps } from './types';
const Input = ({
	id,
	label,
	name,
	onChange,
	initialValue = '',
	pattern = '^[a-zA-Z0-9]+$',
	placeHolder = '',
	required = false,
	title = ''
}: InputProps): JSX.Element => {
	const [text, setText] = useState<string>(initialValue);

	useEffect(() => {
		setText(initialValue);
	}, [initialValue]);

	return (
		<div className='flex w-full items-center gap-2'>
			<label htmlFor={id}>
				<Typography>{label}</Typography>
			</label>
			<input
				className='w-full rounded-lg border border-pink-300 px-1 py-1 text-black hover:border-pink-400 hover:ring-0 hover:ring-pink-400 focus:outline-none'
				id={label}
				name={name}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setText(event.target.value);
					onChange(event.target.value);
				}}
				pattern={pattern}
				placeholder={placeHolder}
				required={required}
				title={title}
				value={text}
			/>
		</div>
	);
};

export default Input;
