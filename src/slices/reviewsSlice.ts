import { createAction, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type ReviewType = {
  id: number
  platform: string
  rating: number
  date: string
  text: string
}

export interface ReviewsState {
  reviews: ReviewType[]
  loading: boolean
  error: string
  sortBy: string
  sortOrder: 'asc' | 'desc'
  filterByRating: number[]
  filterByPlatform: string | null
  search: string
}

const initialState: ReviewsState = {
  reviews: [],
  loading: true,
  error: '',
  sortBy: '',
  sortOrder: 'asc',
  filterByRating: [0, 5],
  filterByPlatform: null,
  search: '',
}

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<ReviewType[]>) => {
      state.reviews = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload
    },
    setSortOrder: (state, action: PayloadAction<string>) => {
      state.sortOrder = action.payload
    },
    setFilterByRating: (state, action: PayloadAction<number[]>) => {
      state.filterByRating = action.payload
    },
    setFilterByPlatform: (state, action: PayloadAction<string | null>) => {
      state.filterByPlatform = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
})

export const fetchReviews = createAction('fetchReviews');

export const {
  setReviews,
  setLoading,
  setSortBy,
  setSortOrder,
  setError,
  setFilterByRating,
  setFilterByPlatform,
  setSearch,
} = reviewsSlice.actions

export default reviewsSlice.reducer
