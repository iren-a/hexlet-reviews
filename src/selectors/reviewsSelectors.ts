import { RootState } from '../store/store.ts';
import { createSelector } from '@reduxjs/toolkit';

export const loadingSelector = (state: RootState) => state.reviews.loading
export const sortBySelector = (state: RootState) => state.reviews.sortBy
export const sortOrderSelector = (state: RootState) => state.reviews.sortOrder
export const filterByRatingSelector = (state: RootState) => state.reviews.filterByRating
export const filterByPlatformSelector = (state: RootState) => state.reviews.filterByPlatform
export const searchSelector = (state: RootState) => state.reviews.search

const reviewsSelector = createSelector(
  (state: RootState) => state.reviews.reviews,
  (reviews) => (
    reviews.map((review) => ({
      ...review,
      date: new Date(review.date),
    }))
  )
)

export const reviewsFilteredSelector = createSelector(
  [
    reviewsSelector,
    sortBySelector,
    sortOrderSelector,
    filterByRatingSelector,
    filterByPlatformSelector,
    searchSelector,
  ],
  (reviews, sortBy, sortOrder, filterByRating, filterByPlatform, search) => {
    let results = [...reviews];

    if (sortBy) {
      results.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortBy] < b[sortBy] ? -1 : 1;
        }
        return a[sortBy] > b[sortBy] ? -1 : 1;
      })
    }

    if (filterByRating) {
      results = results.filter((review) => review.rating >= filterByRating[0] && review.rating <= filterByRating[1])
    }

    if (filterByPlatform) {
      results = results.filter((review) => review.platform === filterByPlatform)
    }

    if (search) {
      results = results.filter((review) => review.text.toUpperCase().includes(search.toUpperCase()))
    }

    return results;
  }
)
