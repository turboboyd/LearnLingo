import { useState } from 'react';
import { languages, levels } from './DataFlter';
import css from './Filter.module.css'
export default function Filter({
  teachers,
  setFilteredTeachers,
  setTeachersToShow,
  setCurrentPage,
  setHasMore,
}) {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  const filterTeachers = async (language, level, price) => {
    setTeachersToShow([]);
    setCurrentPage(1);
    setHasMore(true);
    let filterData = teachers;
    if (language) {
      filterData = filterByLanguage(filterData, language);
    }
    if (level) {
      filterData = filterByLevel(filterData, level);
    }
    if (price) {
      filterData = filterByPrice(filterData, price);
    }
    setFilteredTeachers(filterData);
  };

  const filterByLanguage = (teachers, language) => {
    return teachers.filter(teacher => teacher.languages.includes(language));
  };

  const filterByLevel = (teachers, level) => {
    return teachers.filter(teacher => teacher.levels.includes(level));
  };

  const filterByPrice = (teachers, price) => {
    return teachers.filter(teacher => teacher.price_per_hour === Number(price));
  };

  const handleSelectLanguage = e => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    filterTeachers(newLanguage, selectedLevel, selectedPrice);
  };
  const handleSelectLevel = e => {
    const newLevel = e.target.value;
    setSelectedLevel(newLevel);
    filterTeachers(selectedLanguage, newLevel, selectedPrice);
  };

  const handleSelectPrice = e => {
    const newPrice = e.target.value;
    setSelectedPrice(newPrice);
    filterTeachers(selectedLanguage, selectedLevel, newPrice);
  };

  return (
    <>
      <ul className={css.filter}>
        <li>
          Languages
          <select
            name="language"
            value={selectedLanguage}
            onChange={handleSelectLanguage}
          >
            <option value="">Any</option>
            {languages.map((level, i) => (
              <option key={i} value={level}>
                {level}
              </option>
            ))}
          </select>
        </li>
        <li>
          Level of knowledge
          <select
            name="level"
            value={selectedLevel}
            onChange={handleSelectLevel}
          >
            {levels.map((level, i) => (
              <option key={i} value={level}>
                {level}
              </option>
            ))}
          </select>
        </li>
        <li>
          Price
          <select
            name="price"
            value={selectedPrice}
            onChange={handleSelectPrice}
          >
            <option value="">Any</option>
            {Array.from({ length: 11 }, (_, i) => i + 25).map((price, i) => (
              <option key={i} value={price}>
                {price} $
              </option>
            ))}
          </select>
        </li>
      </ul>
    </>
  );
}
