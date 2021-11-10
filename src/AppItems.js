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
                <TableCell align="center"><Checkbox onClick={this.props.selectItems.bind(this,index)} checked={item.select}/></TableCell>
            </TableRow>
        });

        return (
            <TableContainer className="taskTable" >
                {tableHeader}
                {list}
            </TableContainer>
        )
    }
}
export default AppItems;