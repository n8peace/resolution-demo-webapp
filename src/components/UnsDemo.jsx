import { useState, useEffect } from "react";
import "../stylesheets/Resolution.css"
import ClaimsTable from "./ClaimsTable";
import loadingGif from "../assets/loading-text.gif"
import DomainCard from "./DomainCard";
import axios from "axios";

function UnsDemo(props){

    const [domainData,setDomainData] = useState({});
    const [singlechainData, setSinglechainData] = useState({});
    const [multichainData, setMultichainData] = useState({});
    const [otherData, setOtherData] = useState({});
    const [isRegistered, setIsRegistered] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ipfsUrl,setIpfsUrl] = useState("");

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

    const getOtherData = (data) =>{
        let records = data["records"]
        const temp = {}
        temp["ipfs.html.value"] = records["ipfs.html.value"]
        temp["social.picture.value"] = records["social.picture.value"]
        setIpfsUrl(temp["ipfs.html.value"])
        setOtherData(temp)
    }

    useEffect(()=>{
        async function unsResolve(domain){
        setLoading(true)
        const response = await axios
            .get(`https://api.unstoppabledomains.com/resolve/domains/${domain}`, {
                headers: {
                    'Authorization': 'Bearer 23etr7k0esbms00x4vnb4ofyp8v2y8nw'
                }
            })
            .catch((err) => {
                console.log(err)
            })
        console.log(response.data)
        const data = response.data;
        setDomainData(data)
        setLoading(false)
        if(data["meta"]["owner"]){
          setIsRegistered(true);  
        }
        }
        if (props.domain){
            unsResolve(props.domain)
        }
    },[props.domain])

    useEffect(()=>{
        if(Object.keys(domainData).length>0){
            getSinglechainData(domainData)
            getMultichainData(domainData)
            getOtherData(domainData)
        }
    },[domainData])
    
    return(
        <div id="unsDemo">
            <h2>UNS Resolution</h2>
            <h3>{props.domain}</h3>
            {!loading && <div id="demoArea">
                { isRegistered && <div id="registeredDomainDetails">
                    <DomainCard domain={props.domain}/>
                    
                    <h4>Owner Details</h4>
                    <div className="info">These are all details about the wallet that owns the domain. Note that this is independent to currency records, which are shown later. <br/><br/>The <i>owner</i> is the wallet address that owns the domain. The <i>resolver</i> and <i>registry</i> relate to the smart contracts</div>
                    <ClaimsTable showTitle={false} data={domainData["meta"]}/>
                    <br/><br/>
                    
                    <h4>Single Chain Records</h4>
                    <div className="info">These are crypto records labeled as "single chain" in UD domain management tool. Notice the json key syntax is crypto.SYMBOL.address </div>
                    <ClaimsTable showTitle={false} data={singlechainData}/>
                    <br/><br/>
                    
                    <h4>Multi Chain Records</h4>
                    <div className="info">These are crypto records that have multiple chain options for a given currency in UD domain management tool. Notice the json key syntax is different than with single chain records, and includes a field for the chain.</div>
                    <ClaimsTable showTitle={false} data={multichainData}/>
                    <br/><br/>

                    <h4>Other Data</h4>
                    <div className="info">There are some other cool fields available from on chain data, such as the IPFS hash for a decentralized website and NFT avatar</div>
                    <ClaimsTable showTitle={false} data={otherData}/>
                    {ipfsUrl && <><br/><b>Preview - IPFS URL</b><br/>
                    <iframe height="400px" width="75%" src={"https://ipfs.io/ipfs/"+ipfsUrl}></iframe></>}
                    <br/><br/>

                </div>}
                { !isRegistered && <div className="alert">❗This domain isn't minted yet. Try another one for more data.</div>}
                <h4>Full Resolution Data</h4>
                <div className="info-center">The full response from the API</div>
                <div className="resolutionJson"><pre>{JSON.stringify(domainData, null, 2) }</pre></div>
            </div>}
            {loading && <div className="loading-gif-container">
                <img src={loadingGif} alt="loading..." />
            </div>}
            <br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    )
}

export default UnsDemo;