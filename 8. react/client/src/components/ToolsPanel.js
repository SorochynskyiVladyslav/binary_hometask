import React from 'react';
import {Menu, Icon, Input} from 'semantic-ui-react';

export default class ToolsPanel extends React.Component {

    handleChange(event){
        this.props.onSearch(event.target.value);
    }

    render() {
        return <Menu>
            <Menu.Item onClick={this.props.onAdd}>
                <Icon name='add'/>
                Add Recipe
            </Menu.Item>
            <Menu.Item onClick={this.props.onSort(true)}>
                Sort by rating:
                <Icon name='sort amount down'/>
            </Menu.Item>
            <Menu.Item onClick={this.props.onSort(false)}>
                <Icon name='sort amount up'/>
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Input
                        icon='search'
                        placeholder='Search...'
                        onChange={event => this.handleChange(event)}
                    />
                </Menu.Item>
            </Menu.Menu>
        </Menu>;
    }
}