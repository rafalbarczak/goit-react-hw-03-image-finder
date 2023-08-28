export const ImageGalleryItem = ({ image, onClick }) => (
  <li className="gallery-item" onClick={onClick}>
    <img src={image.webformatURL} alt={image.tags} />
  </li>
);
