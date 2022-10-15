import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

export const ItemCounter = ({ currentValue, maxValue, updatedQuantity }: ItemCounterProps) => {
	const addOrRemove = (value: number) => {
		if (value === -1) {
			if (currentValue === 1) return;

			return updatedQuantity(currentValue - 1);
		}

		if (currentValue >= maxValue) return;

		updatedQuantity(currentValue + 1);
	};

	return (
		<Box display='flex' alignItems='center'>
			<IconButton disabled={currentValue <= 1} onClick={() => addOrRemove(-1)}>
				<RemoveCircleOutline />
			</IconButton>
			<Typography sx={{ width: 40, textAlign: 'center' }}>{currentValue}</Typography>
			<IconButton disabled={currentValue >= maxValue} onClick={() => addOrRemove(1)}>
				<AddCircleOutline />
			</IconButton>
		</Box>
	);
};

interface ItemCounterProps {
	currentValue: number;
	maxValue: number;
	updatedQuantity: (newValue: number) => void;
}
