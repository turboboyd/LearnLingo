import css from './FavoriteButton.module.css'; 
import sprite from 'images/InlineSprite.svg'; 
import PropTypes from 'prop-types';
const FavoriteButton = ({ isFavorite, randomStyle, handleAddToFavorites }) => (
  <button
    className={css.btn_heart}
    type="button"
    onClick={handleAddToFavorites}
  >
    <svg
      className={css.icon_heart}
      style={
        isFavorite ? { fill: randomStyle.btn, stroke: randomStyle.btn } : {}
      }
    >
      <use xlinkHref={`${sprite}#heart`} />
    </svg>
  </button>
);

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  randomStyle: PropTypes.object.isRequired,
  handleAddToFavorites: PropTypes.func.isRequired,
};

export default FavoriteButton;
