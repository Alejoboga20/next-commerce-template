import { GetServerSideProps } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import {
	Box,
	Button,
	capitalize,
	Card,
	CardActions,
	CardMedia,
	Checkbox,
	Chip,
	Divider,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material';
import { dbProducts } from '../../../database';
import { AdminLayout } from '../../../components/layouts';
import { IProduct } from '../../../interfaces';
import { useEffect, useState } from 'react';

const validTypes = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender = ['men', 'women', 'kid', 'unisex'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

interface Props {
	product: IProduct;
}

type FormData = Omit<IProduct, 'createdAt' | 'updatedAt'>;

const ProductAdminPage = ({ product }: Props) => {
	const [newTagValue, setNewTagValue] = useState('');

	const {
		handleSubmit,
		register,
		getValues,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FormData>({ defaultValues: product });

	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			if (name === 'title') {
				const newSlug =
					value.title?.trim().replaceAll(' ', '_').replaceAll("'", '').toLocaleLowerCase() || '';
				setValue('slug', newSlug);
			}
		});

		return () => subscription.unsubscribe();
	}, [watch, setValue]);

	const onSubmit: SubmitHandler<FormData> = (data) => {
		console.log({ data });
	};

	const onDeleteTag = (tag: string) => {
		const updatedTags = getValues('tags').filter((t) => t !== tag);
		setValue('tags', updatedTags, { shouldValidate: true });
	};

	const onNewTag = () => {
		const newTag = newTagValue.trim().toLowerCase();
		setNewTagValue('');

		const currentTags = getValues('tags');

		if (currentTags.includes(newTag)) return;

		currentTags.push(newTag);
	};

	const onChangeSize = (size: string) => {
		const currentSizes = getValues('sizes');

		if (currentSizes.includes(size as any)) {
			return setValue(
				'sizes',
				currentSizes.filter((s) => s !== size),
				{ shouldValidate: true }
			);
		}

		setValue('sizes', [...currentSizes, size as any], { shouldValidate: true });
	};

	return (
		<AdminLayout
			title={'Producto'}
			subtitle={`Edit: ${product.title}`}
			icon={<DriveFileRenameOutline />}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
					<Button
						color='secondary'
						startIcon={<SaveOutlined />}
						sx={{ width: '150px' }}
						type='submit'
					>
						Guardar
					</Button>
				</Box>

				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
							label='Title'
							variant='filled'
							fullWidth
							sx={{ mb: 1 }}
							{...register('title', {
								required: 'Required Field',
								minLength: { value: 2, message: 'Min length 2 chars' },
							})}
							error={!!errors.title}
							helperText={errors.title?.message}
						/>

						<TextField
							label='Description'
							variant='filled'
							fullWidth
							multiline
							sx={{ mb: 1 }}
							{...register('description', {
								required: 'Required Field',
								minLength: { value: 2, message: 'Min length 2 chars' },
							})}
							error={!!errors.description}
							helperText={errors.description?.message}
						/>

						<TextField
							label='In Stock'
							type='number'
							variant='filled'
							fullWidth
							sx={{ mb: 1 }}
							{...register('inStock', {
								required: 'Required Field',
								min: { value: 0, message: 'Min value is 0' },
							})}
							error={!!errors.inStock}
							helperText={errors.inStock?.message}
						/>

						<TextField
							label='price'
							type='number'
							variant='filled'
							fullWidth
							sx={{ mb: 1 }}
							{...register('price', {
								required: 'Required Field',
								min: { value: 0, message: 'Min value is 0' },
							})}
							error={!!errors.price}
							helperText={errors.price?.message}
						/>

						<Divider sx={{ my: 1 }} />

						<FormControl sx={{ mb: 1 }}>
							<FormLabel>Type</FormLabel>
							<RadioGroup
								row
								value={getValues('type')}
								onChange={({ target }) =>
									setValue('type', target.value as any, { shouldValidate: true })
								}
							>
								{validTypes.map((option) => (
									<FormControlLabel
										key={option}
										value={option}
										control={<Radio color='secondary' />}
										label={capitalize(option)}
									/>
								))}
							</RadioGroup>
						</FormControl>

						<FormControl sx={{ mb: 1 }}>
							<FormLabel>Gender</FormLabel>
							<RadioGroup
								row
								value={getValues('gender')}
								onChange={({ target }) =>
									setValue('gender', target.value as any, { shouldValidate: true })
								}
							>
								{validGender.map((option) => (
									<FormControlLabel
										key={option}
										value={option}
										control={<Radio color='secondary' />}
										label={capitalize(option)}
									/>
								))}
							</RadioGroup>
						</FormControl>

						<FormGroup>
							<FormLabel>Sizes</FormLabel>
							{validSizes.map((size) => (
								<FormControlLabel
									key={size}
									control={<Checkbox checked={getValues('sizes').includes(size as any)} />}
									label={size}
									onChange={() => onChangeSize(size)}
								/>
							))}
						</FormGroup>
					</Grid>

					{/* Tags e imagenes */}
					<Grid item xs={12} sm={6}>
						<TextField
							label='Slug - URL'
							variant='filled'
							fullWidth
							sx={{ mb: 1 }}
							{...register('slug', {
								required: 'Required Field',
								validate: (val) =>
									val.trim().includes(' ') ? 'Blank spaces not allowed' : undefined,
							})}
							error={!!errors.slug}
							helperText={errors.slug?.message}
						/>

						<TextField
							label='tags'
							variant='filled'
							fullWidth
							sx={{ mb: 1 }}
							helperText='Press [spacebar] to add'
							value={newTagValue}
							onChange={({ target }) => setNewTagValue(target.value)}
							onKeyUp={({ code }) => (code === 'Space' ? onNewTag() : undefined)}
						/>

						<Box
							sx={{
								display: 'flex',
								flexWrap: 'wrap',
								listStyle: 'none',
								p: 0,
								m: 0,
							}}
							component='ul'
						>
							{getValues('tags').map((tag) => {
								return (
									<Chip
										key={tag}
										label={tag}
										onDelete={() => onDeleteTag(tag)}
										color='primary'
										size='small'
										sx={{ ml: 1, mt: 1 }}
									/>
								);
							})}
						</Box>

						<Divider sx={{ my: 2 }} />

						<Box display='flex' flexDirection='column'>
							<FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
							<Button color='secondary' fullWidth startIcon={<UploadOutlined />} sx={{ mb: 3 }}>
								Cargar imagen
							</Button>

							<Chip label='Es necesario al 2 imagenes' color='error' variant='outlined' />

							<Grid container spacing={2}>
								{product.images.map((img) => (
									<Grid item xs={4} sm={3} key={img}>
										<Card>
											<CardMedia
												component='img'
												className='fadeIn'
												image={`/products/${img}`}
												alt={img}
											/>
											<CardActions>
												<Button fullWidth color='error'>
													Borrar
												</Button>
											</CardActions>
										</Card>
									</Grid>
								))}
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</form>
		</AdminLayout>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { slug = '' } = query;

	const product = await dbProducts.getProductBySlug(slug.toString());

	if (!product) {
		return {
			redirect: {
				destination: '/admin/products',
				permanent: false,
			},
		};
	}

	return {
		props: {
			product,
		},
	};
};

export default ProductAdminPage;
