import { configureStore } from '@reduxjs/toolkit'
import godsReducer from './utils/godsSlice';

export default configureStore({
  reducer: {
       gods: godsReducer,
  },
})