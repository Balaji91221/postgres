import { Client } from 'pg';

const connectionString = 'postgresql://username:password@localhost:5432/database?sslmode=require';

async function insertUser(username: string, email: string, password: string) {
    const client = new Client({ connectionString });

    try {
        await client.connect();

        const query = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [username, email, password];
        const result = await client.query(query, values);

        console.log('User inserted:', result.rows[0]);
        return result.rows[0];
    } catch (err) {
        console.error('Error inserting user:', err);
    } finally {
        await client.end();
    }
}


export default insertUser;