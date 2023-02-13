export interface DashboardSummaryResponse {
	numberOfOrders: number;
	paidOrders: number;
	notpaidOrders: number;
	numberOfClients: number;
	numberOfProducts: number;
	productsWithNoInventory: number;
	lowInventory: number;
}
