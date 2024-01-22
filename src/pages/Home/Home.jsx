import css from './Home.module.css';
import HeroInfoList from 'components/HeroInfoList/HeroInfoList';
import HeroTitleWrap from 'components/HeroTitleWrap/HeroTitleWrap';
import HeroBackground from 'components/HeroBackground/HeroBackground';

export default function Home() {

  return (
    <>
      <div className={css.hero}>
        <HeroTitleWrap  />
        <HeroBackground />
      </div>
      <HeroInfoList/>
    </>
  );
}
