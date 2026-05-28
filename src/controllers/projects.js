import { getUpcomingProjects, getProjectDetails, createProject } from '../models/projects.js';
import { getAllOrganizations } from '../models/organizations.js';
import { getCategoriesByProject } from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    //console.log(projects);

    const title = 'Upcoming Service Projects';
    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const categories = await getCategoriesByProject(projectId);

    const title = 'Project Details';
    res.render('project', { title, projectDetails, categories });
};

const showNewProjectForm = async (req, res) => {
    const title = 'Add New Service Project';
    const organizations = await getAllOrganizations();

    res.render('new-project', { title, organizations });
};

const processNewProjectForm = async (req, res) => {
    const { title, description, location, date, organization_id } = req.body;
    const projectId = await createProject(title, description, location, date, organization_id);

    req.flash('success', 'Service Project successfully created!');
    res.redirect('/projects');
};

export { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm };