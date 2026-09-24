const { z } = require("zod");

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["ADMIN", "STUDENT"]).optional()
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
});

const eventSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(2),
    date: z.string(),
    location: z.string().min(2)
});

const announcementSchema = z.object({
    title: z.string().min(2),
    message: z.string().min(2)
});

module.exports = {
    registerSchema,
    loginSchema,
    eventSchema,
    announcementSchema
};
