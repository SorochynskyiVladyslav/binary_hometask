import { takeLatest, all, call, put } from 'redux-saga/effects';
import * as actions from './RecipesConstants';
import recipeApi from './../../api/recipe-api';

function* getAllRecipes() {
    try {
        const recipes = yield call(recipeApi.getAllRecipes);
        yield put({
            type: actions.GET_ALL_RECIPES_SUCCESS,
            data: recipes.data
        });
    } catch (err) {
        yield put({
            type: actions.GET_ALL_RECIPES_ERR
        });
    }
}

function* addRecipe(action) {
    try {
        const addResponse = yield call(recipeApi.addRecipe, action.data);
        yield put({
            type: actions.ADD_RECIPE_SUCCESS,
            data: {
                ...addResponse.data
            }
        });
        yield put(action.push('/recipes'));
    } catch (err) {
        yield put ({
            type: actions.ADD_RECIPE_ERR
        })
    }
}

function* removeRecipe(action){
    try {
        yield call(recipeApi.removeRecipe, action.data);
        yield put({
            type: actions.REMOVE_RECIPE_SUCCESS,
            data: action.data
        });

    } catch(err){
        yield put({
            type: actions.REMOVE_RECIPE_ERR
        })
    }
}

function* getRecipeById(action) {
    try {
        const response = yield call(recipeApi.getRecipeById, action.data);
        yield put({
            type: actions.GET_RECIPE_BY_ID_SUCCESS,
            data: response.data
        });
    } catch(err) {
        yield put({
            type: actions.GET_RECIPE_BY_ID_ERR
        })
    }

}

function* editRecipe(action) {
    try {
        const response = yield call(recipeApi.editRecipe, action.id, action.body);
        const recipe = response.data;
        yield put({
            type: actions.EDIT_RECIPE_SUCCESS,
            data: recipe
        })
        yield put(action.push('/recipes'));
    } catch(err) {
        yield put({
            type: actions.EDIT_RECIPE_ERR
        })
    }
}

export default function* recipesSaga() {
    yield all([
        takeLatest(actions.GET_ALL_RECIPES, getAllRecipes),
        takeLatest(actions.ADD_RECIPE, addRecipe),
        takeLatest(actions.REMOVE_RECIPE, removeRecipe),
        takeLatest(actions.GET_RECIPE_BY_ID, getRecipeById),
        takeLatest(actions.EDIT_RECIPE, editRecipe)
    ]);
}