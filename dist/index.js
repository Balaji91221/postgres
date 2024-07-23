"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const createTables_1 = require("./database/createTables");
const insertUser_1 = require("./database/insertUser");
const insertAddress_1 = require("./database/insertAddress");
const getUser_1 = require("./database/getUser");
const updateUserEmail_1 = require("./database/updateUserEmail");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create tables
            yield (0, createTables_1.default)();
            // Insert a user and an address
            const user = yield (0, insertUser_1.default)('john_doe', 'john@example.com', 'securepassword123');
            if (user) {
                yield (0, insertAddress_1.default)(user.id, 'New York', 'USA', '123 Main St', '10001');
            }
            // Fetch the user
            yield (0, getUser_1.default)('john@example.com');
            // Update the user's email
            yield (0, updateUserEmail_1.default)('john_doe', 'john_doe@example.com');
            // Delete the user
            // await deleteUser('john_doe@example.com');
        }
        catch (err) {
            console.error('Error:', err);
        }
    });
}
run();
