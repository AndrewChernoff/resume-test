import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store';

export type ExperienceItem = {
  id: string;
  type: 'experience';
  position: string | null;
  company: string | null;
  period: string | null;
  description: string | null;
};

export type EducationItem = {
  id: string;
  type: 'education';
  collage: string | null;
  major: string | null;
  period: string | null;
};

export type SkillsItem = {
  id: string;
  type: 'skills';
  items: string[];
};

export type CertificatesItem = {
  id: string;
  type: 'certificates';
  items: string[];
};

export type AboutMeItem = {
  id: string;
  type: 'aboutMe';
  content: string | null;
};

export type SectionItem = 
  | ExperienceItem 
  | EducationItem 
  | SkillsItem 
  | CertificatesItem 
  | AboutMeItem;

export type SectionsState = {
  sections: SectionItem[];
  param: string;
};

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
    updateAboutMe: (state, action: PayloadAction<{sectionId: string, content: string}>) => {
      const section = state.sections.find(s => s.id === action.payload.sectionId && s.type === 'aboutMe');
      if (section && section.type === 'aboutMe') {
        section.content = action.payload.content;
      }
    },
    addSection: (state, action: PayloadAction<{type: SectionItem['type'], position?: number}>) => {
      const newSection = createNewSection(action.payload.type);
      const position = action.payload.position ?? state.sections.length;
      state.sections.splice(position, 0, newSection);
    },
    removeSection: (state, action: PayloadAction<string>) => {
      state.sections = state.sections.filter(s => s.id !== action.payload);
    },
    moveSection: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
      const { dragIndex, hoverIndex } = action.payload;
      
      // Make sure indices are valid
      if (
        dragIndex < 0 || 
        dragIndex >= state.sections.length ||
        hoverIndex < 0 || 
        hoverIndex >= state.sections.length
      ) {
        return;
      }

      // Create a new array to avoid mutating the state directly
      const newSections = [...state.sections];
      // Remove the dragged item
      const [draggedItem] = newSections.splice(dragIndex, 1);
      // Insert it at the new position
      newSections.splice(hoverIndex, 0, draggedItem);

      // Update the state
      state.sections = newSections;
    },
  },
});

function createNewSection(type: SectionItem['type']): SectionItem {
  const baseId = Date.now().toString();
  switch (type) {
    case 'experience':
      return {
        id: `exp-${baseId}`,
        type: 'experience',
        position: null,
        company: null,
        period: null,
        description: null
      };
    case 'education':
      return {
        id: `edu-${baseId}`,
        type: 'education',
        collage: null,
        major: null,
        period: null
      };
    case 'skills':
      return {
        id: `skills-${baseId}`,
        type: 'skills',
        items: []
      };
    case 'certificates':
      return {
        id: `certs-${baseId}`,
        type: 'certificates',
        items: []
      };
    case 'aboutMe':
      return {
        id: `about-${baseId}`,
        type: 'aboutMe',
        content: null
      };
    default:
      throw new Error(`Unknown section type: ${type}`);
  }
}

export const { 
  setParam,
  reorderSections,
  updateExperience,
  updateEducation,
  addSkill,
  removeSkill,
  addCertificate,
  updateAboutMe,
  addSection,
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

export const selectEducation = (state: RootState): {collage: any, major: any, period: any } => {
  const educationSection = state.section.sections.find(
    (section) => section.type === 'education'
  ) as EducationItem | undefined;
  
  return {collage: educationSection?.collage, major: educationSection?.major, period: educationSection?.period };
};

export const selectExperience = (state: RootState): any => {
  const experienceSection = state.section.sections.find(
    (section) => section.type === 'experience'
  ) as ExperienceItem | undefined;
  
  return {position: experienceSection?.position, company: experienceSection?.company, period: experienceSection?.period, description: experienceSection?.description };
};

export const selectAboutMe = (state: RootState): any => {
  const aboutMeSection = state.section.sections.find(
    (section) => section.type === 'aboutMe'
  ) as AboutMeItem | undefined;
  
  return aboutMeSection?.content
};

export const selectSectionsOrder = (state: RootState): string[] => {
  return state.section.sections.map(section => section.id);
};

export default sectionsSlice.reducer;