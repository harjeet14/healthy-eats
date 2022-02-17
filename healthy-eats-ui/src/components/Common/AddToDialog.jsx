import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { blue } from '@mui/material/colors';
import ShoppingListDialog from './ShoppingListDialog';
import { useState } from 'react';
import FoodService from '../../services/foodService';

const dialogOptions = ['Shopping List'];

AddToDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function AddToDialog(props) {
  const { onClose, selectedValue, open, recipe } = props;

  const [isShoppingListDialogOpen, setIsShoppingListDialogOpen] = useState(false);
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = async (value) => {
    if (value === 'Shopping List') {
      let recipeInfo = await FoodService.getRecipeInfo(recipe.foodId);

      setRecipeIngredients(recipeInfo.extendedIngredients);

      setIsShoppingListDialogOpen(true);
      onClose(value);
    }
  };

  const handleShoppingListDialogClose = () => {
    setIsShoppingListDialogOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add to ...</DialogTitle>
        <List sx={{ pt: 0 }}>
          {dialogOptions.map((dialogOption) => (
            <ListItem button onClick={() => handleListItemClick(dialogOption)} key={dialogOption}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <ShoppingCartIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={dialogOption} />
            </ListItem>
          ))}
        </List>
      </Dialog>
      <ShoppingListDialog
        open={isShoppingListDialogOpen}
        onClose={handleShoppingListDialogClose}
        recipeIngredients={recipeIngredients}
        setIsShoppingListDialogOpen={setIsShoppingListDialogOpen}
      />
    </div>
  );
}
