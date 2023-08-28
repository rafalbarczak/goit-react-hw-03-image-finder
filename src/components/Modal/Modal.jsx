import css from './Modal.module.css';
export const Modal = ({ image, onClick }) => (
  <div className={css.overlay} onClick={onClick}>
    <div className={css.modal}>
      <img src={image.largeImageURL} alt={image.tags} />
    </div>
  </div>
);
