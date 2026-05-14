-- Remove tables if they already exist FOR DEV USE ONLY!!!!!!!!
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;

CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_projects_organization
        FOREIGN KEY (organization_id)
        REFERENCES organizations (organization_id)
        ON DELETE CASCADE -- This is incase an organization is removed then all the projects are removed for that org. Keeps things clean.
);

INSERT INTO organizations (name, description, contact_email, logo_filename)
VALUES
    (
        'BrightFuture Builders',
        'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
        'info@brightfuturebuilders.org',
        'brightfuture-logo.png'
    ),
    (
        'GreenHarvest Growers',
        'An urban farming collective promoting food sustainability and education in local neighborhoods.',
        'contact@greenharvest.org',
        'greenharvest-logo.png'
    ),
    (
        'UnityServe Volunteers',
        'A volunteer coordination group supporting local charities and service initiatives.',
        'hello@unityserve.org',
        'unityserve-logo.png'
    );

INSERT INTO projects (organization_id, title, description, location, project_date)
VALUES
    (
        1,
        'Community Recreation Center',
        'Construction of a new recreation center for underserved families.',
        'Dallas, TX',
        '2026-06-15'
    ),
    (
        1,
        'Affordable Housing Initiative',
        'Development of affordable housing units for low-income residents.',
        'Fort Worth, TX',
        '2026-07-01'
    ),
    (
        1,
        'School Renovation Project',
        'Renovating aging classrooms and improving accessibility.',
        'Plano, TX',
        '2026-08-10'
    ),
    (
        1,
        'Neighborhood Park Expansion',
        'Expanding green spaces and playground facilities.',
        'Garland, TX',
        '2026-09-05'
    ),
    (
        1,
        'Emergency Shelter Build',
        'Constructing temporary shelters for displaced families.',
        'Irving, TX',
        '2026-10-20'
    ),

    -- GreenHarvest Growers Projects
    (
        2,
        'Urban Garden Network',
        'Building community gardens across multiple neighborhoods.',
        'Austin, TX',
        '2026-06-22'
    ),
    (
        2,
        'Hydroponic Training Center',
        'Educational center for sustainable hydroponic farming.',
        'Houston, TX',
        '2026-07-18'
    ),
    (
        2,
        'Youth Agriculture Workshops',
        'Hands-on farming education for local students.',
        'San Antonio, TX',
        '2026-08-12'
    ),
    (
        2,
        'Rooftop Farming Expansion',
        'Installing rooftop farming systems in urban buildings.',
        'Dallas, TX',
        '2026-09-15'
    ),
    (
        2,
        'Community Compost Program',
        'Launching a citywide composting initiative.',
        'Arlington, TX',
        '2026-10-08'
    ),

    -- UnityServe Volunteers Projects
    (
        3,
        'Food Drive Coordination',
        'Organizing volunteers for regional food distribution.',
        'Mesquite, TX',
        '2026-06-30'
    ),
    (
        3,
        'Senior Support Outreach',
        'Providing volunteer assistance for elderly residents.',
        'Richardson, TX',
        '2026-07-25'
    ),
    (
        3,
        'Disaster Relief Preparation',
        'Training volunteers for emergency response situations.',
        'McKinney, TX',
        '2026-08-28'
    ),
    (
        3,
        'Back-to-School Supply Event',
        'Distributing school supplies to children in need.',
        'Frisco, TX',
        '2026-09-10'
    ),
    (
        3,
        'Holiday Volunteer Campaign',
        'Coordinating seasonal volunteer opportunities.',
        'Denton, TX',
        '2026-11-20'
    );