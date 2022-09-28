import { Grid, Typography } from '@mui/material';

export const OrderSummary = () => {
	return (
		<Grid container>
			<Grid item xs={6}>
				<Typography>No. Products: </Typography>
			</Grid>
			<Grid item xs={6} display='flex' justifyContent='end'>
				<Typography>3</Typography>
			</Grid>
			<Grid item xs={6}>
				<Typography>Sub Total: </Typography>
			</Grid>
			<Grid item xs={6} display='flex' justifyContent='end'>
				<Typography>$150</Typography>
			</Grid>
			<Grid item xs={6}>
				<Typography>Taxes: 15%</Typography>
			</Grid>
			<Grid item xs={6} display='flex' justifyContent='end'>
				<Typography>$15</Typography>
			</Grid>
			<Grid item xs={6} sx={{ mt: 2 }}>
				<Typography variant='subtitle1'>Total:</Typography>
			</Grid>
			<Grid item xs={6} display='flex' justifyContent='end' sx={{ mt: 2 }}>
				<Typography variant='subtitle1'>$165</Typography>
			</Grid>
		</Grid>
	);
};
