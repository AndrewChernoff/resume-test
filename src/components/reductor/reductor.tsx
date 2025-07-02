import { useAppSelector } from "../../app/hooks";
import type { AboutMeItem, CertificatesItem, EducationItem, ExperienceItem, SkillsItem } from "../../redux/sections-slice";
import { Dropdown } from "../dropdown/dropdown";
import s from './reductor.module.scss'

export const Reductor = () => {
    const sections = useAppSelector(state => state.section.sections);
    
    // Helper functions to find specific sections
    const getSection = (type: string) => sections.find(section => section.type === type);
    
    const experience = getSection('experience') as ExperienceItem | undefined;
    const education = getSection('education') as EducationItem | undefined;
    const skills = getSection('skills') as SkillsItem | undefined;
    const certificates = getSection('certificates') as CertificatesItem | undefined;
    const aboutMe = getSection('aboutMe') as AboutMeItem | undefined;

    return (
        <div className={s.reductor}>
            <Dropdown>
                <button>Добавить секцию</button>
            </Dropdown>

            {experience && (
                <section className={s.section}>
                    <h2>Опыт</h2>
                    <div className={s.section__fields}>
                        <div>Должность: {experience.position || '---'}</div>
                        <div>Компания: {experience.company || '---'}</div>
                        <div>Период: {experience.period || '---'}</div>
                        <div>Описание: {experience.description || '---'}</div>
                    </div>
                </section>
            )}

            {education && (
                <section className={s.section}>
                    <h2>Образование</h2>
                    <div className={s.section__fields}>
                        <div>Учебное заведение: {education.collage || '---'}</div>
                        <div>Специальность: {education.major || '---'}</div>
                        <div>Период: {education.period || '---'}</div>
                    </div>
                </section>
            )}

            {skills && (
                <section className={s.section}>
                    <h2>Навыки</h2>
                    <div className={s.section__fields}>
                        {skills.items.length > 0 ? (
                            <ul>
                                {skills.items.map((el, index) => <li key={index}>- {el}</li>)}
                            </ul>
                        ) : <p>Навыки не указаны</p>}
                    </div>
                </section>
            )}

            {certificates && (
                <section className={s.section}>
                    <h2>Сертификаты</h2>
                    <div className={s.section__fields}>
                        {certificates.items.length > 0 ? (
                            <ul>
                                {certificates.items.map((el, index) => <li key={index}>- {el}</li>)}
                            </ul>
                        ) : <p>Сертификаты не указаны</p>}
                    </div>
                </section>
            )}

            {aboutMe && (
                <section className={s.section}>
                    <h2>Обо мне</h2>
                    <div className={s.section__fields}>
                        {aboutMe.content ? <p>{aboutMe.content}</p> : <p>Нет информации</p>}
                    </div>
                </section>
            )}
        </div>
    );
};