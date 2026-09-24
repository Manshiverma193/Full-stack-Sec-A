const Event = require("../models/Event");
const { redisClient } = require("../config/redis");
const { eventSchema } = require("../validators/validators");

const CACHE_KEY = "campusconnect:events";

const invalidateCache = async () => {

    try {
        await redisClient.del(CACHE_KEY);
    } catch (error) {
        console.log("Redis cache invalidation skipped");
    }
};

const getEvents = async (req, res) => {

    try {

        const cached = await redisClient.get(
            CACHE_KEY
        );

        if (cached) {

            return res.json({
                source: "REDIS CACHE",
                events: JSON.parse(cached)
            });
        }

        const events = await Event.find()
            .sort({ date: 1 });

        await redisClient.setEx(
            CACHE_KEY,
            60,
            JSON.stringify(events)
        );

        res.json({
            source: "MONGODB",
            events
        });

    } catch (error) {

        res.status(500).json({
            message: "Unable to fetch events",
            error: error.message
        });
    }
};

const createEvent = async (req, res) => {

    try {

        const data = eventSchema.parse(req.body);

        const event = await Event.create({
            ...data,
            createdBy: req.user.id
        });

        await invalidateCache();

        res.status(201).json({
            message: "Event created successfully",
            event
        });

    } catch (error) {

        res.status(400).json({
            message: "Invalid event data",
            error: error.message
        });
    }
};

const updateEvent = async (req, res) => {

    try {

        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        await invalidateCache();

        res.json({
            message: "Event updated",
            event
        });

    } catch (error) {

        res.status(500).json({
            message: "Unable to update event"
        });
    }
};

const deleteEvent = async (req, res) => {

    try {

        const event = await Event.findByIdAndDelete(
            req.params.id
        );

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        await invalidateCache();

        res.json({
            message: "Event deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: "Unable to delete event"
        });
    }
};

const rsvpEvent = async (req, res) => {

    const event = await Event.findById(
        req.params.id
    );

    if (!event) {
        return res.status(404).json({
            message: "Event not found"
        });
    }

    const alreadyRegistered =
        event.attendees.some(
            (id) => id.toString() === req.user.id
        );

    if (!alreadyRegistered) {
        event.attendees.push(req.user.id);
        await event.save();
    }

    await invalidateCache();

    res.json({
        message: "RSVP successful"
    });
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    rsvpEvent
};
