import { Client } from 'pg';

const connectionString = 'postgresql://username:password@localhost:5432/database?sslmode=require';


async function updateUserEmail(username: string, newEmail: string) {
    const client = new Client({ connectionString });

    try {
        await client.connect();

        const query = 'UPDATE users SET email = $1 WHERE username = $2 RETURNING *';
        const values = [newEmail, username];
        const result = await client.query(query, values);

        if (result.rowCount !== null && result.rowCount > 0) {
            console.log('User updated:', result.rows[0]);
        } else {
            console.log('No user found with the given username.');
        }
    } catch (err) {
        console.error('Error updating user:', err);
    } finally {
        await client.end();
    }
}

export default updateUserEmail;