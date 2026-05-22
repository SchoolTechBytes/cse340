import { getAllCategories, getCategoryDetails, getProjectsByCategory } from '../models/categories.js';

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();

    const title = 'Service Project Categories';
    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryDetails(categoryId);
    const projects = await getProjectsByCategory(categoryId);
    const title = 'Category Details';

    res.render('category', { title, categoryDetails, projects });
};

export { showCategoriesPage, showCategoryDetailsPage };