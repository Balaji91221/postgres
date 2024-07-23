import { Client } from 'pg';

const connectionString = 'postgresql://username:password@localhost:5432/database?sslmode=require';

async function getUser(email: string) {
    const client = new Client({ connectionString });

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
        console.error('Error fetching user:', err);
    } finally {
        await client.end();
    }
}
export default getUser;
