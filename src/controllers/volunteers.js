import { addVolunteer, removeVolunteer } from '../models/volunteers.js';

const processVolunteer = async (req, res) => {
    try {
        const projectId = parseInt(req.params.id);
        await addVolunteer(req.session.user.user_id, projectId);
        req.flash('success', 'You have signed up to volunteer!');
    } catch (err) {
        req.flash('error', 'Something went wrong. Please try again.');
    }
    res.redirect(`/project/${req.params.id}`);
};

const processUnvolunteer = async (req, res) => {
    try {
        const projectId = parseInt(req.params.id);
        await removeVolunteer(req.session.user.user_id, projectId);
        req.flash('success', 'You have been removed from this project.');
    } catch (err) {
        req.flash('error', 'Something went wrong. Please try again.');
    }
    res.redirect(`/project/${req.params.id}`);
};

export { processVolunteer, processUnvolunteer };
