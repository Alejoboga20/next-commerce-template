import { Slide } from 'react-slideshow-image';
import styles from './ProductSlideshow.module.css';

export const ProductSlideshow = ({ images }: ProductSlideshowProps) => {
	return (
		<Slide easing='ease' duration={7000} indicators>
			{images.map((image) => {
				const url = image;

				return (
					<div className={styles['each-slide']} key={image}>
						<div style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover' }}></div>
					</div>
				);
			})}
		</Slide>
	);
};

interface ProductSlideshowProps {
	images: string[];
}
