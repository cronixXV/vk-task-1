import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import MovieStore from '../store/MovieStore';
import type { Movie } from '../store/MovieStore';
import {
  Box,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Stack,
} from '@mui/material';

const MovieList: React.FC = observer(() => {
  const [page, setPage] = useState(1);
  const [editingMovieId, setEditingMovieId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedOverview, setEditedOverview] = useState<string>('');

  useEffect(() => {
    MovieStore.loadPopularMovies(page);
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleEditClick = (movie: Movie) => {
    setEditingMovieId(movie.id);
    setEditedTitle(movie.title);
    setEditedOverview(movie.overview);
  };

  const handleSaveClick = () => {
    if (editingMovieId !== null) {
      MovieStore.editMovie(editingMovieId, {
        title: editedTitle,
        overview: editedOverview,
      });
      setEditingMovieId(null);
    }
  };

  const handleDeleteClick = (id: number) => {
    MovieStore.deleteMovie(id);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <List>
        {MovieStore.movies.map((movie) => (
          <ListItem key={movie.id} divider>
            {editingMovieId === movie.id ? (
              <Box display="flex" flexDirection="column" gap={2} width="100%">
                <TextField
                  label="Название"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Описание"
                  value={editedOverview}
                  onChange={(e) => setEditedOverview(e.target.value)}
                  fullWidth
                  multiline
                />
                <Box display="flex" gap={1} justifyContent="flex-end">
                  <Button variant="contained" onClick={handleSaveClick}>
                    Сохранить
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setEditingMovieId(null)}
                  >
                    Отмена
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <ListItemText
                  primary={movie.title}
                  secondary={movie.overview}
                />
                <Box display="flex" gap={1}>
                  <Button
                    variant="outlined"
                    onClick={() => handleEditClick(movie)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteClick(movie.id)}
                  >
                    Удалить
                  </Button>
                </Box>
              </>
            )}
          </ListItem>
        ))}
      </List>
      {MovieStore.loading && <CircularProgress />}
    </Stack>
  );
});

export default MovieList;
