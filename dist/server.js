"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.set("port", process.env.PORT || 3000);
app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "hello world!"
    });
});
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.use((req, res, next) => {
    res.status(404).json({
        message: "That route does not exist ☠️",
        status: 404
    });
});
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || "Something went wrong. Please try again",
        status: err.status || 500
    });
});
app.listen(app.get("port"), () => console.log(`server is running at %d`, app.get("port")));
