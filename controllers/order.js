const { connection } = require("../db/db");

const getAllOrders = async (req, res) => {
  res.json({ data: "all orders" });
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
          "INSERT INTO orders (userId, productId, address, approved) VALUES (?, ?, ?, ?)",
          [userId, productId, address, approveStatus]
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
  res.json({ data: "delete" + req.params.id });
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  deleteOrderById,
};
