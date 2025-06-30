import { Reductor } from './components/reductor/reductor'
import { Preview } from './components/preview/preview';
import { Modals } from './components/modals/modals';
import "@radix-ui/themes/styles.css";
import s from './App.module.scss'
import { ExperienceModal } from './components/modals/experience-modal/experience-modal';

function App() {
  /* const [experience, setExperience] = useState(null);
  const [education, setEducation] = useState(null);
  const [skills, setSkills] = useState(null);
  const [certificates, setCertificates] = useState(null);
  const [aboutMe, setAboutMe] = useState(null); */
/* 
  const [info, setInfo] = useState({
    experience: null,
    skills: null,
    certificates: null,
    aboutMe: null
  }) */

  return (
    <>
    <div className={s.app}>
      <Reductor />
      <Preview />
    </div>
    <ExperienceModal />
    </>
  )
}

export default App
