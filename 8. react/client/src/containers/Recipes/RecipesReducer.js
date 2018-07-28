import * as actions from './RecipesConstants';
import { combineReducers } from 'redux';

const initialState = {
    all: [],
    active: null,
    isFetching: false
};

const all = (state = initialState.all, action) => {
    switch (action.type) {
        case actions.GET_ALL_RECIPES_SUCCESS:
            return action.data;
        case actions.REMOVE_RECIPE_SUCCESS:
            return state.filter( element => element._id !== action.data);
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
    isFetching
});

export const allRecipes = ({ recipes }) => recipes.all;
export const activeRecipe = ({ recipes }) => recipes.active;

export const isRecipesFetching = ({ recipes }) => recipes.isFetching;
