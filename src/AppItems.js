import React from "react";
import Button from '@mui/material/Button';
import './App.css';
import DeleteIcon from '@mui/icons-material/Delete';


class AppItems extends React.Component {

    render(){
        var items = this.props.items;


        var tableHeader = 
            <tr className="tableHead">
                <th className="taskitem">Task</th>
                <th>(X)</th>
            </tr>;
        
        if(items.length === 0){
            tableHeader = '';
        }

        var list = items.map((item,index) => {
            return <tr>
                <td className="taskItem" key={index}>{item}</td>
                <td>
                    <Button className="remove" onClick={this.props.deleteItems.bind(this,index)} variant="outlined" color="error" startIcon={<DeleteIcon />}>X</Button>
                </td>
            </tr>
        });

        return(
            <table className="taskTable" >
                {tableHeader}
                {list}
            </table>
        
        )

    }
}
export default AppItems;