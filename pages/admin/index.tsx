import { DashboardOutlined } from '@mui/icons-material';
import { AdminLayout } from '../../components/layouts';

const DashboardPage = () => {
	return (
		<AdminLayout title='Dashboard' subtitle='Stats' icon={<DashboardOutlined />}>
			<h3>Admin Panel</h3>
		</AdminLayout>
	);
};

export default DashboardPage;
