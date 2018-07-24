import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Container, Card, Dimmer, Loader, Icon } from 'semantic-ui-react';
import { getRecipeById, removeRecipe } from './RecipesActions';
import { activeRecipe, isRecipesFetching } from './RecipesReducer';

class Recipe extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.getRecipeById(this.props.match.params.id);
    }

    handleBack() {
        this.props.history.push('/recipes');
    }

    render(){
        const activeRecipe = this.props.activeRecipe;
        const isFetching = this.props.isFetching;

        return <Container>
            <Card fluid>
                <Dimmer active={isFetching}><Loader />
                </Dimmer>
                { activeRecipe && <React.Fragment><Card.Content>
                    <Card.Header>{activeRecipe.title}</Card.Header>
                    <Card.Meta><Icon name='star'/> {activeRecipe.rating}</Card.Meta>
                    <Card.Description>{activeRecipe.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button
                        floated='left'
                        icon='arrow alternate circle left'
                        onClick={this.handleBack.bind(this)}
                    />
                </Card.Content></React.Fragment>}
            </Card>
        </Container>
    }
}

Recipe.propTypes = {
    activeRecipe: PropTypes.object,
    isFetching: PropTypes.bool,
    actions: PropTypes.object
}

const mapStateToProps = state => ({
    activeRecipe: activeRecipe(state),
    isFetching: isRecipesFetching(state)
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ getRecipeById, removeRecipe }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);