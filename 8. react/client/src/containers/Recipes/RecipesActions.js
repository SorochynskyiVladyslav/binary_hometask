import * as actions from './RecipesConstants';

export const getAllRecipes = () => ({
    type: actions.GET_ALL_RECIPES
});

export const removeRecipe = id => ({
    type: actions.REMOVE_RECIPE,
    data: id
})

export const addRecipe = (recipe, push) => ({
    type: actions.ADD_RECIPE,
    data: {
        recipe
    },
    push: push
})

export const editRecipe = (recipe, id, push) => ({
    type: actions.EDIT_RECIPE,
    body: recipe,
    id: id,
    push: push
})

export const getRecipeById = id => ({
    type: actions.GET_RECIPE_BY_ID,
    data: id
});