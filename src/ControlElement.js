import React from 'react';
import AppItems from './AppItems';
import Button from '@mui/material/Button';
import './App.css';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';



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
            editId: '',
            dateValue:null,
            dateValueString: '',
            menuValue: null,
            sortValue: '',
            filterCheck: false,
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
        this.sortChange = this.sortChange.bind(this);
        this.filterCheck = this.filterCheck.bind(this);
        this.byDateFromLarge = this.byDateFromLarge.bind(this);
        this.byDateFromLess = this.byDateFromLess.bind(this);


    }

    byDateFromLess(a, b) {
        return new Date(a.date).valueOf() - new Date(b.date).valueOf();
    }
    byDateFromLarge(a, b) {
        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
    }
    filterCheck = (e) => {
        this.setState({ filterCheck: e.target.checked })
    }
    sortChange(e) {
        this.setState({ sortValue: e.target.value})
    }
    editDate = (date) => {
        this.setState({editDateValue: date})
    }

    handleDateChange = (date) => {
        this.setState({
            dateValue:date,
            dateValueString: moment(date).format('DD-MM-YYYY')
        })
    }

    handleEditItem(e){
        this.setState({editItem:e.target.value})
    }

    updateItem = (id) => {
        const item = this.state.items
        const index = item.findIndex(item => item.id === id)
        item[index].title = this.state.editItem
        item[index].date = this.state.editDateValue
        const dateValue = moment(this.state.editDateValue).format('DD-MM-YYYY')
        item[index].dateValueString = dateValue
        this.setState({ items: item, edit: false})
    }

    clear(){
        this.setState({ items: [], filterCheck: false});
    }

    cancelEdit(){
        this.setState({edit:false})
    }

    setEdit(id,item){
        this.setState({edit:true , editId:id ,editItem:item.title, editDateValue:item.date})
    }

    selectItems(id){ //set select of item that have been clicked    from false --> true
        let item = this.state.items;
        const filterArray = item.filter(item => item.id === id)
        const index = item.findIndex(item => item === filterArray[0])
        item[index].select = !item[index].select
        this.setState({ items: item })
    }

    completeItems(id) {  //set click of item that have been done     from false --> true
        let item = this.state.items;
        const filterArray = item.filter(item=>item.id===id)
        const index = item.findIndex(item => item === filterArray[0])
        item[index].click = !item[index].click
        this.setState({ items: item })
    }

    changeItems(){ //ChangeItems by filterArray
        var items = this.state.items;
        const filterArray = items.filter(item => item.select) //filter item that item.select is true
        console.log(filterArray)
        if(filterArray.length === 2){
            let index0 = items.findIndex(item => item.id === filterArray[0].id) 
            let index1 = items.findIndex(item => item.id === filterArray[1].id)
            
            items[index0] = filterArray[1] 
            items[index1] = filterArray[0]
            items[index0].select = false
            items[index1].select = false
            
            this.setState({items:items })
        }else{
            alert('Please Select 2 Tasks')
            items.forEach(item => {
                item.select = false
            })
            this.setState({items:items})
        }
    }

    deleteItems(id){
        this.setState({  items: this.state.items.filter(item => item.id !== id) })

    }

    handleChange(event){
        this.setState({newItem:{title:event.target.value , click:false , select:false, date:null, dateValueString: '', id: Math.random()*1000}});
    }

    handleSubmit(event){
        event.preventDefault();
        if ((this.state.newItem.title === undefined || this.state.newItem.title === '')) {
            alert('Please Complete The Task')
        }
        else { //Unshift newItem to item
            const newItem = this.state.newItem
            const item = this.state.items
            newItem.date = this.state.dateValue
            newItem.dateValueString = this.state.dateValueString
            this.setState({  newItem: newItem,dateValue: null, dateValueString: '' })
            item.unshift(newItem)
            this.setState({ newItem: { title: '' } , items:item} )
        }
    }

    render(){
        return (
            <Box className="list">
                <form onSubmit={this.handleSubmit} className="todoForm">
                    <input
                        style={{padding:"0px 50px 0px 50px"}}
                        className="newTask"
                        type="text"
                        placeholder="Add Your Task"
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
                    <Button className="enter" type="submit" variant="contained">Add</Button>
                    <br />
                    <div className="CheckboxForm">
                    <label style={{fontSize : "10px" , textAlign:"right" , color:"black"}}>filter by date</label>
                    <Checkbox
                        checked={this.state.filterCheck}
                        onClick={this.filterCheck}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    </div>
                    <Box sx={{ minWidth: 120 , marginLeft: "10px" }}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Sorted
                            </InputLabel>
                            <NativeSelect
                                onChange={this.sortChange}
                                defaultValue={0}
                                inputProps={{
                                    name: 'typeOfSorted',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                <option value={0}>NONE</option>
                                <option value={10}>เร็วไปช้า</option>
                                <option value={20}>ช้าไปเร็ว</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                    
                </form>
                <AppItems
                    items={this.state.items}
                    deleteItems={this.deleteItems}
                    completeItems={this.completeItems}
                    selectItems={this.selectItems}
                    setEdit={this.setEdit}
                    edit={this.state.edit}
                    editId={this.state.editId}
                    editItem={this.state.editItem}
                    editIndex={this.state.editIndex}
                    editDateValue={this.state.editDateValue}
                    handleEditItem={this.handleEditItem}
                    updateItem={this.updateItem}
                    cancelEdit={this.cancelEdit}
                    handleDateChange={this.handleDateChange}
                    editDate={this.editDate}
                    sortValue={this.state.sortValue}
                    filterCheck={this.state.filterCheck}
                    byDateFromLarge={this.byDateFromLarge}
                    byDateFromLess={this.byDateFromLess}
                />
                <br/>
                <Button style={{color:"white" , border:"1px solid white"}} className="clear" onClick={this.clear} variant="outlined" >Clear the List</Button>
                <Button style={{marginLeft : "10px"}}className="change" variant="contained" onClick={this.changeItems} disabled={this.state.sortValue === '10' || this.state.sortValue === '20' ? true : false}>SWAP</Button>
            </Box>
        );
    }
}

export default ControlElement;