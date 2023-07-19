export const ImageGalleryItem = ({ image }) => (
  <li className="gallery-item" key={image.id}>
    <img src={image.webformatURL} alt={image.tags} />
  </li>
);
