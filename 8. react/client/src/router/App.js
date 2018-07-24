import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import createStore from '../store/store';
import Recipes from '../containers/Recipes/Recipes';
import Recipe from '../containers/Recipes/Recipe';
import RecipesAdd from '../containers/Recipes/RecipesAdd';
import RecipeEdit from '../containers/Recipes/RecipeEdit';

const store = createStore();

class App extends Component {
    render(){
        return (
            <Provider store={store}>
                <ConnectedRouter history={createHistory()}>
                    <Switch>
                        <Route path='/' exact render={() => <Redirect to='/recipes' />}/>
                        <Route path='/recipes' exact component={Recipes}/>
                        <Route path='/recipes/edit/:id' component={RecipeEdit}/>
                        <Route path='/recipes/add' exact component={RecipesAdd}/>
                        <Route path='/recipes/:id' component={Recipe}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;