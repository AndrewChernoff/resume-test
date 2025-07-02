import { useAppSelector } from '../../app/hooks';
import s from './preview.module.scss'

export const Preview = () => {
  const sections = useAppSelector(state => state.section.sectionItems);
  const {skills, certificates, aboutMe} = useAppSelector(state => state.section.sectionItems);
  
  return <div className={s.preview}>
            <div className={s.paperSheet}>
            <h2>Резюме</h2>

            <section className={s.section}>
            <h3>Опыт</h3>
            <div className={s.section__fields}>
                <div className={s.section__fields_item}><span>Должность:</span> {sections['experience'].position || 'Не указано'}</div>
                <div className={s.section__fields_item}><span>Компания:</span> {sections['experience'].company || 'Не указано'}</div>
                <div className={s.section__fields_item}><span>Период:</span> {sections['experience'].period || 'Не указано'}</div>
                <div className={s.section__fields_item}><span>Описание:</span> {sections['experience'].description || 'Не указано'}</div>
            </div>
        </section>

        <section className={s.section}>
            <h3>Образование</h3>
            <div className={s.section__fields}>
                <div>Учебное заведение: {sections['education'].collage || 'Не указано'}</div>
                <div>Специальность: {sections['education'].major || 'Не указано'}</div>
                <div>Период: {sections['education'].period || 'Не указано'}</div>
            </div>
        </section>

        <section className={s.section}>
            <h3>Навыки</h3>
            <div className={s.section__fields}>
                {skills.length > 0 ? <ul>
                    {skills.map(el => <li>- {el}</li>)}
                </ul>
                : <p>Навыки не указаны</p>    
            }
            </div>
        </section>

        <section className={s.section}>
            <h3>Сертификаты</h3>
            <div className={s.section__fields}>
                {certificates.length > 0 ? <ul>
                    {certificates.map(el => <li>- {el}</li>)}
                </ul>
                : <p>Сертификаты не указаны</p>    
            }
            </div>
        </section>
        
        <section className={s.section}>
            <h3>Обо мне</h3>
            <div className={s.section__fields}>
                {aboutMe ? <p>{aboutMe}</p>
                : <p>Нет информации</p>    
            }
            </div>
        </section>
            </div>
        </div>;
};
