import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import HealthyEatsApiService from '../services/healthyEatsApiService';

export function ShoppingList() {

  const [shoppingListItems, setShoppingListItems] = useState([]);

  useEffect(async () => {
    const shoppingList = await HealthyEatsApiService.getShoppingList(sessionStorage.sessionUserId);

    console.log(`shoppingList: ${JSON.stringify(shoppingList)}`);
    setShoppingListItems(shoppingList);
  }, []);

  const handleToggle = (value) => () => {
    // const currentIndex = checkedIngredients.indexOf(value);
    // const newChecked = [...checkedIngredients];

    // if (currentIndex === -1) {
    //   newChecked.push(value);
    // } else {
    //   newChecked.splice(currentIndex, 1);
    // }

    // setCheckedIngredients(newChecked);
  };

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {shoppingListItems.map((ingredient) => {
        const labelId = `checkbox-list-secondary-label-${ingredient.ingredient_id}`;
        return (
          <ListItem
            key={ingredient.ingredient_id}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(ingredient.ingredient_id)}
                checked={ingredient.isChecked}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${ingredient.ingredient_name}`}
                  src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.ingredient_image}`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${ingredient.amount} ${ingredient.unit} ${ingredient.ingredient_name}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  )
};