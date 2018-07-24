import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { addRecipe } from './RecipesActions';
import { isRecipesFetching } from './RecipesReducer';
import AddForm from '../../components/AddForm';


class RecipesAdd extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isFetching: false
        }
    }

    handleAdd(data){
        this.props.actions.addRecipe(data, this.props.history.push);
    }

    handleCancel(){
        this.props.history.push('/recipes');
    }

    render(){
        return <Container>
            <AddForm handleCancel={this.handleCancel.bind(this)} submitHandler={this.handleAdd.bind(this)}/>
        </Container>
    }
}

RecipesAdd.propTypes = {
    actions: PropTypes.object
}

const mapStateToProps = state => ({
    isFetching: isRecipesFetching(state)
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ addRecipe }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipesAdd);