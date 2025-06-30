import { configureStore } from '@reduxjs/toolkit'
import sectionsSlice from './sections-slice'

export const store = configureStore({
  reducer: {
    section: sectionsSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch