import React from 'react';
import {Card, Icon, Button} from 'semantic-ui-react';

export default class RecipeList extends React.Component {

    handleDelete(event, id){
        event.preventDefault();
        this.props.onDelete(id);
    }

    handleEdit(event, id) {
        event.preventDefault();
        this.props.onEdit(id);
    }

    handleView(event, id) {
        event.preventDefault();
        this.props.onView(id);
    }

    render(){
        return this.props.recipes.map((recipe, index) => (
            <Card fluid key={index}>
                <Card.Content>
                    <Card.Header>{recipe.title}</Card.Header>
                    <Card.Meta><Icon name='star'/> {recipe.rating}</Card.Meta>
                    <Card.Description>{recipe.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button
                        floated='left'
                        icon='eye'
                        onClick={event => this.handleView(event, recipe._id)}
                    />
                    <Button
                        floated='right'
                        icon='edit'
                        color='blue'
                        onClick={event => this.handleEdit(event, recipe._id)}
                    />
                    <Button
                        floated='right'
                        icon='trash'
                        color='red'
                        onClick={event => this.handleDelete(event, recipe._id)}
                    />
                </Card.Content>
            </Card>
        ));
    }
}