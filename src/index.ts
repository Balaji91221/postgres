import { Client } from 'pg';

// Connection string for PostgreSQL
const connectionString = 'process.env.DATABASE_URL';


// Function to insert user data into the database
async function insertUser(username: string, email: string, password: string) {
    const client = new Client({
        connectionString: connectionString,
    });

    try {
        await client.connect();

        // Check if user with the same username already exists
        const checkQuery = 'SELECT * FROM users WHERE username = $1';
        const checkValues = [username];
        const checkResult = await client.query(checkQuery, checkValues);

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
        const result = await client.query(insertQuery, insertValues);

        console.log('User inserted:', result.rows[0]);
        return result.rows[0];
    } catch (err) {
        console.error('Error during inserting user:', err);
        throw err;
    } finally {
        await client.end();
    }
}

// Function to fetch user data from the database given an email
async function getUser(email: string) {
    const client = new Client({
        connectionString: connectionString,
    });

    try {
        await client.connect();
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = await client.query(query, values);

        if (result.rows.length > 0) {
            console.log('User found:', result.rows[0]);
            return result.rows[0];
        } else {
            console.log('No user found with the given email.');
            return null;
        }
    } catch (err) {
        console.error('Error during fetching user:', err);
        throw err;
    } finally {
        await client.end();
    }
}

// Function to delete a user from the database
async function deleteUser(email: string) {
    const client = new Client({
        connectionString: connectionString,
    });

    try {
        await client.connect();

        // Delete user by email
        const query = 'DELETE FROM users WHERE email = $1 RETURNING *';
        const values = [email];
        const result = await client.query(query, values);

        // Type guard to ensure rowCount is a number
        const rowCount = result.rowCount as number;
        if (rowCount > 0) {
            console.log('User deleted:', result.rows[0]);
        } else {
            console.log('No user found with the given email.');
        }
    } catch (err) {
        console.error('Error during deleting user:', err);
        throw err;
    } finally {
        await client.end();
    }
}

// Example usage
async function run() {
    try {
        // Uncomment the following lines as needed to test the functions

        // Insert users
        // await insertUser('john_doe', 'john@example.com', 'securepassword123');
        // await insertUser('Balaji Naik', 'kbalaji@example.com', 'balaji15');

        // Retrieve users
        // await getUser('john@example.com');
        // await getUser('kbalaji@example.com');

        // Delete a user
        await deleteUser('john@example.com');
    } catch (err) {
        console.error('Error:', err);
    }
}

run();
