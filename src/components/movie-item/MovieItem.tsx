import React from 'react';
import { Button, ListItem, ListItemText, Stack } from '@mui/material';
import type { Movie } from '../../store/MovieStore';

interface MovieItemProps {
  movie: Movie;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const MovieItem: React.FC<MovieItemProps> = ({
  movie,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <ListItem divider>
      <ListItemText
        primary={movie.title}
        secondary={movie.overview}
        sx={{ padding: '5px' }}
      />
      <Stack flexDirection={'row'} gap={1}>
        <Button variant="outlined" size="small" onClick={onEditClick}>
          Редактировать
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          onClick={onDeleteClick}
        >
          Удалить
        </Button>
      </Stack>
    </ListItem>
  );
};

export default MovieItem;
