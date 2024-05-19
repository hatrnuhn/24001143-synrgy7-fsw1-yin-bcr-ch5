"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const utils_1 = require("./middlewares/utils");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const objection_1 = require("objection");
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./knexfile"));
dotenv_1.default.config();
const environment = process.env.NODE_ENV || 'development';
const connection = process.env.POSTGRES_URL;
objection_1.Model.knex((0, knex_1.default)(Object.assign(Object.assign(Object.assign({}, knexfile_1.default[environment]), { connection }), (0, objection_1.knexSnakeCaseMappers)())));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api', utils_1.printRequest, routes_1.default);
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
//# sourceMappingURL=index.js.map