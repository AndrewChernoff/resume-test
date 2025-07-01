import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type ParamType = 'none' | 'experience' | 'education' | 'skills' | 'certificates' | 'aboutMe'

export type ExperienceItem = {
  position: string | null;
  company: string | null;
  period: string | null;
  description: string | null;
};

export type EducationItem = {
  collage: string | null;
  major: string | null;
  period: string | null;
};

export type SectionsState = {
  param: string;
  sectionItems: {
    experience: ExperienceItem;
    education: EducationItem;
    skills: string[];
    certificates: string[];
    aboutMe: string | null;
  };
};

const initialState: SectionsState = {
  param: 'none',
  sectionItems: {
    experience: {
      position: null,
      company: null,
      period: null,
      description: null
    },
    education: {
      collage: null,
      major: null,
      period: null
    },
    skills: [],
    certificates: [],
    aboutMe: null
  }
}

export const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    setParam: (state, action: PayloadAction<string>) => {
      state.param = action.payload 
    },
    updateExperience: (state, action: PayloadAction<ExperienceItem>) => {
      state.sectionItems.experience = action.payload;
    },
    updateEducation: (state, action: PayloadAction<EducationItem>) => {
      state.sectionItems.education = action.payload;
    },
    updateSkills: (state, action: PayloadAction<string>) => {
      state.sectionItems.skills.push(action.payload);
    },
    updateCertificates: (state, action: PayloadAction<string>) => {
      state.sectionItems.certificates.push(action.payload);
    },
    updateAboutMe: (state, action: PayloadAction<string>) => {
      state.sectionItems.aboutMe = action.payload;
    },
  },
})

export const { setParam, updateExperience, updateEducation, updateSkills, updateCertificates, updateAboutMe } = sectionsSlice.actions

export default sectionsSlice.reducer