import css from './Button.module.css';

export const Button = ({ onClick }) => (
  <button type="button" className={css['load-more']} onClick={onClick}>
    Load more
  </button>
);
