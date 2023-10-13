import { useState, useEffect } from "react";
import "../stylesheets/Resolution.css"
import loadingGif from "../assets/loading-text.gif"
import DomainCard from "./DomainCard"
import axios from "axios";

const getDomainsByOwner = async(address,resultsHandler,loadingHandler) =>{
    loadingHandler(true)
    const response = await axios
        .get(`https://api.unstoppabledomains.com/resolve/domains?owners=${address}`, {
            headers: {
                'Authorization': 'Bearer 23etr7k0esbms00x4vnb4ofyp8v2y8nw'
            }
        })
        .catch((err) => {
            console.log(err)
        })
    console.log(response.data)
    const data = response.data;
    const results = []
    data["data"].forEach(function (item, index){
        results.push(item["id"])
    })
    resultsHandler(results)
    loadingHandler(false)
}

const reverseResolve = async(address,resultsHandler, loadingHandler) =>{
    loadingHandler(true)
    const response = await axios
        .get(`https://api.unstoppabledomains.com/resolve/reverse/${address}`, {
            headers: {
                'Authorization': 'Bearer 23etr7k0esbms00x4vnb4ofyp8v2y8nw'
            }
        })
        .catch((err) => {
            console.log(err)
        })
    console.log(response.data)
    const data = response.data;
    resultsHandler(data["meta"]["domain"])
    loadingHandler(false)
}

function ReverseDemo(props){

    let [domainNames, setDomainNames] = useState([])
    let [primaryDomain, setPrimaryDomain] = useState(null)
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{ 
        getDomainsByOwner(props.address, setDomainNames, setLoading)
        reverseResolve(props.address, setPrimaryDomain, setLoading)
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
        }else{
            output.push(<div id="message" className="noDomainMessage">❕This wallet doesn't appear to own any UNS Domains.</div>)
        }
        return(output)
    }

    const showReverseResolveResults = () =>{
        if (primaryDomain){
            return(
            <div id="primaryDomainWrapper">
                <DomainCard domain={primaryDomain} />
                <div id="primaryDomain" className="primaryDomain">{primaryDomain}</div>
            </div>)
        } else{
            return(<div id="message" className="noDomainMessage">❕There doesn't appear to be a primary domain registered for this address.</div>)
        }
    }
    return(
        <div id="reverseDemo">
            <h2>Address Lookups</h2>
            {props.address}
            {!loading && <div>
                <h2>Reverse Resolution</h2>
                <div className="info">Reverse Resolution shows the <i>Primary Domain</i> for an address. This is the domain that a user has registered on chain to be the default UNS domain to display with that address. This is to avoid conflicts if that wallet owns multiple UNS domains</div>
                {showReverseResolveResults()}
                <h2>All UNS Domains Owned</h2>
                <div className="info">These are all the UNS domains owned by this wallet. This includes the primary domain.</div>
                {showOwnerResults()}
            </div>}
            {loading && <div className="loading-gif-container">
                <img src={loadingGif} alt="loading..." />
            </div>}
            <br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    )
}
export default ReverseDemo;