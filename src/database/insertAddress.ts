import { Client } from 'pg';

const connectionString = 'postgresql://example_owner@ep-shy-recipe-a5cpzfqv.us-east-2.aws.neon.tech/example?sslmode=require';

async function insertAddress(userId: number, city: string, country: string, street: string, pincode: string) {
    const client = new Client({ connectionString });

    try {
        await client.connect();

        const query = `
            INSERT INTO addresses (user_id, city, country, street, pincode)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [userId, city, country, street, pincode];
        const result = await client.query(query, values);

        console.log('Address inserted:', result.rows[0]);
        return result.rows[0];
    } catch (err) {
        console.error('Error inserting address:', err);
    } finally {
        await client.end();
    }
}
export default  insertAddress ;