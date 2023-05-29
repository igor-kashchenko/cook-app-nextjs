'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { fetchCategories, fetchIngredients, fetchMeal, resetMeals, setIsSearchPerformed } from '@redux/meals';
import { Ingredient, inputType } from '@/types/types';
import { getSearchQueryAndURL } from '@utils/utils';

export const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);
  const [searchType, setSearchType] = useState<inputType>(inputType.Title);

  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) => state.meals.categories.data);
  const ingredients = useAppSelector((state) => state.meals.ingredients.data);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleResetFormInputs = (event: FormEvent) => {
    event.preventDefault();
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedIngredient(null);
    setSearchType(inputType.Title);
    dispatch(resetMeals());
    dispatch(setIsSearchPerformed(false));
  };

  const isSearchQueryValid = /^[a-zA-Z\s]*$/.test(searchQuery);

  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();

    const [query, url] = getSearchQueryAndURL(searchType, searchQuery, selectedCategory, selectedIngredient);

    if (query && url) {
      dispatch(fetchMeal([query, url]));
      dispatch(setIsSearchPerformed(true));
    }
  };

  //Wrapping fetch in use is currently not recommended in Client Components
  //and may trigger multiple re-renders. For now, if you need to fetch data in
  //a Client Component, we recommend using a third-party library such as SWR or React Query :(

  return (
    <Grid item xs={3}>
      <form onSubmit={handleSubmitForm}>
        <Paper
          sx={{ display: 'flex', flexDirection: 'column', p: 2 }}
          elevation={5}
        >
          <RadioGroup
            name="searchType"
            value={searchType}
            onChange={(event) => setSearchType(event.target.value as inputType)}
            sx={{ mb: 4 }}
          >
            <FormControlLabel
              value={inputType.Title}
              control={<Radio />}
              label="Title"
              sx={{ mb: 1 }}
            />

            <TextField
              label="Title"
              disabled={searchType !== inputType.Title}
              sx={{ mb: 2 }}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              error={!isSearchQueryValid}
              helperText={!isSearchQueryValid ? 'Invalid input. Only letters are allowed.' : ''}
            />

            <FormControlLabel
              value={inputType.Category}
              control={<Radio />}
              label="Category"
              sx={{ mb: 1 }}
            />

            <FormControl
              disabled={searchType !== inputType.Category}
              sx={{ mb: 2 }}
            >
              <InputLabel>Category</InputLabel>

              <Select
                label="Category"
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
              value={inputType.Ingredient}
              control={<Radio />}
              label="Ingredient"
              sx={{ mb: 1 }}
            />

            <FormControl>
              <Autocomplete
                disabled={searchType !== inputType.Ingredient}
                id="ingredients-autocomplete"
                value={selectedIngredient}
                onChange={(event, newValue) => setSelectedIngredient(newValue)}
                options={ingredients}
                getOptionLabel={(option) => option.strIngredient}
                renderInput={(params) => (
                  <TextField {...params} label="Ingredients" />
                )}
              />
            </FormControl>
          </RadioGroup>

          <Box display={'flex'}>
            <Button
              variant="outlined"
              type="reset"
              sx={{ flexGrow: 1, mr: 1 }}
              onClick={handleResetFormInputs}
            >
              Clear
            </Button>

            <Button type="submit" variant="contained" sx={{ flexGrow: 1 }} disabled={!isSearchQueryValid}>
              Submit
            </Button>
          </Box>
        </Paper>
      </form>
    </Grid>
  );
};
