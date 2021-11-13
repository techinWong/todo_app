import React from 'react';
import AppItems from './AppItems';
import Button from '@mui/material/Button';
import './App.css';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';



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
            newItem: {},
            edit:false,
            editIndex:'',
            editItem:'',
            dateValue:null
        }

        this.clear = this.clear.bind(this);
        this.deleteItems= this.deleteItems.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.completeItems = this.completeItems.bind(this);
        this.selectItems = this.selectItems.bind(this);
        this.changeItems = this.changeItems.bind(this);
        this.setEdit = this.setEdit.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.editDate = this.editDate.bind(this);
    }

    editDate = (index,date) => {
        const item = this.state.items
        item[index].date = date
        this.setState({items:item})
    }

    handleDateChange = (date) => {
        this.setState({
            dateValue:date
        })
    }

    handleEditItem(e){
        this.setState({editItem:e.target.value})
    }

    updateItem(index){
        const item=this.state.items
        item[index].title = this.state.editItem
        this.setState({items:item , edit:false}) 
    }

    clear(){
        this.setState({ items: []});
    }

    cancelEdit(){
        this.setState({edit:false})
    }

    setEdit(index){
        this.setState({edit:true , editIndex:index ,editItem:this.state.items[index].title})
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
        this.setState({newItem:{title:event.target.value , click:false , select:false, date:null}});
    }

    handleSubmit(event){
        event.preventDefault();
         if((this.state.newItem.title === (undefined) || this.state.newItem.title === ('')) || (this.state.dateValue === null)){
            alert('Please Complete The Task And Date')
         }
         else{
            const newItem = this.state.newItem
            newItem.date = this.state.dateValue
            this.setState({newItem:newItem , dateValue:null })
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

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="SELECT DATE"
                                value={this.state.dateValue}
                                onChange={this.handleDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                    <br/>
                    <Button className="enter" type="submit" variant="contained">Add</Button>
                </form>
                <AppItems
                    items={this.state.items}
                    deleteItems={this.deleteItems}
                    completeItems={this.completeItems}
                    selectItems={this.selectItems}
                    setEdit={this.setEdit}
                    edit={this.state.edit}
                    editIndex={this.state.editIndex}
                    handleEditItem={this.handleEditItem}
                    updateItem={this.updateItem}
                    cancelEdit={this.cancelEdit}
                    handleDateChange={this.handleDateChange}
                    editDate={this.editDate}
                />
                <Button className="clear" onClick={this.clear} variant="outlined">Clear the List</Button>
                <Button className="change" variant="contained" onClick={this.changeItems}>Change</Button>
            </div>
        );
    }
}

export default ControlElement;