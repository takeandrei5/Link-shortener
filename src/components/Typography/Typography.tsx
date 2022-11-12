import type { TypographyProps } from './types';

const Typography = ({ children, danger = false }: TypographyProps): JSX.Element => {
	return <span className={`text-base font-bold ${danger ? 'text-red-600' : 'text-black'}`}>{children}</span>;
};

export default Typography;
