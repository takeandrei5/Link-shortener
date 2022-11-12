import { Typography } from '@components';

import type { ButtonProps } from './types';

const Button = ({
	children,
	disabled = false,
	fullWidth = false,
	onClick = () => {
		return;
	},
	type = 'button'
}: ButtonProps): JSX.Element => {
	return (
		<button
			className={`flex h-full flex-row justify-center rounded-lg border-0 bg-pink-300 px-1 py-1.5 shadow-xl ${
				fullWidth ? 'w-full' : 'w-fit'
			} hover:bg-pink-400`}
			disabled={disabled}
			onClick={onClick}
			type={type}>
			<Typography>{children}</Typography>
		</button>
	);
};

export default Button;
