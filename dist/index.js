"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const utils_1 = require("./middlewares/utils");
const mongoose_1 = require("./mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.dbURI;
(0, mongoose_1.connectToDB)(uri)
    .catch(console.dir);
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api', utils_1.printRequest, routes_1.default);
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
//# sourceMappingURL=index.js.map