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
const pg_1 = require("pg");
// Connection string for PostgreSQL
const connectionString = 'postgresql://example_owner:bpXemxKVZ9h0@ep-shy-recipe-a5cpzfqv.us-east-2.aws.neon.tech/example?sslmode=require';
// Function to insert user data into the database
function insertUser(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            connectionString: connectionString,
        });
        try {
            yield client.connect();
            // Check if user with the same username already exists
            const checkQuery = 'SELECT * FROM users WHERE username = $1';
            const checkValues = [username];
            const checkResult = yield client.query(checkQuery, checkValues);
            if (checkResult.rows.length > 0) {
                console.log(`User with username '${username}' already exists.`);
                return null;
            }
            // Insert new user
            const insertQuery = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
            const insertValues = [username, email, password];
            const result = yield client.query(insertQuery, insertValues);
            console.log('User inserted:', result.rows[0]);
            return result.rows[0];
        }
        catch (err) {
            console.error('Error during inserting user:', err);
            throw err;
        }
        finally {
            yield client.end();
        }
    });
}
// Function to fetch user data from the database given an email
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            connectionString: connectionString,
        });
        try {
            yield client.connect();
            const query = 'SELECT * FROM users WHERE email = $1';
            const values = [email];
            const result = yield client.query(query, values);
            if (result.rows.length > 0) {
                console.log('User found:', result.rows[0]);
                return result.rows[0];
            }
            else {
                console.log('No user found with the given email.');
                return null;
            }
        }
        catch (err) {
            console.error('Error during fetching user:', err);
            throw err;
        }
        finally {
            yield client.end();
        }
    });
}
// Function to delete a user from the database
function deleteUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            connectionString: connectionString,
        });
        try {
            yield client.connect();
            // Delete user by email
            const query = 'DELETE FROM users WHERE email = $1 RETURNING *';
            const values = [email];
            const result = yield client.query(query, values);
            // Type guard to ensure rowCount is a number
            const rowCount = result.rowCount;
            if (rowCount > 0) {
                console.log('User deleted:', result.rows[0]);
            }
            else {
                console.log('No user found with the given email.');
            }
        }
        catch (err) {
            console.error('Error during deleting user:', err);
            throw err;
        }
        finally {
            yield client.end();
        }
    });
}
// Example usage
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Uncomment the following lines as needed to test the functions
            // Insert users
            // await insertUser('john_doe', 'john@example.com', 'securepassword123');
            // await insertUser('Balaji Naik', 'kbalaji@example.com', 'balaji15');
            // Retrieve users
            // await getUser('john@example.com');
            // await getUser('kbalaji@example.com');
            // Delete a user
            yield deleteUser('john@example.com');
        }
        catch (err) {
            console.error('Error:', err);
        }
    });
}
run();
