import { useState, useEffect } from "react";
import "../stylesheets/Resolution.css"
import ClaimsTable from "./ClaimsTable";

function UnsDemo(props){

    const [domainData,setDomainData] = useState({});
    const [singlechainData, setSinglechainData] = useState({});
    const [multichainData, setMultichainData] = useState({});

    const getSinglechainData = (data) =>{
        let records = data["records"]
        const temp = {}
        for (var key of Object.keys(records)){
            if((key.match(/\./g) || []).length<3 && key.includes("crypto")){
                temp[key]=records[key]
            }
        }
        setSinglechainData(temp)
    }
    
    const getMultichainData = (data) =>{
        let records = data["records"]
        const temp = {}
        for (var key of Object.keys(records)){
            if((key.match(/\./g) || []).length>3 && key.includes("crypto")){
                temp[key]=records[key]
            }
        }
        const ordered = Object.keys(temp).sort().reduce(
            (obj, key) => { 
              obj[key] = temp[key]; 
              return obj;
            }, 
            {}
          );
        setMultichainData(ordered)
    }

    useEffect(()=>{
        async function unsResolve(domain){
            const url = 'https://resolve.unstoppabledomains.com/domains/' + domain;
            const options = {
                method: 'GET',
                headers: {
                Authorization: 'Bearer 67c85c9d-0123-447f-9662-971534f96319',
                },
            };
        const response = await fetch(url, options);
        const data = await response.json();
        setDomainData(data)
        }
        if (props.domain){
            unsResolve(props.domain)
        }
    },[props.domain])

    useEffect(()=>{
        if(Object.keys(domainData).length>0){
            getSinglechainData(domainData)
            getMultichainData(domainData)
        }
    },[domainData])
    
    return(
        <div id="unsDemo">
            <h2>UNS Resolution</h2>
            <h3>{props.domain}</h3>
            <h4>Owner Details</h4>
            <div className="info">These are all details about the wallet that owns the domain. Note that this is independent to currency records, which are shown later. <br/><br/>The <i>owner</i> is the wallet address that owns the domain. The <i>resolver</i> and <i>registry</i> relate to the smart contracts</div>
            <ClaimsTable showTitle={false} data={domainData["meta"]}/>
            <h4>Single Chain Records</h4>
            <div className="info">These are crypto records labeled as "single chain" in UD domain management tool. Notice the json key syntax is crypto.SYMBOL.address </div>
            <ClaimsTable showTitle={false} data={singlechainData}/>
            <h4>Multi Chain Records</h4>
            <div className="info">These are crypto records that have multiple chain options for a given currency in UD domain management tool. Notice the json key syntax is different than with single chain records, and includes a field for the chain.</div>
            <ClaimsTable showTitle={false} data={multichainData}/>
            <h4>Full Resolution Data</h4>
            <div className="info-center">The full response from the API</div>
            <div className="resolutionJson"><pre>{JSON.stringify(domainData, null, 2) }</pre></div>
            <br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    )
}

export default UnsDemo;