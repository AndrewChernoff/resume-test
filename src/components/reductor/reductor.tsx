import { useAppSelector } from "../../app/hooks";
import { Dropdown } from "../dropdown/dropdown";
import s from './reductor.module.scss'

export const Reductor = () => {
   /*  const sections = useAppSelector(state => state.section.sectionItems);
    const {skills, certificates, aboutMe} = useAppSelector(state => state.section.sectionItems); */


    return <div className={s.reductor}>
        <Dropdown>
            <button>Добавить секцию</button>
        </Dropdown>
        {/* <section className={s.section}>
            <h2>Опыт</h2>
            <div className={s.section__fields}>
                <div>Должность: {sections['experience'].position || '---'}</div>
                <div>Компания: {sections['experience'].company || '---'}</div>
                <div>Период: {sections['experience'].period || '---'}</div>
                <div>Описание: {sections['experience'].description || '---'}</div>
            </div>
        </section>

        <section className={s.section}>
            <h2>Образование</h2>
            <div className={s.section__fields}>
                <div>Учебное заведение: {sections['education'].collage || '---'}</div>
                <div>Специальность: {sections['education'].major || '---'}</div>
                <div>Период: {sections['education'].period || '---'}</div>
            </div>
        </section>

        <section className={s.section}>
            <h2>Навыки</h2>
            <div className={s.section__fields}>
                {skills.length > 0 ? <ul>
                    {skills.map(el => <li>- {el}</li>)}
                </ul>
                : <p>Навыки не указаны</p>    
            }
            </div>
        </section>

        <section className={s.section}>
            <h2>Сертификаты</h2>
            <div className={s.section__fields}>
                {certificates.length > 0 ? <ul>
                    {certificates.map(el => <li>- {el}</li>)}
                </ul>
                : <p>Сертификаты не указаны</p>    
            }
            </div>
        </section>
        
        <section className={s.section}>
            <h2>Обо мне</h2>
            <div className={s.section__fields}>
                {aboutMe ? <p>{aboutMe}</p>
                : <p>Нет информации</p>    
            }
            </div>
        </section> */}
    </div>;
};
