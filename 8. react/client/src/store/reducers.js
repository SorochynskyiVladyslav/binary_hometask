import { combineReducers } from 'redux';
import recipesReducer from './../containers/Recipes/RecipesReducer';

export default combineReducers({
    recipes: recipesReducer
})