import { Client } from 'pg';

const connectionString = 'postgresql://username:password@localhost:5432/database?sslmode=require';

async function createTables() {
    const client = new Client({ connectionString });

    try {
        await client.connect();

        const usersTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;

        const addressesTableQuery = `
            CREATE TABLE IF NOT EXISTS addresses (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                city VARCHAR(100) NOT NULL,
                country VARCHAR(100) NOT NULL,
                street VARCHAR(255) NOT NULL,
                pincode VARCHAR(20),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `;

        await client.query(usersTableQuery);
        await client.query(addressesTableQuery);

        console.log('Tables created or already exist.');
    } catch (err) {
        console.error('Error creating tables:', err);
    } finally {
        await client.end();
    }
}

createTables();
export default createTables;