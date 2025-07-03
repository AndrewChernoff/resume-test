import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store';
import type { AboutMeItem, CertificatesItem, EducationItem, ExperienceItem, NullableType, SectionItem, SectionsState, SkillsItem } from './types';


const initialSections: SectionItem[] = [
  {
    id: 'exp-1',
    type: 'experience',
    position: null,
    company: null,
    period: null,
    description: null
  },
  {
    id: 'edu-1',
    type: 'education',
    collage: null,
    major: null,
    period: null
  },
  {
    id: 'skills-1',
    type: 'skills',
    items: []
  },
  {
    id: 'certs-1',
    type: 'certificates',
    items: []
  },
  {
    id: 'about-1',
    type: 'aboutMe',
    content: null
  }
];

const initialState: SectionsState = {
  sections: initialSections,
  param: 'none'
};

export const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    setParam: (state, action: PayloadAction<string>) => {
      state.param = action.payload;
    },
    reorderSections: (state, action: PayloadAction<{fromIndex: number, toIndex: number}>) => {
      const { fromIndex, toIndex } = action.payload;
      const [removed] = state.sections.splice(fromIndex, 1);
      state.sections.splice(toIndex, 0, removed);
    },
    updateExperience: (state, action: PayloadAction<any>) => {
      const index = state.sections.findIndex(s => s.id === action.payload.id);
      if (index >= 0) {
        state.sections[index] = {
          id: action.payload.id,
          type: state.sections[index].type,
          ...action.payload.data
        };
      }
    },
    updateEducation: (state, action: PayloadAction<any>) => {
      
      const index = state.sections.findIndex(s => s.id === action.payload.id);
      if (index >= 0) {
        state.sections[index] = {
          id: action.payload.id,
          type: state.sections[index].type,
          ...action.payload.data
        };
      }
    },
    addSkill: (state, action: PayloadAction<{sectionId: string, skill: string}>) => {
      const section = state.sections.find(s => s.id === action.payload.sectionId && s.type === 'skills');
      if (section && section.type === 'skills') {
        section.items.push(action.payload.skill);
      }
    },
    removeSkill: (state, action: PayloadAction<{sectionId: string, skillIndex: number}>) => {
      const section = state.sections.find(s => s.id === action.payload.sectionId && s.type === 'skills');
      if (section && section.type === 'skills') {
        section.items.splice(action.payload.skillIndex, 1);
      }
    },
    addCertificate: (state, action: PayloadAction<{sectionId: string, certificate: string}>) => {
      const section = state.sections.find(s => s.id === action.payload.sectionId && s.type === 'certificates');
      if (section && section.type === 'certificates') {
        section.items.push(action.payload.certificate);
      }
    },
     removeCertificate: (state, action: PayloadAction<{sectionId: string, certificateIndex: number}>) => {
      const section = state.sections.find(s => s.id === action.payload.sectionId && s.type === 'certificates');
      if (section && section.type === 'certificates') {
        section.items.splice(action.payload.certificateIndex, 1);
      }
    },
    updateAboutMe: (state, action: PayloadAction<{sectionId: string, content: string}>) => {
      const section = state.sections.find(s => s.id === action.payload.sectionId && s.type === 'aboutMe');
      if (section && section.type === 'aboutMe') {
        section.content = action.payload.content;
      }
    },
    removeSection: (state, action: PayloadAction<string>) => {
      state.sections = state.sections.filter(s => s.id !== action.payload);
    },
    moveSection: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
      const { dragIndex, hoverIndex } = action.payload;
      
      if (
        dragIndex < 0 || 
        dragIndex >= state.sections.length ||
        hoverIndex < 0 || 
        hoverIndex >= state.sections.length
      ) {
        return;
      }

      const newSections = [...state.sections];
      const [draggedItem] = newSections.splice(dragIndex, 1);
      newSections.splice(hoverIndex, 0, draggedItem);

      state.sections = newSections;
    },
  },
});

export const { 
  setParam,
  reorderSections,
  updateExperience,
  updateEducation,
  addSkill,
  removeSkill,
  addCertificate,
  removeCertificate,
  updateAboutMe,
  removeSection,
  moveSection
} = sectionsSlice.actions;

export const selectSkills = (state: RootState): string[] => {
  const skillsSection = state.section.sections.find(
    (section) => section.type === 'skills'
  ) as SkillsItem | undefined;
  
  return skillsSection?.items || [];
};

export const selectCertificates = (state: RootState): string[] => {
  const certificatesSection = state.section.sections.find(
    (section) => section.type === 'certificates'
  ) as CertificatesItem | undefined;
  
  return certificatesSection?.items || [];
};

export const selectEducation = (state: RootState): {collage: NullableType<string>, major: NullableType<string>, period: NullableType<string> } => {
  const educationSection = state.section.sections.find(
    (section) => section.type === 'education'
  ) as EducationItem | undefined;
  
  return {collage: educationSection?.collage, major: educationSection?.major, period: educationSection?.period };
};

export const selectExperience = (state: RootState): {position: NullableType<string>; company: NullableType<string>, period: NullableType<string>, description: NullableType<string>} => {
  const experienceSection = state.section.sections.find(
    (section) => section.type === 'experience'
  ) as ExperienceItem | undefined;
  
  return {position: experienceSection?.position, company: experienceSection?.company, period: experienceSection?.period, description: experienceSection?.description };
};

export const selectAboutMe = (state: RootState): NullableType<string> => {
  const aboutMeSection = state.section.sections.find(
    (section) => section.type === 'aboutMe'
  ) as AboutMeItem | undefined;
  
  return aboutMeSection?.content
};

export const selectSectionsOrder = (state: RootState): string[] => {
  return state.section.sections.map(section => section.id);
};

export default sectionsSlice.reducer;