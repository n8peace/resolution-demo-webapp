import { useState, useEffect } from "react";
import "../stylesheets/Resolution.css"


function UnsDemo(props){

    const [domainData,setDomainData] = useState({});
    
    useEffect(()=>{
        async function unsResolve(domain){
            const url = 'https://resolve.unstoppabledomains.com/domains/' + domain;
            const options = {
                method: 'GET',
                headers: {
                Authorization: 'Bearer 01f60ca8-2dc3-457d-b12e-95ac2a7fb517',
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
    
    return(
        <div id="unsDemo">
            <h2>UNS Resolution</h2>
            <h3>{props.domain}</h3>
            <h4>---Owner Details---</h4>
            <p>These are all details about the wallet that owns the domain. <br/>Note that this is independent to currency records, which are shown later</p>
            <h4>---Single Chain Records---</h4>
            <h4>---Multi Chain Records---</h4>
            <h4>---Full Resolution Data---</h4>
            <div className="resolutionJson"><pre>{JSON.stringify(domainData, null, 2) }</pre></div>
            <br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    )
}

export default UnsDemo;