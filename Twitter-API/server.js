"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./src/api/routes/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.port;
const routes = new routes_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
routes.loadRoutes(app);
app.get("/", (req, res) => {
    res.send("App is running");
});
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
//# sourceMappingURL=server.js.map