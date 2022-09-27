import { Box, Button } from '@mui/material';
import { ValidSize } from '../../interfaces';

export const SizeSelector = ({ selectedSize, sizes }: SizeSelectorProps) => {
	return (
		<Box>
			{sizes.map((size) => (
				<Button key={size} size='small' color={selectedSize === size ? 'primary' : 'info'}>
					{size}
				</Button>
			))}
		</Box>
	);
};

interface SizeSelectorProps {
	selectedSize?: ValidSize;
	sizes: ValidSize[];
}
