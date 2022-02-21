import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import { Button, DialogTitle } from '@mui/material';
import HealthyEatsApiService from '../../services/healthyEatsApiService';
import './shoppingList.scss'

export function ShoppingList() {

  const [unCheckedItems, setUnCheckedItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    HealthyEatsApiService.getShoppingList(sessionStorage.sessionUserId)
      .then((shoppingList) => {

        setUnCheckedItems((shoppingList || []).filter(item => item.is_checked === '0'));
        setCheckedItems((shoppingList || []).filter(item => item.is_checked === '1'));

      });
  }, []);

  const handleToggle = async (ingredient, check) => {

    const idxChecked = checkedItems.indexOf(ingredient);
    const idxUnChecked = unCheckedItems.indexOf(ingredient);

    const newChecked = [...checkedItems];
    const newUnChecked = [...unCheckedItems];

    if (idxChecked === -1) {
      ingredient.is_checked = 1;
      newChecked.push(ingredient);
    } else {
      newChecked.splice(idxChecked, 1);
    }

    if (idxUnChecked === -1) {
      ingredient.is_checked = 0;
      newUnChecked.push(ingredient);
    } else {
      newUnChecked.splice(idxUnChecked, 1);
    }

    await HealthyEatsApiService.updateShoppingListItem(ingredient);

    setCheckedItems(newChecked);
    setUnCheckedItems(newUnChecked);
  };

  const clearCheckedIngredients = () => {

    const deleteOperations = [];
    checkedItems.forEach(i => {
      deleteOperations.push(HealthyEatsApiService.deleteShoppingListItem(i.id));
    });

    Promise.all(deleteOperations)
      .then(() => {
        setCheckedItems([]);
      });
  };

  return (
    <div className="shoppingList">
      <List dense sx={{ borderTop: 1, borderBottom: 1, borderRadius: 5, left: '19%', margin: '50', zIndex: 'tooltip', width: '60%', maxWidth: '360', bgcolor: 'background.paper' }}>
        <DialogTitle sx={{ top: '15%' }}>Shopping List</DialogTitle>
        {unCheckedItems.map((ingredient) => {
          const labelId = `checkbox-list-secondary-label-${ingredient.ingredient_id}`;
          return (
            <ListItem
              key={ingredient.ingredient_id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={() => handleToggle(ingredient, 1)}
                  checked={false}
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

      <List dense sx={{ borderTop: 1, borderBottom: 1, borderRadius: 5, left: '19%', top: '10%', zIndex: 'tooltip', width: '60%', maxWidth: '360', bgcolor: 'background.paper' }}>
        <DialogTitle sx={{ top: 5 }}>Checked Items
          <Button sx={{ float: 'right', color: 'text.primary', fontWeight: 'bold', display: 'inline-flex' }} onClick={() => clearCheckedIngredients()}>Clear</Button>
        </DialogTitle>
        {checkedItems.map((ingredient) => {
          const labelId = `checkbox-list-secondary-label-${ingredient.ingredient_id}`;
          return (
            <ListItem
              key={ingredient.ingredient_id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={() => handleToggle(ingredient, 0)}
                  checked={true}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              style={{ textDecoration: 'line-through' }}
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
    </div>
  )
};