import { useAppSelector } from "../../app/hooks";
import { Dropdown } from "../dropdown/dropdown";
import s from './reductor.module.scss'

export const Reductor = () => {
    const sections = useAppSelector(state => state.section.sectionItems);

    console.log(sections)
    
    return <div className={s.reductor}>
        <Dropdown>
            <button>Добавить секцию</button>
        </Dropdown>
        <section className={s.section}>
            <h2>Образование</h2>
            <div className={s.section__fields}>
                <div>Должность: {sections['experience'].position || '---'}</div>
                <div>Компания: {sections['experience'].company || '---'}</div>
                <div>Период: {sections['experience'].period || '---'}</div>
                <div>Описание: {sections['experience'].description || '---'}</div>
            </div>
        </section>

    </div>;
};
