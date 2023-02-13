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
import { Grid } from '@mui/material';
import { AdminLayout } from '../../components/layouts';
import { SummaryTile } from '../../components/admin';
import { CreditCardOffOutlined } from '@mui/icons-material';

const DashboardPage = () => {
	return (
		<AdminLayout title='Dashboard' subtitle='Stats' icon={<DashboardOutlined />}>
			<Grid container spacing={2}>
				<SummaryTile
					title={1}
					subtitle='Orders'
					icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={2}
					subtitle='Payed Orders'
					icon={<MoneyOutlined color='success' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={3}
					subtitle='Pending Orders'
					icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={4}
					subtitle='Clients'
					icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={5}
					subtitle='Products'
					icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={6}
					subtitle='No stock'
					icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={7}
					subtitle='Last Units'
					icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={8}
					subtitle='Update in:'
					icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
				/>
			</Grid>
		</AdminLayout>
	);
};

export default DashboardPage;
