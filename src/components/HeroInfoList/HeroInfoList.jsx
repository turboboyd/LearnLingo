import css from './HeroInfoList.module.css';


const infoListData = [
  { number: '32,000 +', text: 'Experienced tutors' },
  { number: '300,000 +', text: '5-star tutor reviews' },
  { number: '120 +', text: 'Subjects taught' },
  { number: '200 +', text: 'Tutor nationalities' },
];

export default function HeroInfoList({randomStyle}) {
  return (
    <ul className={css.info_list} style={{ borderColor: randomStyle.btn }}>
      {infoListData.map((item, index) => (
        <li className={css.item} key={index}>
          <p className={css.number}>{item.number}</p>
          <p className={css.info_text}>{item.text}</p>
        </li>
      ))}
    </ul>
  );
}
