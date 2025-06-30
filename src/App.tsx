import { Reductor } from './components/reductor/reductor'
import { Preview } from './components/preview/preview';
import "@radix-ui/themes/styles.css";
import s from './App.module.scss'
import { ExperienceModal } from './components/modals/experience-modal/experience-modal';

function App() {
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
