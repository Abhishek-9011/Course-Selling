import Purchase from "../models/Purchase.js";

// Create a new purchase
export const createPurchase = async (req, res) => {
  try {
    const purchase = new Purchase(req.body);
    await purchase.save();
    res.status(201).json({ success: true, message: "Purchase recorded successfully", purchase });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all purchases
export const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().populate("user course");
    res.status(200).json({ success: true, purchases });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single purchase by ID
export const getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id).populate("user course");
    if (!purchase) {
      return res.status(404).json({ success: false, message: "Purchase not found" });
    }
    res.status(200).json({ success: true, purchase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a purchase
export const updatePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!purchase) {
      return res.status(404).json({ success: false, message: "Purchase not found" });
    }
    res.status(200).json({ success: true, message: "Purchase updated successfully", purchase });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a purchase
export const deletePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndDelete(req.params.id);
    if (!purchase) {
      return res.status(404).json({ success: false, message: "Purchase not found" });
    }
    res.status(200).json({ success: true, message: "Purchase deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
