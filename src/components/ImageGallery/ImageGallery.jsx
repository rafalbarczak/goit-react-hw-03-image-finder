import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
export const ImageGallery = ({ images, onClick }) => (
  <ul className={css.gallery}>
    {images.map(image => (
      <ImageGalleryItem
        image={image}
        onClick={() => onClick(image)}
        key={image.id}
      />
    ))}
  </ul>
);
