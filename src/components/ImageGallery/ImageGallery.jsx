import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
export const ImageGallery = ({ images }) => (
  <ul className={css.gallery}>
    {console.log(images)}
    {images.map(image => (
      <ImageGalleryItem image={image} />
    ))}
  </ul>
);
