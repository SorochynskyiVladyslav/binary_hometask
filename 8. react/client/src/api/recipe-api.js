import api from './common-api';

export default {
    getAllRecipes: () => {
        return api.sendRequest('/api/recipe/', 'get');
    },

    addRecipe: recipe => {
        return api.sendRequest('/api/recipe', 'post', recipe);
    },

    removeRecipe: id => {
        return api.sendRequest(`/api/recipe/${id}`, 'delete');
    },

    getRecipeById: id => {
        return api.sendRequest(`/api/recipe/${id}`, 'get');
    },

    editRecipe: (id, body) => {
        return api.sendRequest(`/api/recipe/${id}`, 'patch', body);
    }
};