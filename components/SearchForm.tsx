'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Category, Ingredient } from '@/types/types';
import { Autocomplete } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { fetchCategories, fetchIngredients } from '@redux/meals';

export const SearchForm = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useAppDispatch();

  const categories: Category[] = useAppSelector(
    (state) => state.meals.categories
  );
  const ingredients: Ingredient[] = useAppSelector(
    (state) => state.meals.ingredients
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);

  //Wrapping fetch in use is currently not recommended in Client Components
  //and may trigger multiple re-renders. For now, if you need to fetch data in
  //a Client Component, we recommend using a third-party library such as SWR or React Query :(

  return (
    <form>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', p: 2 }}
        elevation={5}
      >
        <FormControlLabel control={<Checkbox />} label='Title' sx={{ mb: 1 }} />

        <TextField label='Title' sx={{ mb: 3 }} />

        <FormControlLabel
          control={<Checkbox />}
          label='Category'
          sx={{ mb: 1 }}
        />

        <FormControl sx={{ mb: 3 }}>
          <InputLabel>Category</InputLabel>

          <Select
            label='Category'
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => {
              const { idCategory, strCategory, strCategoryDescription } =
                category;
              return (
                <MenuItem
                  value={strCategory}
                  key={idCategory}
                  title={strCategoryDescription}
                >
                  {strCategory}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControlLabel
          control={<Checkbox />}
          label='Ingredient'
          sx={{ mb: 1 }}
        />

        <FormControl sx={{ mb: 3 }}>
          <Autocomplete
            id='ingredients-autocomplete'
            options={ingredients}
            getOptionLabel={(option) => option.strIngredient}
            renderInput={(params) => (
              <TextField {...params} label='Ingredients' />
            )}
          />
        </FormControl>

        <Box display={'flex'}>
          <Button variant='outlined' type='reset' sx={{ flexGrow: 1, mr: 1 }}>
            Clear
          </Button>
          <Button type='submit' variant='contained' sx={{ flexGrow: 1 }}>
            Submit
          </Button>
        </Box>
      </Paper>
    </form>
  );
};
