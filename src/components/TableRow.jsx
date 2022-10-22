import "../stylesheets/ClaimsTable.css"
function TableRow(props){
    return(
        <tr>
            <td>{props.a}</td>
            <td>{String(props.b)}</td>
        </tr>
    )
}

export default TableRow;