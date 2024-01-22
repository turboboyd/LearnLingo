import { Field } from 'formik';
import css from './Topics.module.css';
import { topicsArray } from './topicsArray';
import PropTypes from 'prop-types'; 

const Topics = ({ type, name }) => (
  <>
    <h3 className={css.ask}>What is your main reason for learning English?</h3>
    {topicsArray.map((topic, index) => (
      <label className={css.radio_wrap} key={index}>
        <Field
          className={css.radio_btn}
          type={type}
          name={name}
          value={topic}
        />
        <span>{topic}</span>
      </label>
    ))}
  </>
);

Topics.propTypes = {
  type: PropTypes.string.isRequired, 
  name: PropTypes.string.isRequired, 
};

export default Topics;
