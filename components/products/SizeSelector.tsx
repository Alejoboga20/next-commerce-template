import { Box, Button } from '@mui/material';
import { ValidSize } from '../../interfaces';

export const SizeSelector = ({ selectedSize, sizes, onSelectedSize }: SizeSelectorProps) => {
	return (
		<Box>
			{sizes.map((size) => (
				<Button
					key={size}
					size='small'
					color={selectedSize === size ? 'primary' : 'info'}
					onClick={() => onSelectedSize(size)}
				>
					{size}
				</Button>
			))}
		</Box>
	);
};

interface SizeSelectorProps {
	selectedSize?: ValidSize;
	sizes: ValidSize[];
	onSelectedSize: (size: ValidSize) => void;
}
