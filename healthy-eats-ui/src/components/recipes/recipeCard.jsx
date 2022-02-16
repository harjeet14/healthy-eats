import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import Delete from "@mui/icons-material/Delete";
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { useState } from 'react';

export default function RecipeCard({ recipe, isDeletable, saveUnsaveRecipe, likeUnlikeRecipe, onClick }) {

  const [isSaved, setIsSaved] = useState(recipe.isSaved);
  const [isLiked, setIsLiked] = useState(recipe.isLiked);

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardHeader disableTypography={true}
        action={!isDeletable &&
          <IconButton aria-label="settings" onClick={() => saveUnsaveRecipe(recipe, setIsSaved)} >
            {isSaved ? <Bookmark /> : <BookmarkBorder />}
          </IconButton>
        }
        title={recipe.foodTitle}
      />
      <CardMedia onClick={() => onClick(recipe)}
        component="img"
        height="250"
        image={recipe.foodImage}
        alt="Paella dish"
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => likeUnlikeRecipe(recipe, setIsLiked)} >
          {isLiked ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        {isDeletable &&
          <IconButton aria-label="delete from favorites" onClick={() => saveUnsaveRecipe(recipe, setIsSaved)}>
            <Delete />
          </IconButton>
        }
      </CardActions>
    </Card >
  );
}