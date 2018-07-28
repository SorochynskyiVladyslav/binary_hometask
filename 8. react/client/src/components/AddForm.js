import React from 'react';
import {Form, Button, Input, Container} from 'semantic-ui-react';


export default class AddForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
            rating: 0
        };
    }

    handleChange(event) {
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
        this.setState({[name]: value});
    }

    handleSubmit(event, value) {
        event.preventDefault();
        this.props.submitHandler(value);
    }

    render () {
        const value = this.state;
        return <Container><Form
            onSubmit={event => this.handleSubmit(event, value)}>
            <Form.Field
                control={Input}
                label='Title'
                placeholder='Recipe Title'
                type='text'
                name='title'
                required
                onChange={this.handleChange.bind(this)}
            />
            <Form.TextArea
                label='Description'
                placeholder='Recipe Description'
                type='text'
                name='description'
                required
                onChange={this.handleChange.bind(this)}
            />
            <Form.Field
                control={Input}
                label='Rating'
                placeholder='Recipe Rating'
                type='number'
                name='rating'
                required
                onChange={this.handleChange.bind(this)}
            />
            <Button
                type='button'
                color='red'
                position='left'
                onClick={this.props.handleCancel}>
                Cancel</Button>
            <Button
                type='submit'
                color='green'
                position='right'>
                Add Recipe</Button>
        </Form></Container>;
    }
}