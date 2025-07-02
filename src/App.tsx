import "@radix-ui/themes/styles.css";
import s from './App.module.scss'
import { ExperienceModal } from './components/modals/experience-modal/experience-modal';
import { EducationModal } from './components/modals/education-modal/education-modal';
import { SkillsModal } from './components/modals/skills-modal/skills-modal';
import { CertificatesModal } from './components/modals/certificates-modal/certificates-modal';
import { AboutMeModal } from './components/modals/about-me-modal/about-me-modal';
import { Reductor } from "./components/reductor/reductor";

function App() {
  return (
    <>
    <div className={s.app}>
      <Reductor />
      {/* <Preview /> */}
    </div>
      <ExperienceModal />
      <EducationModal />
      <SkillsModal />
      <CertificatesModal />
      <AboutMeModal />
    </>
  )
}

export default App
