export type ButtonProps = {
	children: string;
	disabled?: boolean;
	fullWidth?: boolean;
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	type?: 'button' | 'submit' | 'reset';
};
