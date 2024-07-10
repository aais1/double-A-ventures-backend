const { connection } = require("../db/db");

const getAllOrders = async (req, res) => {
  try {
    const [result] = await connection.promise().query(`
      SELECT 
    o.orderId AS orderId,
    o.createdAt AS orderCreatedAt,
    o.approved AS orderStatus,
    o.address AS orderAddress,
    o.quantity AS orderQuantity,
    u.id AS id,
    u.email AS email,
    p.id AS productId,
    p.name AS productName,
    p.price AS productPrice
FROM 
    orders o
JOIN 
    users u ON o.userId = u.id
JOIN 
    products p ON o.productId = p.id;
    `);
    res.json(result);
  } catch (e) {
    res.json({ error: e.message });
  }
};

const getOrderById = async (req, res) => {
  let orderId = req.params.id;
  res.json({ data: "order :" + orderId });
};

const createOrder = async (req, res) => {
  let { cartItems, userId, address } = req.body;
  let approveStatus = false;
  try {
    const insertPromises = cartItems.map(async (item) => {
      const { id: productId, quantity } = item; // although 'quantity' is extracted, it is not used in the query.
      const [result] = await connection
        .promise()
        .query(
          "INSERT INTO orders (userId, productId, address,quantity, approved) VALUES (?, ?,?,?, ?)",
          [userId, productId,address,quantity, approveStatus]
        );
      return result.insertId; // Return the inserted order ID
    });
    // Wait for all insertions to complete
    const orderIds = await Promise.all(insertPromises);

    res.json({ message: "Order(s) created", data: orderIds });
  } catch (e) {
    console.log(e);
  }
};

const deleteOrderById = async (req, res) => {
  let orderId = req.params.id;
  let [result] = await connection.promise().query(
    "DELETE FROM orders WHERE orderId = ?",
    [orderId]
  );
  res.json({ message: "Order deleted", data: result });
};


const approveOrder = async (req, res) => {
  let id = req.params.id;
  try {
    let [result]=await connection.promise().query(
      'UPDATE orders SET approved = true WHERE orderId = ?',[id]
    )
    res.json({message:"Order confirmed"})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }

};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  deleteOrderById,
  approveOrder
};
