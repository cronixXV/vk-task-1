import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import movieStore, { type Movie } from '../store/MovieStore';
import { Box, CircularProgress, Typography, List, Stack } from '@mui/material';
import SortSelector from './sort-selector/SortSelector';
import MovieItem from './movie-item/MovieItem';
import MovieEditor from './movie-editor/MovieEditor';
import { throttle } from '../libs/throttle';

const MovieList: React.FC = observer(() => {
  const [page, setPage] = useState(1);
  const [editingMovieId, setEditingMovieId] = useState<number | null>(null);
  const [scroll, setScroll] = useState(window.scrollY); // Иначе будет перескок с нуля на актуальное значение

  useEffect(() => {
    movieStore.loadPopularMovies(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScroll(window.scrollY);
    }, 30); // Задержка между срабатыванием события Scroll

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 &&
      !movieStore.loading // Проверяем, что загрузка не идет
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [scroll]);

  const handleEditClick = (movieId: number) => setEditingMovieId(movieId);

  const handleSaveClick = (updatedMovie: Partial<Movie>) => {
    if (editingMovieId !== null) {
      movieStore.editMovie(editingMovieId, updatedMovie);
      setEditingMovieId(null);
    }
  };

  const handleDeleteClick = (movieId: number) =>
    movieStore.deleteMovie(movieId);

  if (movieStore.loading && page === 1) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (movieStore.error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <Typography color="error">{movieStore.error}</Typography>
      </Box>
    );
  }

  return (
    <Stack p={3}>
      <Typography variant="h4" align="center">
        Популярные фильмы
      </Typography>
      <Stack alignItems="flex-end">
        <SortSelector />
      </Stack>

      <List>
        {movieStore.movies.map((movie) =>
          editingMovieId === movie.id ? (
            <MovieEditor
              key={movie.id}
              movie={movie}
              onSave={handleSaveClick}
              onCancel={() => setEditingMovieId(null)}
            />
          ) : (
            <MovieItem
              key={movie.id}
              movie={movie}
              onEditClick={() => handleEditClick(movie.id)}
              onDeleteClick={() => handleDeleteClick(movie.id)}
            />
          )
        )}
      </List>

      <Box display="flex" justifyContent="center" pt={2}>
        {movieStore.loading && <CircularProgress />}
      </Box>
    </Stack>
  );
});

export default MovieList;
