import css from './Home.module.css';
import HeroInfoList from 'components/HeroInfoList/HeroInfoList';
import HeroTitleWrap from 'components/HeroTitleWrap/HeroTitleWrap';
import HeroBackground from 'components/HeroBackground/HeroBackground';
import Container from 'components/Container/Container';


export default function Home() {
  return (
    <Container>
      <div className={css.hero}>
        <HeroTitleWrap />
        <HeroBackground />
      </div>
      <HeroInfoList />
    </Container>
  );
}
