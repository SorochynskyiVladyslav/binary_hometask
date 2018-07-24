import * as actions from './RecipesConstants';
import { combineReducers } from 'redux';

const initialState = {
    all: [],
    active: null,
    searchQuery: '',
    sortRating: null,
    isFetching: false
};

const all = (state = initialState.all, action) => {
    switch (action.type) {
        case actions.GET_ALL_RECIPES_SUCCESS:
            return action.data;
        case actions.REMOVE_RECIPE_SUCCESS:
            return state.filter( element => element._id != action.data);
        default:
            return state;
    }
}

const active = (state = initialState.active, action) => {
    switch (action.type) {
        case actions.GET_RECIPE_BY_ID_SUCCESS:
            return action.data;
        case actions.GET_RECIPE_BY_ID:
        case actions.GET_ALL_RECIPES:
        case actions.ADD_RECIPE:
        case actions.REMOVE_RECIPE:
            return null;
        default:
            return null;
    }
}

const searchQuery = (state = initialState.searchQuery, action) => {
    switch (action.type) {
        case actions.GET_ALL_RECIPES:
        case actions.ADD_RECIPE:
            return '';
        default:
            return '';
    }
}

const sortRating = (state = initialState.sortRating, action) => {
    switch (action.type) {
        case actions.GET_ALL_RECIPES:
        case actions.ADD_RECIPE:
            return null;
        default:
            return null;
    }
}

const isFetching = (state = initialState.isFetching, action) => {
    switch (action.type) {
        case actions.GET_ALL_RECIPES:
        case actions.ADD_RECIPE:
        case actions.REMOVE_RECIPE:
        case actions.GET_RECIPE_BY_ID:
        case actions.EDIT_RECIPE:
            return true;
        case actions.GET_ALL_RECIPES_SUCCESS:
        case actions.ADD_RECIPE_SUCCESS:
        case actions.REMOVE_RECIPE_SUCCESS:
        case actions.GET_RECIPE_BY_ID_SUCCESS:
        case actions.EDIT_RECIPE_SUCCESS:
        default:
            return false;
    }
}

export default combineReducers({
    all,
    active,
    searchQuery,
    sortRating,
    isFetching
});

export const allRecipes = ({ recipes }) => recipes.all;
export const activeRecipe = ({ recipes }) => recipes.active;
export const recipeById = id => ({ recipes }) => {
    for (let i=0; i < recipes.all.length; i++) {
        if (recipes[i]._id === id) return recipes[i];
    }
    return null;
}
export const sortedRecipes = sort => ({ recipes }) => {
    if (sort === true)
        recipes.all.sort((a, b) => {
            if (a.rating > b.rating) return -1;
            if (a.rating < b.rating) return 1;
            return 0;
        })
    if (sort === false)
        recipes.all.sort((a, b) => {
            if (a.rating > b.rating) return 1;
            if (a.rating < b.rating) return -1;
            return 0;
        })
    return recipes;
}
export const foundRecipes = searchQuery => ({ recipes }) => {
    const query = searchQuery.toLowerCase();
    let resultRecipes = [];
    for (let i=0; i<recipes.all.length; i++) {
        if (recipes.all[i].title.toLowerCase().includes(query))
            resultRecipes.push(recipes.all[i]);
    }
    return resultRecipes;
}
export const isRecipesFetching = ({ recipes }) => recipes.isFetching;
