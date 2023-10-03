const mongoose = require("mongoose");

const newsFeedPostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Cím megadása kötelező!"],
        },
        image: {
            type: String,
            required: [true, "Kép megadása kötelező!"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            required: true
        },
        lastModified: {
            type: Date,
            default: Date.now,
            required: true
        },
        content: {
            type: String,
            required: [true, "Tartalom megadása kötelező!"],
        },
        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "Felhasználó megadása kötelező!"],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    });

const NewsFeedPost = mongoose.model("NewsFeedPost", newsFeedPostSchema);

module.exports = NewsFeedPost;
