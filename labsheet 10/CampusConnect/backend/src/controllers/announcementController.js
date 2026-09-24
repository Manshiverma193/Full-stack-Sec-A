const Announcement = require("../models/Announcement");

const {
    announcementSchema
} = require("../validators/validators");

const createAnnouncement = async (req, res) => {

    try {

        const data =
            announcementSchema.parse(req.body);

        const announcement =
            await Announcement.create({
                ...data,
                createdBy: req.user.id
            });

        const io = req.app.get("io");

        if (io) {

            io.emit(
                "new-announcement",
                {
                    id: announcement._id,
                    title: announcement.title,
                    message: announcement.message
                }
            );
        }

        res.status(201).json({
            message: "Announcement created",
            announcement
        });

    } catch (error) {

        res.status(400).json({
            message: "Invalid announcement",
            error: error.message
        });
    }
};

const getAnnouncements = async (req, res) => {

    const announcements =
        await Announcement.find()
        .sort({ createdAt: -1 });

    res.json(announcements);
};

module.exports = {
    createAnnouncement,
    getAnnouncements
};
