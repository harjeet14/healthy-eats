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
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  "password" VARCHAR(255) NOT NULL
);

CREATE TABLE saved_recipes (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  recipe_id INTEGER,
  food_title VARCHAR(300),
  food_image VARCHAR(500),
  calories REAL
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
  recipe_title VARCHAR(255) NOT NULL,
  recipe_description TEXT NOT NULL,
  recipe_instructions TEXT NOT NULL,
  recipe_price numeric,
  recipe_image_urls VARCHAR(255) NOT NULL,
  created_at date NOT NULL,
  avg_rating SMALLINT NOT NULL DEFAULT 0
);
CREATE TABLE created_recipes_ingredients(
  ingredient_id SERIAL PRIMARY KEY NOT NULL,
  created_recipe_id INTEGER REFERENCES created_recipes(recipe_id) ON DELETE CASCADE,
  ingredient_name VARCHAR(255),
  ingredient_servings INTEGER,
  ingredient_unit TEXT

);
CREATE TABLE meal_planner(
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  recipe_id INTEGER,
  dateTime DATE NOT NULL
);
CREATE TABLE shopping_list(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ingredient_id INTEGER NOT NULL,
  ingredient_name VARCHAR(255) NOT NULL,
  ingredient_image VARCHAR(255),
  amount FLOAT NOT NULL,
  unit VARCHAR(255),
  is_checked BIT NOT NULL
);
CREATE TABLE cart(
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ingredient_id INTEGER
);
-- -- DailyOrder
DROP TABLE IF EXISTS daily_orders CASCADE;
CREATE TABLE daily_orders (
  id SERIAL PRIMARY KEY NOT NULL,
  order_date DATE NOT NULL,
  user_id INTEGER REFERENCES users(id)
);


DROP TABLE IF EXISTS daily_order_details CASCADE;
CREATE TABLE daily_order_details (
  id SERIAL PRIMARY KEY NOT NULL,
  daily_order_id INTEGER REFERENCES daily_orders(id) ON DELETE CASCADE,
  meal CHAR(1), -- B: Breakfast, L: Lunch, D: Dinner
  calories REAL,
  food_id INTEGER,
  food_title VARCHAR(300),
  food_image VARCHAR(500)
);




