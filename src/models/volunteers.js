import db from './db.js';

const addVolunteer = async (userId, projectId) => {
    const result = await db.query(
        `INSERT INTO volunteers (user_id, project_id) VALUES ($1, $2)
         ON CONFLICT (user_id, project_id) DO NOTHING RETURNING volunteer_id`,
        [userId, projectId]
    );
    return result.rows.length > 0 ? result.rows[0].volunteer_id : null;
};

const removeVolunteer = async (userId, projectId) => {
    const result = await db.query(
        `DELETE FROM volunteers WHERE user_id = $1 AND project_id = $2 RETURNING volunteer_id`,
        [userId, projectId]
    );
    return result.rows.length > 0;
};

const isUserVolunteering = async (userId, projectId) => {
    const result = await db.query(
        `SELECT 1 FROM volunteers WHERE user_id = $1 AND project_id = $2`,
        [userId, projectId]
    );
    return result.rows.length > 0;
};

const getVolunteerProjectsByUserId = async (userId) => {
    const result = await db.query(
        `SELECT p.project_id, p.title, p.description, p.location, p.project_date,
                o.name AS organization_name, o.organization_id
         FROM volunteers v
         JOIN projects p ON v.project_id = p.project_id
         JOIN organizations o ON p.organization_id = o.organization_id
         WHERE v.user_id = $1
         ORDER BY p.project_date ASC`,
        [userId]
    );
    return result.rows;
};

export { addVolunteer, removeVolunteer, isUserVolunteering, getVolunteerProjectsByUserId };
