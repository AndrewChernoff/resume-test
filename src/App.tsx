import { Reductor } from './components/reductor/reductor'
import { Preview } from './components/preview/preview';
import "@radix-ui/themes/styles.css";
import s from './App.module.scss'
import { ExperienceModal } from './components/modals/experience-modal/experience-modal';
import { EducationModal } from './components/modals/education-modal/education-modal';
import { SkillsModal } from './components/modals/skills-modal/skills-modal';

function App() {
  return (
    <>
    <div className={s.app}>
      <Reductor />
      <Preview />
    </div>
    <ExperienceModal />
    <EducationModal />
    <SkillsModal />
    </>
  )
}

export default App
