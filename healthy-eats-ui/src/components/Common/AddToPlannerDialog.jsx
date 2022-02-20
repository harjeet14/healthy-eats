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


export default function AddToPlannerDialog(props) {

  const { onClose, open, recipe } = props;
  const [value, setValue] = useState(null);
  const [meal, setMeal] = useState('Breakfast');

  const handleChange = (event) => {
    setMeal(event.target.value);
  };


  const addRecipeToPlanner = async () => {

    // const payload = {
    //   date: selectedDate,
    //   breakfast: selected.breakfast,
    //   lunch: selected.lunch,
    //   dinner: selected.dinner,
    //   userId: sessionStorage.sessionUserId
    // };

    // await FoodService.saveDayOrder(payload);
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Add Recipe to Planner</DialogTitle>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Pick a date"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
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