import { configureStore } from '@reduxjs/toolkit'
import reviewsReducer from '../slices/reviewsSlice.ts'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/rootSaga.ts'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    reviews: reviewsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
