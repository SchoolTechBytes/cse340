import { body, validationResult } from 'express-validator';
import { getUpcomingProjects, getProjectDetails, createProject, updateProject } from '../models/projects.js';
import { getAllOrganizations } from '../models/organizations.js';
import { getCategoriesByProject } from '../models/categories.js';
import { isUserVolunteering } from '../models/volunteers.js';

const projectValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Title name must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Service Project description is required')
        .isLength({ max: 1000 })
        .withMessage('Service Project description cannot exceed 1000 characters'),
    body('location')
        .trim()
        .notEmpty()
        .withMessage('Service Project location is required')
        .isLength({ max: 200 })
        .withMessage('Service Project location cannot exceed 200 characters'),
    body('date')
        .notEmpty()
        .withMessage('Service Project date is required')
        .isISO8601()
        .withMessage('Date must be a valid date format'),
    body('organization_id')
        .notEmpty()
        .withMessage('Organization is required')
        .isInt()
        .withMessage('Organization must be a valid integer')
];

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    //console.log(projects);

    const title = 'Upcoming Service Projects';
    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const projectDetails = await getProjectDetails(projectId);
        if (!projectDetails) return next();
        const categories = await getCategoriesByProject(projectId);
        let isVolunteering = false;
        if (req.session && req.session.user) {
            isVolunteering = await isUserVolunteering(req.session.user.user_id, projectId);
        }
        const title = 'Project Details';
        res.render('project', { title, projectDetails, categories, isVolunteering });
    } catch (err) {
        next(err);
    }
};

const showNewProjectForm = async (req, res) => {
    const title = 'Add New Service Project';
    const organizations = await getAllOrganizations();

    res.render('new-project', { title, organizations });
};

const processNewProjectForm = async (req, res) => {
    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - Loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new project form
        return res.redirect('/new-project');
    }

    const { title, description, location, date, organization_id } = req.body;
    const projectId = await createProject(title, description, location, date, organization_id);

    req.flash('success', 'Service Project successfully created!');
    res.redirect('/projects');
};

const showEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const organizations = await getAllOrganizations();
    const title = 'Edit Project';
    res.render('edit-project', { title, projectDetails, organizations });
};

const processEditProjectForm = async (req, res) => {
    const projectId = req.params.id;

    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - Loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new organization form
        return res.redirect(`/project/${projectId}`);
    }

    const { title, description, location, date, organization_id } = req.body;
    await updateProject(title, description, location, date, organization_id, projectId);

    req.flash('success', 'Project updated successfully!');
    res.redirect(`/project/${projectId}`);
};

export {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    projectValidation,
    showEditProjectForm,
    processEditProjectForm
};