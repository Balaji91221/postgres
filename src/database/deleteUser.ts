import { Client } from 'pg';

const connectionString = 'postgresql://username:password@localhost:5432/database?sslmode=require';

async function deleteUser(email: string) {
    const client = new Client({ connectionString });

    try {
        await client.connect();

        const query = 'DELETE FROM users WHERE email = $1 RETURNING *';
        const values = [email];
        const result = await client.query(query, values);

        if (result.rowCount !== null && result.rowCount > 0) {
            console.log('User deleted:', result.rows[0]);
        } else {
            console.log('No user found with the given email.');
        }
    } catch (err) {
        console.error('Error deleting user:', err);
    } finally {
        await client.end();
    }
}

export default deleteUser;