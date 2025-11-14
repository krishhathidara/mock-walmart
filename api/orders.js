let orders = [];

module.exports = (req, res) => {
  if (req.method === "POST") {
    const order = req.body;
    order.receivedAt = new Date().toISOString();
    orders.push(order);
    console.log("📦 New order received at Walmart:", order);

    res.status(200).json({
      success: true,
      message: "Order received by Walmart API",
      orderId: "WM" + Math.floor(Math.random() * 100000),
      receivedAt: order.receivedAt
    });
  } else if (req.method === "GET") {
    res.status(200).json({ orders });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
