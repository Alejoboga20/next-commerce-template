import useSWR, { SWRConfiguration } from 'swr';
import { IProduct } from '../interfaces';

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
	const { data, error } = useSWR<IProductResponse>(`/api/${url}`, config);
	const products = data?.products || [];

	return {
		products,
		isLoading: !error && !data,
		isError: error,
	};
};

interface IProductResponse {
	products: IProduct[];
}
