import { useAppSelector } from "../../app/hooks";
import { Dropdown } from "../dropdown/dropdown";
import s from './reductor.module.scss'

export const Reductor = () => {
    const sections = useAppSelector(state => state.section.sectionItems);
    const skills = useAppSelector(state => state.section.sectionItems).skills;

    return <div className={s.reductor}>
        <Dropdown>
            <button>Добавить секцию</button>
        </Dropdown>
        <section className={s.section}>
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
                <ul>
                    {skills.map(el => <li>- {el}</li>)}
                </ul>
            </div>
        </section>
    </div>;
};
