import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue } from '@mui/material/colors';
import ShoppingListDialog from './ShoppingListDialog';
import { useState } from 'react';
import FoodService from '../../services/foodService';
import AddToPlannerDialog from './AddToPlannerDialog';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const dialogOptions = ['Planner', 'Shopping List'];

AddToDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function AddToDialog(props) {
  const { onClose, selectedValue, open, recipe } = props;

  const [isShoppingListDialogOpen, setIsShoppingListDialogOpen] = useState(false);
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  const [isAddToPlannerDialogOpen, setIsAddToPlannerDialogOpen] = useState(false);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = async (value) => {
    if (value === 'Shopping List') {
      let recipeInfo = await FoodService.getRecipeInfo(recipe.foodId);

      setRecipeIngredients(recipeInfo.extendedIngredients);

      setIsShoppingListDialogOpen(true);
      onClose(value);
    } else {
      setIsAddToPlannerDialogOpen(true);
      onClose(value);
    }
  };

  const handleShoppingListDialogClose = () => {
    setIsShoppingListDialogOpen(false);
  };

  const handleAddToPlannerDialogClose = () => {
    setIsAddToPlannerDialogOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ top: 5 }}>Add to ...</DialogTitle>
        <List sx={{ top: 15, pt: 0 }}>
          {dialogOptions.map((dialogOption) => (
            <ListItem button onClick={() => handleListItemClick(dialogOption)} key={dialogOption}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  {dialogOption === 'Planner' ? <DateRangeIcon /> : <PlaylistAddIcon />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={dialogOption} />
            </ListItem>
          ))}
        </List>
      </Dialog>
      <AddToPlannerDialog
        open={isAddToPlannerDialogOpen}
        onClose={handleAddToPlannerDialogClose}
        isAddToPlannerDialogOpen={isAddToPlannerDialogOpen}
        recipe={recipe}
      />
      <ShoppingListDialog
        open={isShoppingListDialogOpen}
        onClose={handleShoppingListDialogClose}
        recipeIngredients={recipeIngredients}
        setIsShoppingListDialogOpen={setIsShoppingListDialogOpen}
      />
    </div>
  );
}
