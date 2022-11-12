export type InputProps = {
	id: string;
	label: string;
	name: string;
	onChange: (value: string) => void;
	initialValue?: string;
	pattern?: string;
	placeHolder?: string;
	required?: boolean;
	title?: string;
};
