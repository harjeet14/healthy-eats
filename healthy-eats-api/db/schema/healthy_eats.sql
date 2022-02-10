DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS saved_recipes CASCADE;
DROP TABLE IF EXISTS recipe_likes CASCADE;
DROP TABLE IF EXISTS recipe_comments CASCADE;
DROP TABLE IF EXISTS created_recipes CASCADE;
DROP TABLE IF EXISTS created_recipes_ingredients CASCADE;
DROP TABLE IF EXISTS meal_planner CASCADE;
DROP TABLE IF EXISTS shopping_list CASCADE;
DROP TABLE IF EXISTS cart CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL
);
CREATE TABLE saved_recipes (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  recipe_id INTEGER
);
CREATE TABLE recipe_likes(
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  recipe_id INTEGER
);
CREATE TABLE recipe_comments(
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  recipe_id INTEGER,
  message TEXT
);
CREATE TABLE created_recipes(
  recipe_id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  recipeTitle VARCHAR(255) NOT NULL,
  recipeDescription VARCHAR(255) NOT NULL,
  recipePrice numeric,
  recipeImageUrls VARCHAR(255) NOT NULL,
  createdAt date NOT NULL,
  avgRating SMALLINT NOT NULL DEFAULT 0
);
CREATE TABLE created_recipes_ingredients(
  created_recipe_id INTEGER REFERENCES created_recipes(recipe_id) ON DELETE CASCADE,
  ingredient_id INTEGER
);
CREATE TABLE meal_planner(
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  recipe_id INTEGER,
  dateTime DATE NOT NULL
);
CREATE TABLE shopping_list(
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ingredient_id INTEGER,
  isChecked boolean
);
CREATE TABLE cart(
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ingredient_id INTEGER
);
