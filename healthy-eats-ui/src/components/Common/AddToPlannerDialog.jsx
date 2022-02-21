import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button'
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FoodService from '../../services/foodService';

export default function AddToPlannerDialog(props) {

  const { onClose, open, recipe, setIsAddToPlannerDialogOpen } = props;
  const [date, setDate] = useState(null);
  const [meal, setMeal] = useState('B');

  const handleChange = (event) => {
    setMeal(event.target.value);
  };

  const addRecipeToPlanner = async () => {

    const mealOrder = {
      foodId: recipe.foodId,
      foodTitle: recipe.foodTitle,
      foodImage: recipe.foodImage,
      calories: recipe.calories
    }

    const breakfast = [];
    const lunch = [];
    const dinner = [];

    if (meal === 'B') {
      breakfast.push(mealOrder);
    } else if (meal === 'L') {
      lunch.push(mealOrder);
    } else {
      dinner.push(mealOrder);
    }

    const payload = {
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      breakfast: breakfast,
      lunch: lunch,
      dinner: dinner,
      userId: sessionStorage.sessionUserId
    };

    await FoodService.saveDayOrder(payload);
    setIsAddToPlannerDialogOpen(false);
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Add Recipe to Planner</DialogTitle>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Pick a date"
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Select
        value={meal}
        label="Meal"
        onChange={handleChange}>
        <MenuItem value={'B'}>Breakfast</MenuItem>
        <MenuItem value={'L'}>Lunch</MenuItem>
        <MenuItem value={'D'}>Dinner</MenuItem>
      </Select>
      <Button onClick={addRecipeToPlanner}>
        Submit
      </Button>
    </Dialog >
  );
}