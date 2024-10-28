import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import MovieStore, { Movie } from '../store/MovieStore';
import { Box, CircularProgress, Typography, List, Stack } from '@mui/material';
import SortSelector from './sortSelector/SortSelector';
import MovieItem from './movieItem/MovieItem';
import MovieEditor from './movieEditor/MovieEditor';

const MovieList: React.FC = observer(() => {
  const [page, setPage] = useState(1);
  const [editingMovieId, setEditingMovieId] = useState<number | null>(null);

  useEffect(() => {
    MovieStore.loadPopularMovies(page);
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleEditClick = (movieId: number) => setEditingMovieId(movieId);

  const handleSaveClick = (updatedMovie: Partial<Movie>) => {
    if (editingMovieId !== null) {
      MovieStore.editMovie(editingMovieId, updatedMovie);
      setEditingMovieId(null);
    }
  };

  const handleDeleteClick = (movieId: number) =>
    MovieStore.deleteMovie(movieId);

  if (MovieStore.loading && page === 1) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (MovieStore.error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <Typography color="error">{MovieStore.error}</Typography>
      </Box>
    );
  }

  return (
    <Stack p={3}>
      <Typography variant="h4" align="center">
        Популярные фильмы
      </Typography>
      <Stack alignItems="flex-end">
        <SortSelector
          sortBy={'popularity'}
          onSortChange={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </Stack>

      <List>
        {MovieStore.movies.map((movie) =>
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
        {MovieStore.loading && <CircularProgress />}
      </Box>
    </Stack>
  );
});

export default MovieList;
