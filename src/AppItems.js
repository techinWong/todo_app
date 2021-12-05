import React from "react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TableCell from '@mui/material/TableCell';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';

import './App.css';


const AppItems = (props) => {
    

       
        let {  editItem , items , edit , sortValue , filterCheck } = props;

        localStorage.setItem('data',JSON.stringify(items))

        const items1=[...items]
        
        //Check the value of option and filterCheck
        if(sortValue === '0' || sortValue === ''){
            items = items1
            items = (filterCheck) ? items1.filter(item => item.date !== null) : items1
        }
        else if(sortValue === '10'){
            items = items1.sort(props.byDateFromLess)
            items = (filterCheck) ? items1.filter(item => item.date !== null) : items1
        }
        else if(sortValue === '20'){
            items = items1.sort(props.byDateFromLarge)
            items = (filterCheck) ? items1.filter(item => item.date !== null) : items1
        }

        
        
        let tableHeader =
            <TableHead className="tableHead" >
                <TableRow>
                    <TableCell align="center">Done</TableCell>
                    <TableCell align="center"className="taskitem">Task</TableCell>
                    <TableCell align="center">Edit</TableCell>
                    <TableCell align="center">Select</TableCell>
                    <TableCell align="center">DATE</TableCell>
                    <TableCell align="center">X</TableCell>
                </TableRow>
            </TableHead>;

        if (items.length === 0) {
            tableHeader = '';
        }

        let list = items.map((item) => {
            return <TableRow align="center" styles={{ "width": "100%" }}>
                <TableCell align="center"><Checkbox onClick={props.onComplete.bind(this,item.id)} checked={item.click}  /></TableCell>
                <TableCell  align="left" className={`taskItem ${item.click ? "linethrough" : ""}`} key={item.id}>{item.title}</TableCell>
                
                <TableCell align="center"><Button onClick={props.onSetEdit.bind(this,item.id,item)}>EDIT</Button></TableCell>
                <TableCell aling="center"><Checkbox onClick={props.onSelect.bind(this,item.id)} checked={item.select}/></TableCell>
                <TableCell align="center">

                {(item.dateValueString === "Invalid date") ? "" : item.dateValueString}

                </TableCell>
                <TableCell align="center">
                    <Button className="remove" onClick={props.onDelete.bind(this, item.id)} variant="outlined" color="error" startIcon={<DeleteIcon />}>X</Button>
                </TableCell>
            </TableRow>
        });
        if(edit){
           

            return (
                    <Box className="editItem">
                            <label htmlFor="fname">Edit Item:</label><br />
                        <Box className="editBoxAnddateBox">
                            <input type="text" id="fname" name="fname" onChange={props.onHandleEditItem.bind(this)}defaultValue={editItem.title} /><br />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                 label="SELECT DATE"
                                 value={editItem.dateValue}
                                 onChange={props.onEditDate.bind(this)}
                                 renderInput={(params) => <TextField {...params} />}
                             />
                            </LocalizationProvider>
                        </Box>
                        <br/>
                         <Box>
                            <Button variant="contained" onClick={props.onUpdate.bind(this,editItem.id)}>UPDATE</Button>
                            <Button style={{marginLeft:"10px"}}variant="outlined" onClick={props.onCancel.bind(this)} color="error">CANCEL</Button>
                        </Box>   
                    </Box>

            )
        }
        else{
            return (
                <TableContainer align="center" style={{width:"100"}}  className="taskTable" >
                    {tableHeader}
                    {list}
                </TableContainer>
            )
        }
    
}
export default AppItems;