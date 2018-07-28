import React from 'react';
import {Menu, Icon, Input} from 'semantic-ui-react';

export default class ToolsPanel extends React.Component {

    handleChange(event) {
        this.props.onSearch(event.target.value);
    }

    handleSort(sortType) {
        this.props.onSort(sortType);
    }

    render() {
        return <Menu>
            <Menu.Item onClick={this.props.onAdd}>
                <Icon name='add'/>
                Add Recipe
            </Menu.Item>
            <Menu.Item onClick={() => this.handleSort('rating down')}>
                Top rating first:
                <Icon name='sort amount down'/>
            </Menu.Item>
            <Menu.Item onClick={() => this.handleSort('rating up')}>
                Top rating last:
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