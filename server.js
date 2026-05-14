import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
 * Configure Express middleware
 */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));


/**
  * Routes
  */
app.get('/', async (req, res) => {
    const title = 'Home';
    const description = 'Welcome to our community service platform.';
    res.render('home', { title, description });
});

app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();
    console.log(organizations);

    const title = 'Our Partner Organizations';
    const description = 'Browse our partner organizations and learn how they support the community.';
    res.render('organizations', { title, description, organizations });
});

app.get('/projects', async (req, res) => {
    const projects = await getAllProjects();
    console.log(projects);

    const title = 'Service Projects';
    const description = 'Explore service projects available for volunteers in your area.';
    res.render('projects', { title, description, projects });
});

app.get('/categories', async (req, res) => {
    const title = 'Service Project Categories';
    const description = 'Browse service project categories to find opportunities that match your interests.';
    res.render('categories', { title, description });
});


app.listen(PORT, async () => {
    try {
        await testConnection();
        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }
});