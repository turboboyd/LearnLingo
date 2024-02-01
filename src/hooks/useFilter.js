import { useState } from 'react';

export const useFilter = (
  teachers,
  setTeachersToShow,
  setCurrentPage,
  setHasMore,
  setFilteredTeachers,
  selectedLevel,
  setSelectedLevel
) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
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

  return {
    selectedLanguage,
    setSelectedLanguage,
    selectedPrice,
    setSelectedPrice,
    filterTeachers,
  };
};
