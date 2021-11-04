import React from "react";
import Button from '@mui/material/Button';
import './App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableHead  from "@mui/material/TableHead";
import TableContainer  from "@mui/material/TableContainer";
import TableCell from '@mui/material/TableCell';


class AppItems extends React.Component {
    constructor(props){
        super(props);

        this.state={
            items:this.props.items,
            click: false
        }

        this.linetroughText = this.linetroughText.bind(this);
    }

    linetroughText(){
        this.setState({ click:!this.state.click });
    }
    render(){
        const textClass = this.state.click ? "taskItem-linethrough" : "taskItem";
        const items = this.props.items;
        let tableHeader = 
            <TableHead className="tableHead">
                <TableRow>
                    <TableCell className="taskitem">Task</TableCell>
                    <TableCell>(X)</TableCell>
                </TableRow>
            </TableHead>;
        
        if(items.length === 0){
            tableHeader = '';
        }

        const list = items.map((item,index) => {
            return <TableRow>
                <TableCell className={textClass} key={index}><Checkbox onClick={this.linetroughText}/>{item}</TableCell>
                <TableCell>
                    <Button className="remove" onClick={this.props.deleteItems.bind(this,index)} variant="outlined" color="error" startIcon={<DeleteIcon />}>X</Button>
                </TableCell>
            </TableRow>
        });

        return(
            <TableContainer className="taskTable" >
                {tableHeader}
                {list}
            </TableContainer>
        
        )

    }
}
export default AppItems;