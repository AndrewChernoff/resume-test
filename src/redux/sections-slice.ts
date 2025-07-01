import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type ParamType = 'none' | 'experience' | 'education' | 'skills' | 'certificates' | 'aboutMe'

type SectionsState = {
  param: string;
  sectionItems: any
}

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
    skills: []
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
    updateSkillsCategory: (state, action: PayloadAction<string>) => {
      state.sectionItems.skills.push(action.payload);
    },
  },
})

export const { setParam, updateCategory, updateSkillsCategory } = sectionsSlice.actions

export default sectionsSlice.reducer