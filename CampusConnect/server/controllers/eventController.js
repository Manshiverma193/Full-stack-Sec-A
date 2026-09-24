import Event from "../models/Event.js";
import Registration from "../models/Registration.js";

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ date: 1 });

    res.json({ events });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getEventById = async (
  req,
  res
) => {
  try {
    const event =
      await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json({ event });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const createEvent = async (
  req,
  res
) => {
  try {
    const event = await Event.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json({
      message: "Event created",
      event
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const updateEvent = async (
  req,
  res
) => {
  try {
    const event =
      await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json({
      message: "Event updated",
      event
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteEvent = async (
  req,
  res
) => {
  try {
    const event =
      await Event.findByIdAndDelete(
        req.params.id
      );

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    await Registration.deleteMany({
      event: req.params.id
    });

    res.json({
      message: "Event deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const registerForEvent = async (
  req,
  res
) => {
  try {
    const event =
      await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    const existing =
      await Registration.findOne({
        event: event._id,
        student: req.user._id
      });

    if (existing) {
      return res.status(400).json({
        message: "Already registered"
      });
    }

    const count =
      await Registration.countDocuments({
        event: event._id
      });

    if (count >= event.capacity) {
      return res.status(400).json({
        message: "Event is full"
      });
    }

    await Registration.create({
      event: event._id,
      student: req.user._id
    });

    res.status(201).json({
      message:
        "Successfully registered for event"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};