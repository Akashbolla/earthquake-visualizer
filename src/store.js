import { configureStore } from '@reduxjs/toolkit'
import earthquakesReducer from './features/earthquakesSlice'

const store = configureStore({
  reducer: {
    earthquakes: earthquakesReducer
  }
})

export default store

