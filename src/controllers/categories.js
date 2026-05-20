import { getAllCategories } from '../models/categories.js';

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    //console.log(categories);

    const title = 'Service Project Categories';
    const description = 'Browse service project categories to find opportunities that match your interests.';
    res.render('categories', { title, description, categories });
};

export { showCategoriesPage };