import React from 'react';
import Button from '@mui/material/Button';
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
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form'

import './App.css';
import AppItems from './AppItems';



const schema = yup.object({
    task: yup.string().required(),
  }).required();

const ControlElement = () => {

        let item=[];
        const data = localStorage.getItem("data")
        if(data){
            try {
                item=JSON.parse(data)
            } catch (error) {
                
            }
        }
       const { register, handleSubmit, formState:{ errors } } = useForm({
            resolver: yupResolver(schema)
          });   
       const [items,setItems] = useState(item);
       const [newItem,setNewItem] = useState({});
       const [edit,setEdit] = useState(false);
       const [editItem,setEditItem] = useState({});
       const [dateValue,setDateValue] = useState(null);
       const [dateValueString,setDateValueString] = useState('');
       const [sortValue,setSortValue] = useState('');
       const [filterCheck,setFilterCheck] = useState(false);

        
    const byDateFromLess = (a, b) => {
        return new Date(a.date).valueOf() - new Date(b.date).valueOf();
    }
    const byDateFromLarge = (a, b) => {
        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
    }
    const filterChecked = (e) => {
        setFilterCheck(e.target.checked);
    }
    const sortChange = (e) => {
        setSortValue(e.target.value);
    }
    const handleEditDate = (date) => {
        setEditItem({...editItem , dateValue:date});
    }

    const handleDateChange = (date) => {
        setDateValue(date);
        setDateValueString(moment(date).format('DD-MM-YYYY'));
    }

    const handleEditItem = (e) => {
        setEditItem({...editItem,title:e.target.value})
    }

    const handleUpdateItem = (id) => {
        const item = [...items]
        const index = item.findIndex(item => item.id === id)
        item[index].title = editItem.title
        item[index].date = editItem.dateValue
        const dateValue = moment(editItem.dateValue).format('DD-MM-YYYY')
        item[index].dateValueString = dateValue
        setItems(item);
        setEdit(false);
    }

    const clear = () => {
        setItems([]);
        setFilterCheck(false);
    }

    const handleCancelEdit = () => {
        setEdit(false);
    }

    const handleSetEdited = (id,item) => {
        setEdit(true);
        setEditItem({id:id , title:item.title , dateValue:item.date})
    }

    const handleSelectItems = (id) => { //set select of item that have been clicked    from false --> true
        let item = [...items];
        const filterArray = item.filter(item => item.id === id)
        const index = item.findIndex(item => item === filterArray[0])
        item[index].select = !item[index].select
        setItems(item);
        console.log(items);
    }

    const handleCompleteItems = (id) => {  //set click of item that have been done     from false --> true
        let item = [...items];
        const filterArray = item.filter(item=>item.id===id)
        const index = item.findIndex(item => item === filterArray[0])
        item[index].click = !item[index].click
        setItems(item);
    }

    const changeItems = () => { //ChangeItems by filterArray
        let item = [...items];
        const filterArray = item.filter(item => item.select) //filter item that item.select is true
        if(filterArray.length === 2){
            let index0 = item.findIndex(item => item.id === filterArray[0].id) 
            let index1 = item.findIndex(item => item.id === filterArray[1].id)
            
            item[index0] = filterArray[1] 
            item[index1] = filterArray[0]
            item[index0].select = false
            item[index1].select = false
            
            setItems(item);
        }else{
            alert('Please Select 2 Tasks')
            items.forEach(item => {
                item.select = false
            })
            setItems(item);
        }
    }

    const handleDeleteItems = (id) => {
        setItems(items.filter(item => item.id !== id));
    }

    const handleChange = (event) => {
        setNewItem({title:event.target.value , click:false , select:false, date:null, dateValueString: '', id: Math.random()*1000})
    }

    const submitForm = (event) => {
        
            const newItems = newItem
            const item = [...items]
            newItems.date = dateValue
            newItems.dateValueString = dateValueString
            setNewItem(newItems);
            setDateValue(null);
            setDateValueString('');
            item.unshift(newItems)
            setNewItem({ title: '' });
            setItems(item);
        
    }


        return (
            <Box className="list">
                <form onSubmit={handleSubmit(submitForm)} className="todoForm">
                    <TextField {...register("task")}
                        className="newTask"
                        type="text"
                        onChange={handleChange}
                        value={newItem.title}
                        label="Enter Your Task"
                        id="margin-none"
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="SELECT DATE"
                            value={dateValue}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <Button className="enter" type="submit" variant="contained">Add</Button>
                    <br />
                    <Box className="CheckboxForm">
                    <label style={{fontSize : "10px" , textAlign:"right" , color:"black"}}>filter by date</label>
                    <Checkbox
                        checked={filterCheck}
                        onClick={filterChecked}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    </Box>
                    <Box sx={{ minWidth: 120 , marginLeft: "10px" }}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Sorted
                            </InputLabel>
                            <NativeSelect
                                onChange={sortChange}
                                defaultValue={0}
                                inputProps={{
                                    name: 'typeOfSorted',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                <option value={0}>NONE</option>
                                <option value={10}>???????????????????????????</option>
                                <option value={20}>???????????????????????????</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                    
                </form>
                <AppItems
                    items={items}
                    onDelete={handleDeleteItems}
                    onComplete={handleCompleteItems}
                    onSelect={handleSelectItems}
                    onSetEdit={handleSetEdited}
                    edit={edit}
                    editItem={editItem}
                    onHandleEditItem={handleEditItem}
                    onUpdate={handleUpdateItem}
                    onCancel={handleCancelEdit}
                    onHandleDateChange={handleDateChange}
                    onEditDate={handleEditDate}
                    sortValue={sortValue}
                    filterCheck={filterCheck}
                    byDateFromLarge={byDateFromLarge}
                    byDateFromLess={byDateFromLess}
                />
                <br/>
                <Button style={{color:"white" , border:"1px solid white"}} className="clear" onClick={clear} variant="outlined" >Clear the List</Button>
                <Button style={{marginLeft : "10px"}}className="change" variant="contained" onClick={changeItems} disabled={sortValue === '10' || sortValue === '20' ? true : false}>SWAP</Button>
            </Box>
        );
    
}

export default ControlElement;