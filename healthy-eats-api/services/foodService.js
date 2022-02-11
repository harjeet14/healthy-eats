module.exports.getOrdersByDate = async (db, userId, startDate, endDate) => {
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  const startDateStr = `${startDate.getFullYear()}-${
    startDate.getMonth() + 1
  }-${startDate.getDate()}`;
  const endDateStr = `${endDate.getFullYear()}-${
    endDate.getMonth() + 1
  }-${endDate.getDate()}`;

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
  const dateConverted = new Date(date);
  dateConverted.setHours(0, 0, 0, 0);
  const orderDate = `${dateConverted.getFullYear()}-${
    dateConverted.getMonth() + 1
  }-${dateConverted.getDate()}`;

  await db.query(
    "DELETE FROM daily_orders WHERE  order_date = $1 AND user_id = $2",
    [orderDate, userId]
  );

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
      [order.id, "B", br.calories, br.foodId, br.foodTitle, br.foodImage]
    );
  }

  for (let br of lunch) {
    await db.query(
      `INSERT INTO daily_order_details 
      (daily_order_id, meal, calories, food_id, food_title, food_image ) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [order.id, "L", br.calories, br.foodId, br.foodTitle, br.foodImage]
    );
  }

  for (let br of dinner) {
    await db.query(
      `INSERT INTO daily_order_details 
      (daily_order_id, meal, calories, food_id, food_title, food_image ) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [order.id, "D", br.calories, br.foodId, br.foodTitle, br.foodImage]
    );
  }

  return true;
};
