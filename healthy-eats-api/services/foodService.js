module.exports.getDailyOrder = async (db, userId, date) => {
  date.setHours(0, 0, 0, 0);
  date.setDate(1);

  const startDateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  const endDate = new Date(date.valueOf());
  endDate.setMonth(endDate.getMonth() + 1);

  const endDateStr = `${endDate.getFullYear()}-${endDate.getMonth()}-${endDate.getDate()}`;

  const ordersRow = await db.query(
    `SELECT * FROM daily_orders WHERE user_id = $1 AND order_date BETWEEN $2 AND $3`,
    [userId, startDateStr, endDateStr]
  );
  const orders = (ordersRow && ordersRow.rows) || [];

  for (let item of orders) {
    const orderDetailRow = await db.query(
      `SELECT * FROM daily_order_details WHERE daily_order_id = $1`,
      [item.id]
    );

    const orderDetail = (orderDetailRow && orderDetailRow.rows) || [];

    item.detail = orderDetail;
  }

  return orders;
};

module.exports.saveDailyOrder = async (db, saveDailyOrderPayload) => {
  const { date, breakfast, lunch, dinner, userId } = saveDailyOrderPayload;

  date.setHours(0, 0, 0, 0);
  const orderDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  const orderRaw = await db.query(
    "INSERT INTO daily_orders (order_date, user_id) values ($1, $2) RETURNING *",
    [orderDate, userId]
  );

  const order = orderRaw.rows[0];

  for (let br of breakfast) {
    await db.query(
      `INSERT INTO daily_order_details 
      (daily_order_id, meal, calories, food_id, food_title, food_image ) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [order.id, "B", br.calories, br.foodId, br.foodTitle, br.food_image]
    );
  }

  for (let br of lunch) {
    await db.query(
      `INSERT INTO daily_order_details 
      (daily_order_id, meal, calories, food_id, food_title, food_image ) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [order.id, "L", br.calories, br.foodId, br.foodTitle, br.food_image]
    );
  }

  for (let br of dinner) {
    await db.query(
      `INSERT INTO daily_order_details 
      (daily_order_id, meal, calories, food_id, food_title, food_image ) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [order.id, "D", br.calories, br.foodId, br.foodTitle, br.food_image]
    );
  }

  return true;
};
