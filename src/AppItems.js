import React from "react";
import Button from '@mui/material/Button';
import './App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TableCell from '@mui/material/TableCell';


class AppItems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items,
        }
    }
  
    render() {
        localStorage.setItem('data',JSON.stringify(this.props.items))
        var items = this.props.items;
        var tableHeader =
            <TableHead className="tableHead">
                <TableRow>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center" className="taskitem">Task</TableCell>
                    <TableCell align="center">(X)</TableCell>
                    <TableCell align="center">SELECT</TableCell>
                </TableRow>
            </TableHead>;

        if (items.length === 0) {
            tableHeader = '';
        }

        var list = items.map((item, index) => {
            return <TableRow>
                <TableCell> <Checkbox onClick={this.props.completeItems.bind(this,index)} checked={item.click}/></TableCell>
                <TableCell className={`taskItem ${item.click ? "linethrough" : ""}`} key={index.toString()}>{item.title}</TableCell>
                <TableCell>
                    <Button className="remove" onClick={this.props.deleteItems.bind(this, index)} variant="outlined" color="error" startIcon={<DeleteIcon />}>X</Button>
                </TableCell>
                <TableCell align="center"><Button onClick={this.props.setEdit.bind(this,index)}>EDIT</Button><Checkbox onClick={this.props.selectItems.bind(this,index)} checked={item.select}/></TableCell>
            </TableRow>
        });

        if(this.props.edit){
            const editIndex = this.props.editIndex
            return (
                    <div>
                            <label htmlFor="fname">Edit Item:</label><br />
                            <input type="text" id="fname" name="fname" onChange={this.props.handleEditItem.bind(this)}defaultValue={this.props.items[editIndex].title} /><br />
                            <Button onClick={this.props.updateItem.bind(this,editIndex)}>UPDATE</Button>
                            <Button>CANCEL</Button>
                    </div>

            )
        }
        else{
            return (
                <TableContainer style={{width:"100"}}className="taskTable" >
                    {tableHeader}
                    {list}
                </TableContainer>
            )
        }
    }
}
export default AppItems;