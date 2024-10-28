import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface SortSelectorProps {
  sortBy: 'popularity' | 'release_date';
  onSortChange: (sortBy: 'popularity' | 'release_date') => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({
  sortBy,
  onSortChange,
}) => {
  const handleChange = (
    event: SelectChangeEvent<'popularity' | 'release_date'>
  ) => {
    onSortChange(event.target.value as 'popularity' | 'release_date');
  };

  return (
    <FormControl size="small" variant="outlined" sx={{ mb: 1, width: '200px' }}>
      <InputLabel id="sort-label">Сортировать по</InputLabel>
      <Select
        labelId="sort-label"
        value={sortBy}
        onChange={handleChange}
        label="Сортировать по"
      >
        <MenuItem value="popularity">Популярность</MenuItem>
        <MenuItem value="release_date">Дата выхода</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelector;
