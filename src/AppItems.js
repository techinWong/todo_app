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
            click: Array(this.props.items.length).fill(false)
        }
        this.linethroughText = this.completeItems.bind(this);
    }

    completeItems(index) {
        let newClick = this.state.click;
        newClick[index] = !newClick[index];
        this.setState({ click: newClick })
    }
    
    render() {
        var items = this.props.items;
        var tableHeader =
            <TableHead className="tableHead">
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell className="taskitem">Task</TableCell>
                    <TableCell>(X)</TableCell>
                </TableRow>
            </TableHead>;

        if (items.length === 0) {
            tableHeader = '';
        }

        var list = items.map((item, index) => {
            return <TableRow>
                <TableCell> <Checkbox onClick={() => this.completeItems(index)} /></TableCell>
                <TableCell className={`taskItem ${this.state.click[index] ? "linethrough" : ""}`} key={index.toString()}>{item}</TableCell>
                <TableCell>
                    <Button className="remove" onClick={this.props.deleteItems.bind(this, index)} variant="outlined" color="error" startIcon={<DeleteIcon />}>X</Button>
                </TableCell>
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