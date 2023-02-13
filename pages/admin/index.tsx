import useSWR from 'swr';
import {
	AccessTimeOutlined,
	CancelPresentationOutlined,
	CategoryOutlined,
	CreditCardOutlined,
	DashboardOutlined,
	GroupOutlined,
	MoneyOutlined,
	ProductionQuantityLimitsOutlined,
} from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { AdminLayout } from '../../components/layouts';
import { SummaryTile } from '../../components/admin';
import { CreditCardOffOutlined } from '@mui/icons-material';
import { DashboardSummaryResponse } from '../../interfaces';
import { useEffect, useState } from 'react';

const DashboardPage = () => {
	const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
		refreshInterval: 30 * 1000,
	});

	const [refreshIn, setRefreshIn] = useState(30);

	useEffect(() => {
		const interval = setInterval(() => {
			setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	if (!data && !data) {
		return <>Loading...</>;
	}

	if (error) {
		console.log(error);
		return <Typography>Error Loading information</Typography>;
	}

	const {
		numberOfOrders,
		paidOrders,
		notpaidOrders,
		numberOfClients,
		numberOfProducts,
		productsWithNoInventory,
		lowInventory,
	} = data;

	return (
		<AdminLayout title='Dashboard' subtitle='Stats' icon={<DashboardOutlined />}>
			<Grid container spacing={2}>
				<SummaryTile
					title={numberOfOrders}
					subtitle='Orders'
					icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={paidOrders}
					subtitle='Payed Orders'
					icon={<MoneyOutlined color='success' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={notpaidOrders}
					subtitle='Pending Orders'
					icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={numberOfClients}
					subtitle='Clients'
					icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={numberOfProducts}
					subtitle='Products'
					icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={productsWithNoInventory}
					subtitle='No stock'
					icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={lowInventory}
					subtitle='Last Units'
					icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={refreshIn}
					subtitle='Update in:'
					icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
				/>
			</Grid>
		</AdminLayout>
	);
};

export default DashboardPage;
