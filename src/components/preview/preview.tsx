import { useAppSelector } from '../../app/hooks';
import s from './preview.module.scss';
import { selectAboutMe, selectCertificates, selectEducation, selectExperience, selectSkills, selectSectionsOrder } from "../../redux/sections-slice";

export const Preview = () => {
  const sectionsOrder = useAppSelector(selectSectionsOrder);
  
  const experience = useAppSelector(selectExperience);
  const education = useAppSelector(selectEducation);
  const skills = useAppSelector(selectSkills);
  const certificates = useAppSelector(selectCertificates);
  const aboutMe = useAppSelector(selectAboutMe);

  const sectionsMap = {
    'exp-1': { 
      id: 'exp-1', 
      component: (
        <section className={s.section}>
          <h3>Опыт</h3>
          <div className={s.section__fields}>
            <div className={s.section__fields_item}><span>Должность:</span> {experience.position || 'Не указано'}</div>
            <div className={s.section__fields_item}><span>Компания:</span> {experience.company || 'Не указано'}</div>
            <div className={s.section__fields_item}><span>Период:</span> {experience.period || 'Не указано'}</div>
            <div className={s.section__fields_item}><span>Описание:</span> {experience.description || 'Не указано'}</div>
          </div>
        </section>
      )
    },
    'edu-1': { 
      id: 'edu-1', 
      component: (
        <section className={s.section}>
          <h3>Образование</h3>
          <div className={s.section__fields}>
            <div className={s.section__fields_item}><span>Учебное заведение:</span> {education.collage || 'Не указано'}</div>
            <div className={s.section__fields_item}><span>Специальность:</span> {education.major || 'Не указано'}</div>
            <div className={s.section__fields_item}><span>Период:</span> {education.period || 'Не указано'}</div>
          </div>
        </section>
      )
    },
    'skills-1': { 
      id: 'skills-1', 
      component: (
        <section className={s.section}>
          <h3>Навыки</h3>
          <div className={s.section__fields}>
            {skills.length > 0 ? (
              <ul>
                {skills.map((el, index) => <li key={index}>- {el}</li>)}
              </ul>
            ) : <p>Навыки не указаны</p>}
          </div>
        </section>
      )
    },
    'certs-1': { 
      id: 'certs-1', 
      component: (
        <section className={s.section}>
          <h3>Сертификаты</h3>
          <div className={s.section__fields}>
            {certificates.length > 0 ? (
              <ul>
                {certificates.map((el, index) => <li key={index}>- {el}</li>)}
              </ul>
            ) : <p>Сертификаты не указаны</p>}
          </div>
        </section>
      )
    },
    'about-1': { 
      id: 'about-1', 
      component: (
        <section className={s.section}>
          <h3>Обо мне</h3>
          <div className={s.section__fields}>
            {aboutMe ? <p>{aboutMe}</p> : <p>Нет информации</p>}
          </div>
        </section>
      )
    }
  };

  const orderedSections = sectionsOrder
    .map(sectionId => sectionsMap[sectionId])
    .filter(Boolean);

  return (
    <div className={s.preview}>
      <div className={s.paperSheet}>
        <h2>Резюме</h2>
        {orderedSections.map((section) => section.component)}
      </div>
    </div>
  );
};