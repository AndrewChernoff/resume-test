import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type ParamType = 'none' | 'experience' | 'education' | 'skills' | 'certificates' | 'aboutMe'

type ExperienceItem = {
  position: string | null;
  company: string | null;
  period: string | null;
  description: string | null;
};

type EducationItem = {
  collage: string | null;
  major: string | null;
  period: string | null;
};

type SectionsState = {
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
    updateCategory: (state, action: PayloadAction<{section: string, data: any}>) => {
      state.sectionItems[action.payload.section] = action.payload.data;
    },
    updateArrayCategory: (state, action: PayloadAction<{section: string, prop: string}>) => {
      state.sectionItems[action.payload.section].push(action.payload.prop);
    },
    updateSingleValueCategory: (state, action: PayloadAction<{section: string, value: string}>) => {
      state.sectionItems[action.payload.section] = action.payload.value;
    },
  },
})

export const { setParam, updateCategory, updateArrayCategory, updateSingleValueCategory } = sectionsSlice.actions

export default sectionsSlice.reducer