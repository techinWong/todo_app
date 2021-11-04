import React from 'react';
import AppItems from './AppItems';
import Button from '@mui/material/Button';
import './App.css';


class ControlElement extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            items: [],
            newItem: ''
        }

        this.clear = this.clear.bind(this);
        this.deleteItems= this.deleteItems.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    clear(){
        this.setState({ items: []});
    }


    deleteItems(number,event){
        const filterArray = this.state.items.filter(item => this.state.items.indexOf(item) !== number);
        this.setState({ items:filterArray });
    }

    handleChange(event){
        this.setState({newItem:event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.state.newItem.length > 0){
            this.state.items.unshift(this.state.newItem);
            this.setState({newItem:''})
        }
    }

    render(){
        return(
            <div className="list">
                <form onSubmit={this.handleSubmit} className="todoForm">
                    <input
                        className="newTask"
                        type="text"
                        placeholder="Create new work item"
                        onChange={this.handleChange}
                        value={this.state.newItem}
                    />
                    <br/>
                    <Button className="enter" type="submit" variant="contained">Add</Button>
                </form>
                <AppItems
                    items={this.state.items}
                    deleteItems={this.deleteItems}
                />
                <Button className="clear" onClick={this.clear} variant="outlined">Clear the List</Button>
            </div>
        );
    }
}

export default ControlElement;