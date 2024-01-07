import css from './HeroBackground.module.css';



export default function HeroBackground({ randomStyle }) {
  return (
    <div
      className={`${css.wrap_img} ${css[randomStyle.name]} ${css.wrap_img} `}
      style={{ backgroundColor: randomStyle.background }}
    ></div>
  );
}
