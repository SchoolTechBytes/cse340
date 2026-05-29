import db from './db.js';

// const getAllProjects = async () => {
//     const query = `
//         SELECT 
//             p.project_id,
//             p.organization_id,
//             p.title,
//             p.description,
//             p.location,
//             p.project_date,
//             o.name AS organization_name
//         FROM public.projects p
//         JOIN public.organizations o
//             ON p.organization_id = o.organization_id
//         ORDER BY p.project_date ASC, p.title ASC;
//     `;

//     const result = await db.query(query);

//     return result.rows;
// };

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM public.projects
        WHERE organization_id = $1
        ORDER BY project_date;
      `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT
          p.project_id,
          p.title,
          p.description,
          p.project_date,
          p.location,
          p.organization_id,
          o.name AS organization_name
        FROM public.projects p
        JOIN public.organizations o
            ON p.organization_id = o.organization_id
        WHERE p.project_date >= NOW()
        ORDER BY p.project_date ASC
        LIMIT $1
    `;

    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows : [];
};

const getProjectDetails = async (projectId) => {
    const query = `
        SELECT
          p.project_id,
          p.title,
          p.description,
          p.project_date,
          p.location,
          p.organization_id,
          o.name AS organization_name
        FROM public.projects p
        JOIN public.organizations o
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

/**
 * Creates a new service project in the database.
 * @param {string} title - The title of the service project.
 * @param {string} description - A description of the service project.
 * @param {string} location - The location of the service project.
 * @param {string} date - The date of the service project.
 * @param {string} organization_id - The Organization ID for the service project.
 * @returns {string} The id of the newly created service project record.
 */
const createProject = async (title, description, location, date, organization_id) => {
    const query = `
      INSERT INTO public.projects (title, description, location, project_date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id
    `;

    const queryParams = [title, description, location, date, organization_id];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create service project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new service project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
};

const updateProject = async (title, description, location, date, organization_id, projectId) => {
    const query = `
        UPDATE public.projects
        SET title = $1, description = $2, location = $3, project_date = $4, organization_id = $5
        WHERE project_id = $6
        RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organization_id, projectId]
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Project not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated project with ID:', projectId)
    }

    return result.rows[0].project_id;
};

export { getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, createProject, updateProject };