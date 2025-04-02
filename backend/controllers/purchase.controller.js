import Purchase from "../models/Purchase.js";

export const createPurchase = async (req, res) => {
  try {
    const { course, price } = req.body; // Only allow course & price from request
    const userId = req.user.id; // Get user ID from authentication middleware

    const purchase = new Purchase({ user: userId, course, price }); // Set user automatically
    await purchase.save();

    res.status(201).json({
      success: true,
      message: "Purchase recorded successfully",
      purchase,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getPurchases = async (req, res) => {
  try {
    const userId = req.user.id; // Get logged-in user ID

    const purchases = await Purchase.find({ user: userId }).populate("course");
    res.status(200).json({ success: true, purchases });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
