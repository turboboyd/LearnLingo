import { languages, levels, prices } from './DataFlter';
import css from './Filter.module.css';

import Select from 'react-select';
import { selectRandomStyle } from '../../redux/auth/authSelectors';
import { useSelector } from 'react-redux';
import { customStyles } from './customStyles';
import { useFilter } from 'hooks/useFilter';

export default function Filter({
  teachers,
  setFilteredTeachers,
  setTeachersToShow,
  setCurrentPage,
  setHasMore,
  selectedLevel,
  setSelectedLevel,
}) {
  const randomStyle = useSelector(selectRandomStyle);

  const {
    selectedLanguage,
    setSelectedLanguage,
    selectedPrice,
    setSelectedPrice,
    filterTeachers,
  } = useFilter(
    teachers,
    setTeachersToShow,
    setCurrentPage,
    setHasMore,
    setFilteredTeachers,
    selectedLevel,
    setSelectedLevel
    );
  
  const handleSelectLanguage = e => {
    const newLanguage = e.value;
    setSelectedLanguage(newLanguage);
    filterTeachers(newLanguage, selectedLevel, selectedPrice);
  };
  const handleSelectLevel = e => {
    const newLevel = e.value;
    setSelectedLevel(newLevel);
    filterTeachers(selectedLanguage, newLevel, selectedPrice);
  };

  const handleSelectPrice = e => {
    const newPrice = e.value;
    setSelectedPrice(newPrice);
    filterTeachers(selectedLanguage, selectedLevel, newPrice);
  };

  return (
    <div className={css.filter}>
      <div className="">
        <label htmlFor="levels">Level of knowledge</label>
        <Select
          aria-label="Level of knowledge"
          className={css.levels}
          styles={customStyles(randomStyle)}
          defaultValue={levels[0]}
          onChange={handleSelectLevel}
          name="levels"
          options={levels}
          isSearchable={false}
        />
      </div>
      <div className="">
        <label htmlFor="languages">Languages</label>
        <Select
          aria-label="Languages"
          className={css.levels}
          styles={customStyles(randomStyle)}
          defaultValue={languages[0]}
          onChange={handleSelectLanguage}
          name="languages"
          options={languages}
          isSearchable={false}
        />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <Select
          aria-label="Price"
          isSearchable={false}
          defaultValue={prices[0]}
          styles={customStyles(randomStyle)}
          name="price"
          options={prices}
          onChange={handleSelectPrice}
        />
      </div>
    </div>
  );
}
