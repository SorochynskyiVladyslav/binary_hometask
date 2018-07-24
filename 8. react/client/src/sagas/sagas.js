import { all, fork } from 'redux-saga/effects';
import recipesSaga  from './../containers/Recipes/RecipesSaga'

export default function* rootSaga() {
    yield all([
        fork(recipesSaga)
    ]);
}