import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Dropdown } from "../dropdown/dropdown";
import s from './reductor.module.scss';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { moveSection, selectAboutMe, selectCertificates, selectEducation, selectExperience, selectSkills, selectSectionsOrder, removeSkill, removeCertificate } from "../../redux/sections-slice";
import { useRef } from 'react';

const Section = ({ section, index, children }: { section: any, index: number, children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLElement>(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: 'SECTION',
    item: { id: section.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'SECTION',
    hover: (item: { id: string; index: number }) => {
      if (!ref.current) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) return;

      // Don't replace items if they're the same
      if (section.id === item.id) return;

      dispatch(moveSection({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <section 
      ref={ref}
      className={s.section}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {children}
    </section>
  );
};

export const Reductor = () => {
  const dispatch = useAppDispatch();
  const sectionsOrder = useAppSelector(selectSectionsOrder);
  
  const experience = useAppSelector(selectExperience);
  const education = useAppSelector(selectEducation);
  const skills = useAppSelector(selectSkills);
  const certificates = useAppSelector(selectCertificates);
  const aboutMe = useAppSelector(selectAboutMe);

  const removeSkillHandler = (skillIndex: number) => dispatch(removeSkill({sectionId: "skills-1", skillIndex })) 
  const removeCertificateHandler = (certificateIndex: number) => dispatch(removeCertificate({sectionId: "certs-1", certificateIndex })) 

  const sectionsMap = {
    'exp-1': experience && { 
      id: 'exp-1', 
      component: (
        <>
          <h2>Опыт</h2>
          <div className={s.section__fields}>
            <div>Должность: {experience.position || '---'}</div>
            <div>Компания: {experience.company || '---'}</div>
            <div>Период: {experience.period || '---'}</div>
            <div>Описание: {experience.description || '---'}</div>
          </div>
        </>
      )
    },
    'edu-1': education && { 
      id: 'edu-1', 
      component: (
        <>
          <h2>Образование</h2>
          <div className={s.section__fields}>
            <div>Учебное заведение: {education.collage || '---'}</div>
            <div>Специальность: {education.major || '---'}</div>
            <div>Период: {education.period || '---'}</div>
          </div>
        </>
      )
    },
    'skills-1': { 
      id: 'skills-1', 
      component: (
        <>
          <h2>Навыки</h2>
          <div className={s.section__fields}>
            {skills.length > 0 ? (
              <ul>
                {skills.map((el, index) => <li key={index}>- {el} <button className={s.remove__btn} onClick={() => removeSkillHandler(index)}>X</button></li>)}
              </ul>
            ) : <p>Навыки не указаны</p>}
          </div>
        </>
      )
    },
    'certs-1': { 
      id: 'certs-1', 
      component: (
        <>
          <h2>Сертификаты</h2>
          <div className={s.section__fields}>
            {certificates.length > 0 ? (
              <ul>
                {certificates.map((el, index) => <li key={index}>- {el}  <button className={s.remove__btn} onClick={() => removeCertificateHandler(index)}>X</button></li>)}
              </ul>
            ) : <p>Сертификаты не указаны</p>}
          </div>
        </>
      )
    },
    'about-1': { 
      id: 'about-1', 
      component: (
        <>
          <h2>Обо мне</h2>
          <div className={s.section__fields}>
            {aboutMe ? <p>{aboutMe}</p> : <p>Нет информации</p>}
          </div>
        </>
      )
    }
  };

  const orderedSections = sectionsOrder
    .map(sectionId => sectionsMap[sectionId])
    .filter(Boolean);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={s.reductor}>
        <Dropdown>
          <button>Добавить секцию</button>
        </Dropdown>

        {orderedSections.map((section, index) => (
          <Section key={section.id} section={section} index={index}>
            {section.component}
          </Section>
        ))}
      </div>
    </DndProvider>
  );
};