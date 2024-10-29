import React, { useState } from 'react';
import { Stack, Box, Button, TextField } from '@mui/material';
import type { Movie } from '../../store/MovieStore';

interface MovieEditorProps {
  movie: Movie;
  onSave: (updatedMovie: Partial<Movie>) => void;
  onCancel: () => void;
}

const MovieEditor: React.FC<MovieEditorProps> = ({
  movie,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(movie.title);
  const [overview, setOverview] = useState(movie.overview);

  const handleSaveClick = () => {
    onSave({ title, overview });
  };

  return (
    <Stack flexDirection="column" gap={1} width="100%">
      <TextField
        label="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        label="Описание"
        value={overview}
        onChange={(e) => setOverview(e.target.value)}
        fullWidth
        multiline
      />
      <Box display="flex" gap={2} justifyContent="flex-end">
        <Button variant="contained" size="small" onClick={handleSaveClick}>
          Сохранить
        </Button>
        <Button variant="outlined" size="small" onClick={onCancel}>
          Отмена
        </Button>
      </Box>
    </Stack>
  );
};

export default MovieEditor;
