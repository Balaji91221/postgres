import  createTables  from './database/createTables';
import  insertUser from './database/insertUser';
import  insertAddress  from './database/insertAddress';
import  getUser  from './database/getUser';
import  updateUserEmail from './database/updateUserEmail';
import  deleteUser  from './database/deleteUser';
async function run() {
    try {
        // Create tables
        await createTables();

        // Insert a user and an address
        const user = await insertUser('john_doe', 'john@example.com', 'securepassword123');
        if (user) {
            await insertAddress(user.id, 'New York', 'USA', '123 Main St', '10001');
        }

        // Fetch the user
        await getUser('john@example.com');

        // Update the user's email
        await updateUserEmail('john_doe', 'john_doe@example.com');

        // Delete the user
        await deleteUser('john_doe@example.com');
    } catch (err) {
        console.error('Error:', err);
    }
}

run();
