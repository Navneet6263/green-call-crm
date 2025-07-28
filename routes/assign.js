const express = require("express");
const Lead = require("../models/Lead");
const User = require("../models/User");
const router = express.Router();

// Assign leads to user
router.post("/assign", async (req, res) => {
  const { leadIds, assignedTo } = req.body;
  if (!Array.isArray(leadIds) || !assignedTo) {
    return res.status(400).json({ error: "leadIds (array) and assignedTo (user id) required." });
  }
  try {
    // Validate user
    const user = await User.findById(assignedTo);
    if (!user) {
      return res.status(400).json({ error: "Assigned user does not exist." });
    }
    // Update leads
    const result = await Lead.updateMany(
      { _id: { $in: leadIds } },
      { $set: { assignedTo: user._id } }
    );
    res.json({ success: true, modifiedCount: result.nModified || result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
