import { useState, useEffect } from "react";
import "../stylesheets/Resolution.css"

const getDomainsByOwner = async(address,resultsHandler) =>{
    const url = "https://resolve.unstoppabledomains.com/domains?owners="+address;
    const options = {
        method: "GET",
        headers: {
            "Authorization": "Bearer 67c85c9d-0123-447f-9662-971534f96319"
        }
    }

    const response = await fetch(url,options)
    const data = await response.json();
    const results = []
    data["data"].forEach(function (item, index){
        results.push(item["id"])
    })
    resultsHandler(results)
}

const reverseResolve = async(address,resultsHandler) =>{
    const url = "https://resolve.unstoppabledomains.com/reverse/"+address;
    const options = {
        method: "GET",
        headers: {
            "Authorization": "Bearer 67c85c9d-0123-447f-9662-971534f96319"
        }
    }
    const response = await fetch(url,options)
    const data = await response.json();
    resultsHandler(data["meta"]["domain"])
}

function ReverseDemo(props){

    let [domainNames, setDomainNames] = useState([])
    let [primaryDomain, setPrimaryDomain] = useState(null)
    
    useEffect(()=>{ 
        getDomainsByOwner(props.address, setDomainNames)
        reverseResolve(props.address, setPrimaryDomain)
    },[props.address])

    // 0x89f7D2F14Be6d283d69f6D2879637aF4AA3eEb93
    const showOwnerResults = () =>{
        const output = []
        if(domainNames.length > 0 ){
            domainNames.forEach(function (name){
                if(name===primaryDomain){
                    output.push(<div className="primaryDomain">{name}</div>)
                }else{
                    output.push(<div className="domainName">{name}</div>)
                }
            })
        }
        return(output)
    }

    const showReverseResolveResults = () =>{
        if (primaryDomain){
            return(<div id="primaryDomain" className="primaryDomain">{primaryDomain}</div>)
        }
    }
    return(
        <div id="reverseDemo">
            <h2>Address Lookups</h2>
            {props.address}
            <h2>Reverse Resolution</h2>
            <div className="info">Reverse Resolution shows the <i>Primary Domain</i> for an address. This is the domain that a user has registered on chain to be the default UNS domain to display with that address. This is to avoid conflicts if that wallet owns multiple UNS domains</div>
            {showReverseResolveResults()}
            <h2>All UNS Domains Owned</h2>
            <div className="info">These are all the UNS domains owned by this wallet. This includes the primary domain.</div>
            {showOwnerResults()}
        </div>
    )
}
export default ReverseDemo;