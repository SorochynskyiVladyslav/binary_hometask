import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Header, Dimmer, Loader } from 'semantic-ui-react';
import { getAllRecipes, removeRecipe  } from './RecipesActions';
import { allRecipes, isRecipesFetching } from './RecipesReducer';
import RecipeList from '../../components/RecipeList';
import ToolsPanel from '../../components/ToolsPanel';

class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foundRecipes: [],
            sortType: ''
        };
    }

    componentDidMount() {
        this.props.actions.getAllRecipes();

    }

    handleAdd() {
        this.props.history.push('/recipes/add');
    }

    handleSearch(value) {
        if (value === '') {
            this.setState({ foundRecipes: [] });
        }
        else {
            this.setState({
                foundRecipes: this.props.allRecipes.filter(
                    recipe => recipe.title.toLowerCase().includes(value.toLowerCase()))});
        }
    }

    handleSort(sortType) {
        this.setState({ sortType: sortType });
    }

    handleView(id) {
        this.props.history.push(`/recipes/${id}`);
    }

    handleEdit(id) {
        this.props.history.push(`/recipes/edit/${id}`);
    }

    handleDelete(id) {
        this.props.actions.removeRecipe(id);
    }

    render() {
        const allRecipes = this.props.allRecipes;
        const foundRecipes = this.state.foundRecipes;
        const isFetching = this.props.isFetching;

        let displayRecipes = foundRecipes.length ? foundRecipes : allRecipes;

        if (this.state.sortType == 'rating down') displayRecipes = displayRecipes.sort((a, b) => {
            if (a.rating > b.rating) return -1;
            if (b.rating > a.rating) return 1;
            return 0;
        })
        if (this.state.sortType == 'rating up') displayRecipes = displayRecipes.sort((a, b) => {
            if (a.rating < b.rating) return -1;
            if (b.rating < a.rating) return 1;
            return 0;
        })

        return (
            <React.Fragment>
            <Container>
                <ToolsPanel
                onAdd={this.handleAdd.bind(this)}
                onSearch={this.handleSearch.bind(this)}
                onSort={this.handleSort.bind(this)}
            />
            </Container>
            <Container>
                <Dimmer active={isFetching}><Loader />
                </Dimmer>
                {   displayRecipes.length  ?
                    <RecipeList
                        recipes={displayRecipes}
                        onView={this.handleView.bind(this)}
                        onDelete={this.handleDelete.bind(this)}
                        onEdit={this.handleEdit.bind(this)}
                    /> : <React.Fragment>
                        <Header as='h2' textAlign='center'>
                            No Recipes
                        </Header>
                    </React.Fragment>
                }
            </Container>
            </React.Fragment>
        )
    }


}

Recipes.propTypes = {
    allRecipes: PropTypes.array,
    isFetching: PropTypes.bool,
    actions: PropTypes.object
}

const mapStateToProps = state => ({
    allRecipes: allRecipes(state),
    isFetching: isRecipesFetching(state)
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ getAllRecipes, removeRecipe }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);