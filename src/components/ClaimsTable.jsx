import "../stylesheets/ClaimsTable.css"
import TableRow from "./TableRow"


function buildTableBody(showNone,data){
    let tableRows = [];
    for (var key of Object.keys(data)){
        if(data[key] || showNone){
            tableRows.push(<TableRow a={key} b={data[key]}/>)
        }
    }
    return tableRows;
}


function generateResults(showNone,data,title){
    let results = []
    const tableClassName="claims-table"
    if (typeof data !== 'undefined'){
        if (Object.keys(data).length >0){
            results.push(
                <table id={title} className={tableClassName}>
                    <tbody>
                        <tr><th>JSON Key</th><th>Value</th></tr>
                        {buildTableBody(showNone,data)}
                    </tbody>    
                </table>
            );
        }else{
            results.push(<p>None Given</p>)
        }
    } else{
        results.push(<p>None Given</p>)
    }
    return(results)
}


function ClaimsTable(props){
    const { showTitle = true} = props;
    const { showSubtitle = false} = props;
    return(
        <div id="claims-table-wrapper" className="claims-table-wrapper">
            {showTitle && <h1>{props.title}</h1>}
            {showSubtitle && <h3>{props.subtitle}</h3>}
            {generateResults(props.showNone,props.data,props.title)}
        </div>
    )
}

export default ClaimsTable;