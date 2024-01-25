import css from './Section.module.css';
import PropTypes from 'prop-types';

const Section = ({ children }) => {
  return <div className={css.section}>{children}</div>;
};

export default Section;

Section.propTypes = {
  children: PropTypes.node.isRequired,
};
