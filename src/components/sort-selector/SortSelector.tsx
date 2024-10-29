import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import movieStore from '../../store/MovieStore';

const SortSelector: React.FC = observer(() => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    movieStore.setSortBy(event.target.value as 'popularity' | 'release_date');
  };

  return (
    <FormControl size="small" variant="outlined" sx={{ mb: 1, width: '200px' }}>
      <InputLabel id="sort-label">Сортировать по</InputLabel>
      <Select
        labelId="sort-label"
        value={movieStore.sortBy ?? 'popularity'}
        onChange={handleChange}
        label="Сортировать по"
      >
        <MenuItem value="popularity">Популярность</MenuItem>
        <Divider />
        <MenuItem value="release_date">Дата выхода</MenuItem>
      </Select>
    </FormControl>
  );
});

export default SortSelector;
