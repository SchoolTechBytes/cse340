import db from './db.js';

/**
 * Creates a new user in the database.
 * @param {string} name - The name of the user.
 * @param {string} email - The users email and login username.
 * @param {string} password_hash - This is the password hash.
 */
const createUser = async (name, email, password_hash) => {
    const default_role = 'user';
    const query = `
        INSERT INTO users (name, email, password_hash, role_id)
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4))
        RETURNING user_id
    `;

    const queryParams = [name, email, password_hash, default_role];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create new user.');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

export { createUser };