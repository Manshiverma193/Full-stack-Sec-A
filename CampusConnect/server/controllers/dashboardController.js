import User from "../models/User.js";
import Event from "../models/Event.js";
import Resource from "../models/Resource.js";
import Registration from "../models/Registration.js";

export const getDashboardStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const events = await Event.countDocuments();
    const resources = await Resource.countDocuments();
    const registrations =
      await Registration.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        users,
        events,
        resources,
        registrations
      }
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics"
    });
  }
};