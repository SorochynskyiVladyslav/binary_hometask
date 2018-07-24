import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Header, Dimmer, Loader } from 'semantic-ui-react';
import { getAllRecipes, removeRecipe } from './RecipesActions';
import { allRecipes, isRecipesFetching } from './RecipesReducer';
import RecipeList from '../../components/RecipeList';
import ToolsPanel from '../../components/ToolsPanel';

class Recipes extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.getAllRecipes();
    }

    handleAdd() {
        this.props.history.push('/recipes/add');
    }

    handleSearch(value) {
        if (value === '') this.props.actions.getAllRecipes();
    }

    handleSort() {

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
        const isFetching = this.props.isFetching;

        return (
            <Container>
                <ToolsPanel
                    onAdd={this.handleAdd.bind(this)}
                    onSearch={this.handleSearch.bind(this)}
                    onSort={this.handleSort.bind(this)}
                />
                <React.Fragment>
                    <Dimmer active={isFetching}><Loader />
                    </Dimmer>
                    {allRecipes.length ?
                        <RecipeList
                            recipes={allRecipes}
                            onView={this.handleView.bind(this)}
                            onDelete={this.handleDelete.bind(this)}
                            onEdit={this.handleEdit.bind(this)}
                        /> : <React.Fragment>
                            <Header as='h2' textAlign='center'>
                                No Recipes
                            </Header>
                        </React.Fragment>
                    }
                </React.Fragment>
            </Container>

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