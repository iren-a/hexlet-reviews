import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { memo, useCallback, useEffect, useMemo } from 'react';
import {
  fetchReviews,
  setFilterByPlatform,
  setFilterByRating, setSearch,
  setSortBy,
  setSortOrder
} from '../slices/reviewsSlice.ts';
import {
  Autocomplete,
  Box, InputAdornment,
  Rating,
  Skeleton,
  Slider,
  Stack,
  TableSortLabel,
  TextField,
  Typography
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/hooks.ts';
import {
  filterByPlatformSelector,
  filterByRatingSelector,
  loadingSelector,
  reviewsFilteredSelector, searchSelector,
  sortBySelector,
  sortOrderSelector
} from '../selectors/reviewsSelectors.ts';

const platformOptions = ['Google', 'Яндекс', '2ГИС']

const ReviewsTable = memo(() => {
  const dispatch = useAppDispatch()
  const rows = useAppSelector(reviewsFilteredSelector)
  const loading = useAppSelector(loadingSelector)
  const sortBy = useAppSelector(sortBySelector)
  const sortOrder = useAppSelector(sortOrderSelector)
  const filterByRating = useAppSelector(filterByRatingSelector)
  const filterByPlatform = useAppSelector(filterByPlatformSelector)
  const search = useAppSelector(searchSelector)

  const onSort = useCallback((field) => () => {
    dispatch(setSortBy(field));
    dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
  }, [dispatch, sortOrder]);

  const onFilterByRating = useCallback((event: Event, newValue: number | number[]) => {
    dispatch(setFilterByRating(newValue as number[]));
  }, [dispatch])

  const onFilterByPlatform = useCallback((event: any, newValue: string | null) => {
    dispatch(setFilterByPlatform(newValue));
  }, [dispatch])

  const onSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(event.target.value));
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchReviews());
    console.log('fetch')
  }, [dispatch]);

  const rowsSkeleton = useMemo(() => (
    Array.from({ length: 10 }).map((_, i) => (
      <TableRow
        key={i}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell><Skeleton /></TableCell>
        <TableCell><Skeleton /></TableCell>
        <TableCell><Skeleton /></TableCell>
        <TableCell><Skeleton /></TableCell>
      </TableRow>
    ))
  ), []);

  return (
    <Stack spacing={4}>
      <Stack direction="row" alignItems="center" width="100%">
        <Autocomplete
          disablePortal
          options={platformOptions}
          value={filterByPlatform}
          onChange={onFilterByPlatform}
          sx={{ width: 150 }}
          renderInput={(params) => <TextField {...params} size="small" label="Платформа" />}
        />
        <Stack alignItems="flex-start" ml={4}>
          <Typography variant="body2">Рейтинг</Typography>
          <Box sx={{ width: 100 }}>
            <Slider
              value={filterByRating}
              min={0}
              max={5}
              step={1}
              marks
              onChange={onFilterByRating}
              valueLabelDisplay="auto"
              size="small"
            />
          </Box>
        </Stack>
        <Box ml="auto">
          <TextField
            id="searсh"
            label="Поиск..."
            variant="outlined"
            size="small"
            value={search}
            onChange={onSearch}
          />
        </Box>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="reviews table">
          <TableHead>
            <TableRow>
              <TableCell>
                Платформа
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'rating'}
                  direction={sortOrder}
                  onClick={onSort('rating')}
                >
                  Рейтинг
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'date'}
                  direction={sortOrder}
                  onClick={onSort('date')}
                >
                  Время добавления
                </TableSortLabel>
              </TableCell>
              <TableCell>Текст отзыва</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              loading
                ? rowsSkeleton
                : rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.platform}</TableCell>
                    <TableCell><Rating name="rating" value={row.rating} size="small" readOnly /></TableCell>
                    <TableCell>{row.date.toLocaleString()}</TableCell>
                    <TableCell>{row.text}</TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
})

export default ReviewsTable
