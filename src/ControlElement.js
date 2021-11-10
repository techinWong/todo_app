import React from 'react';
import AppItems from './AppItems';
import Button from '@mui/material/Button';
import './App.css';


class ControlElement extends React.Component{

    constructor(props){
        super(props);

        let items=[];
        const data = localStorage.getItem("data")
        if(data){
            try {
                items=JSON.parse(data)
            } catch (error) {
                
            }
        }

        this.state = {
            items: items,
            newItem: {}
        }

        this.clear = this.clear.bind(this);
        this.deleteItems= this.deleteItems.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.completeItems = this.completeItems.bind(this);
        this.selectItems = this.selectItems.bind(this);
        this.changeItems = this.changeItems.bind(this);

    }

    clear(){
        this.setState({ items: []});
    }

    selectItems(index){
        let item = this.state.items;
        item[index].select = !item[index].select
        this.setState({items:item })
    }

    completeItems(index) {
        let item = this.state.items;
        item[index].click = !item[index].click
        this.setState({ items: item })
    }

    changeItems(){
        const items = this.state.items;
        const filterArray = this.state.items.filter(item => item.select === true);
        if(filterArray.length === 2){
                var k=1
                    items.forEach((item,i) => {
                        if(item.select === true){
                            items[i] = filterArray[k]
                            k--
                            item.select = false
                        }
                    })
                this.setState({items:items})
        }
        else{
            alert('Please Select Only 2 Options')
            items.forEach(item => {
                item.select = false
            })
            this.setState({items:items})
        }
    }

    deleteItems(number,event){
        const filterArray = this.state.items.filter(item => this.state.items.indexOf(item) !== number);
        this.setState({ items:filterArray });
    }

    handleChange(event){
        this.setState({newItem:{title:event.target.value , click:false , select:false}});
    }

    handleSubmit(event){
        event.preventDefault();
         if(this.state.newItem.title === (undefined) || this.state.newItem.title === ('')){
            alert('Please Enter The Task')
         }
         else{
             
            this.state.items.unshift(this.state.newItem);
            this.setState({newItem:{title:''}})
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
                        value={this.state.newItem.title}
                    />
                    <br/>
                    <Button className="enter" type="submit" variant="contained">Add</Button>
                </form>
                <AppItems
                    items={this.state.items}
                    deleteItems={this.deleteItems}
                    completeItems={this.completeItems}
                    selectItems={this.selectItems}
                />
                <Button className="clear" onClick={this.clear} variant="outlined">Clear the List</Button>
                <Button className="change" variant="contained" onClick={this.changeItems}>Change</Button>
            </div>
        );
    }
}

export default ControlElement;