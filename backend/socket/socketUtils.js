const Message = require("../model/globalChat/messageModal");

async function trimOldMessages(limit = 100) {
  try {
    const count = await Message.countDocuments();
    if (count > limit) {
      const toDelete = await Message.find().sort({ timestamp: 1 }).limit(count - limit);
      await Message.deleteMany({ _id: { $in: toDelete.map(msg => msg._id) } });
    }
  } catch (err) {
    console.error("❌ Error trimming old messages:", err);
  }
}

module.exports = { trimOldMessages };
