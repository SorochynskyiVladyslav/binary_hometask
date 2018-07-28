import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Loader, Dimmer, Form, Input, Container } from 'semantic-ui-react';
import { getRecipeById, editRecipe } from './RecipesActions';
import { activeRecipe, isRecipesFetching } from './RecipesReducer';

class RecipeEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = { changed: null };
    }

    componentDidMount() {
        this.props.actions.getRecipeById(this.props.match.params.id);

    }

    handleSubmit(event, value) {
        event.preventDefault();
        let body = {};
        if (value.title) body.title = value.title;
        if (value.description) body.description = value.description;
        if (value.rating) body.rating = value.rating;
        this.props.actions.editRecipe(value, this.props.activeRecipe._id, this.props.history.push);
    }

    handleChange(event){
        let name = event.target.name;
        if (name === 'rating') {
            if (event.target.value < 0) {
                event.target.value = 0;
            }
            if (event.target.value > 5) {
                event.target.value = 5;
            }
        }
        let value = event.target.value;
        this.setState({[name]: value, changed: true});
    }

    handleCancel() {
        this.props.history.push('/recipes');
    }

    render(){
        const activeRecipe = this.props.activeRecipe;
        const isFetching = this.props.isFetching;
        let value;
        if (!this.state.changed && activeRecipe) {
            value = activeRecipe;
        }
        else {
            value = this.state;
        }
        return <Container><Form
            onSubmit={event => this.handleSubmit(event, value)}>
            <Dimmer active={isFetching}><Loader />
            </Dimmer>
            { value && <React.Fragment><Form.Field
                control={Input}
                label='Title'
                placeholder='Recipe Title'
                type='text'
                name='title'
                value={value.title}
                required
                onChange={this.handleChange.bind(this)}
            />
            <Form.TextArea
                label='Description'
                placeholder='Recipe Description'
                type='text'
                name='description'
                value={value.description}
                required
                onChange={this.handleChange.bind(this)}
            />
            <Form.Field
                control={Input}
                label='Rating'
                placeholder='Recipe Rating'
                type='number'
                name='rating'
                value={value.rating}
                required
                onChange={this.handleChange.bind(this)}
            />
            <Button
                type='button'
                color='red'
                position='left'
                onClick={this.handleCancel.bind(this)}>
                Cancel</Button>
            <Button
                type='submit'
                color='green'
                position='right'>
                Save</Button></React.Fragment>}
        </Form></Container>;
    }
}

RecipeEdit.propTypes = {
    activeRecipe: PropTypes.object,
    isFetching: PropTypes.bool,
    actions: PropTypes.object
}

const mapStateToProps = state => ({
    activeRecipe: activeRecipe(state),
    isFetching: isRecipesFetching(state)
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ getRecipeById, editRecipe }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEdit);