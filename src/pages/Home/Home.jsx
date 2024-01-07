import React, { useEffect, useState } from 'react';
import css from './Home.module.css';
import { colors } from 'utils/colors';
import HeroInfoList from 'components/HeroInfoList/HeroInfoList';
import HeroTitleWrap from 'components/HeroTitleWrap/HeroTitleWrap';
import HeroBackground from 'components/HeroBackground/HeroBackground';

export default function Home() {
  const [randomStyle, setRandomStyle] = useState('');
  console.log('randomStyle: ', randomStyle);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    setRandomStyle(colors[randomIndex]);
  }, []);
  return (
    <>
      <div className={css.hero}>
        <HeroTitleWrap randomStyle={randomStyle} />
        <HeroBackground randomStyle={randomStyle} />
      </div>
      <HeroInfoList randomStyle={randomStyle} />
    </>
  );
}
