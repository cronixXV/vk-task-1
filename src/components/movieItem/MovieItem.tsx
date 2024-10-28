import React from 'react';
import { Box, Button, ListItem, ListItemText } from '@mui/material';
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
      <Box display="flex" gap={1}>
        <Button variant="outlined" size="small" onClick={onEditClick}>
          Редактировать
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={onDeleteClick}
        >
          Удалить
        </Button>
      </Box>
    </ListItem>
  );
};

export default MovieItem;
