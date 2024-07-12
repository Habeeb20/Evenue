"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var http_1 = __importDefault(require("http"));
var ws_1 = __importDefault(require("ws"));
require("dotenv/config");
var app = (0, express_1.default)();
var server = http_1.default.createServer(app); // Create HTTP server
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5500", // for admin
        "http://127.0.0.1:5173",
        "http://localhost:5173",
    ],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Import routes
var users_1 = __importDefault(require("./routes/users/users"));
var events_1 = __importDefault(require("./routes/events/events"));
var venues_1 = __importDefault(require("./routes/venues/venues"));
var eventServices_1 = __importDefault(require("./routes/eventServices/eventServices"));
var eventsShowcase_1 = __importDefault(require("./routes/eventsShowcase/eventsShowcase"));
var shortVideos_1 = __importDefault(require("./routes/shortVideos/shortVideos"));
var story_1 = __importDefault(require("./routes/story/story"));
var groups_1 = __importDefault(require("./routes/groups/groups"));
var chat_1 = __importDefault(require("./routes/chat/chat"));
var paystack_1 = __importDefault(require("./routes/paystack/paystack"));
var admin_1 = __importDefault(require("./routes/admin/admin"));
var db_1 = __importDefault(require("./db/db"));
// Attach WebSocket server to the HTTP server
var wss = new ws_1.default.Server({ server: server });
wss.on("connection", function connection(ws) {
    ws.on("error", console.error);
    // Handle incoming messages
    ws.on("message", function incoming(message) {
        console.log("receivedhdhh: %s", message);
        // Parse the incoming message
        var data = JSON.parse(message.toString());
        var userId = data.senderId;
        console.log({ rid: data.recipientId });
        console.log({ userId: userId });
        // Save message to database and send to recipient
        saveMessageToDatabase(userId, data.recipientId, data.message);
        sendMessageToRecipient(userId, data.recipientId, data.message);
    });
});
// Function to save the message to the database
function saveMessageToDatabase(senderId, recipientId, message) {
    var query = "INSERT INTO chat (fk_sender_id, fk_recipient_id, message) VALUES (?, ?, ?)";
    db_1.default.execute(query, [senderId, recipientId, message], function (error) {
        if (error)
            throw error;
        console.log("Message saved to database");
    });
}
// Function to send the message to the recipient
function sendMessageToRecipient(senderId, recipientId, message) {
    console.log({ send: { senderId: senderId, recipientId: recipientId, message: message } });
    // Find the WebSocket connection of the recipient
    wss.clients.forEach(function outgoing(client) {
        // Check if the client is the recipient and send the message
        if (recipientId) {
            client.send(JSON.stringify({ senderId: senderId, recipientId: recipientId, message: message }));
        }
    });
}
// use routes
app.use("/api/v1/users", users_1.default);
app.use("/api/v1/events", events_1.default);
app.use("/api/v1/venues", venues_1.default);
app.use("/api/v1/eventServices", eventServices_1.default);
app.use("/api/v1/eventsShowcase", eventsShowcase_1.default);
app.use("/api/v1/shortVideos", shortVideos_1.default);
app.use("/api/v1/story", story_1.default);
app.use("/api/v1/groups", groups_1.default);
app.use("/api/v1/chat", chat_1.default);
app.use("/api/v1/paystack", paystack_1.default);
app.use("/api/v1/admin", admin_1.default);
app.get("/", function (req, res) {
    res.send("Evenue API is running...");
});
server.listen(process.env.PORT, function () {
    console.log("Server started on port ".concat(process.env.PORT, "..."));
});
//# sourceMappingURL=app.js.map