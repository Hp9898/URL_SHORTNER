const express = require("express");
const path = require("path");
const shortid = require("shortid");
const URL = require("./models/url");
const { connectwithmongodb } = require("./connect");
const urlRoutes = require("./routes/url");
const Userroute = require("./routes/user");
const staticRouter = require("./routes/staticrouter");
const cookieParser = require("cookie-parser");
const {resticatetheuserloggedin} = require("./middlewares/auth")
const app = express();
const port = 8002;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// Register User routes
app.use("/user", Userroute);

// Register URL routes
app.use("/url",resticatetheuserloggedin, urlRoutes);

// Register static routes
app.use("/", staticRouter);

// Route to handle creating a new short URL
app.post("/url/new", async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }
    const shortId = shortid.generate();
    try {
        await URL.create({
            shortId: shortId,
            redirectUrl: url,
            visitedHistory: []
        });
        res.render("home", { id: shortId });
    } catch (error) {
        console.error("Error creating short URL:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to handle redirection
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitedHistory: { timestamp: Date.now() } } },
            { new: true }
        );
        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }
        res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error("Error during redirection:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Connect to MongoDB
connectwithmongodb('mongodb://localhost:27017/url_s').then(() => console.log("Connected with MongoDB"));

// Start the server
app.listen(port, () => console.log(`Server Started on ${port}`));
