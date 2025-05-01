"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app/app"));
const env_1 = require("./config/env");
const PORT = env_1.env.PORT || 3000;
try {
    app_1.default.listen(PORT, () => console.log(`Server running on PORT: ${PORT}...`));
}
catch (error) {
    console.error(error);
    throw error;
}
