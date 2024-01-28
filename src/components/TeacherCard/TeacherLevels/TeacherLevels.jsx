import css from './TeacherLevels.module.css'



export const TeacherLevels = ({ teacher, selectedLevel, randomStyle }) => (
  <div className={css.level_wrap}>
    {teacher.levels.map((level, index) => (
      <h3
        className={css.level}
        key={index}
        type={level}
        style={
          level.toLowerCase() === selectedLevel.toLowerCase()
            ? {
                backgroundColor: randomStyle.btn,
                borderColor: randomStyle.btn,
              }
            : {}
        }
      >
        #{level}
      </h3>
    ))}
  </div>
);
