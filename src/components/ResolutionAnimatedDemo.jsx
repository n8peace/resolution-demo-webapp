import { useState, useEffect } from "react";
import "../stylesheets/ResolutionAnimatedDemo.css"
import udLogo from "../assets/ud-logo-lockup.svg"

import DomainBar from "./DomainBar";
import ReverseDemo from "./ReverseDemo";
import UnsDemo from "./UnsDemo";

function ResolutionAnimatedDemo(){
    const [userInput, setUserInput] = useState(null);

    const [unsTlds, setUnsTlds] = useState([]);

    const [reverseDemo,setReverseDemo] = useState(false);
    const [unsDemo,setUnsDemo] = useState(false);

    // Get UNS Tlds. Grabbing this fron an endpoint since Unstoppable adds new TLDs frequently, so this wills tay updated
    useEffect( () => {
        async function getUnsTlds(){
            const url = 'https://resolve.unstoppabledomains.com/supported_tlds';
            const response = await fetch(url);
            const data = await response.json();
            setUnsTlds(data['tlds'])
        };
        getUnsTlds();
    }, []);

    const clearDemoArea = () =>{
        setReverseDemo(false)
        setUnsDemo(false)
    }

    const handleInput = (userInput) => {
        console.log("Got: ",userInput)
        console.log("Checking if 0x... address or domain")
        const ethRegex = /(0x[a-fA-F0-9]{40})/g;
        console.log("UNS TLDs: ",unsTlds)
        if(ethRegex.test(userInput)){
            // 0x address
            clearDemoArea()
            setReverseDemo(true)
            console.log("This is a 0x address, will do reverse resolution demo")
        } else if (unsTlds.includes(userInput.split('.').pop())){
            // UNS address
            clearDemoArea()
            setUnsDemo(true)
            console.log("This is a UNS TLD, will do UNS resolution demo")
        }else{
            clearDemoArea()
            alert("Sorry, "+userInput+" is not a valid format. Try a 0x... address or a domain like jim-unstoppable.x")
        }
    }

    useEffect( ()=>{
        console.log("User just entered: ",userInput)
        if (userInput){
            handleInput(userInput)
        }
    }, [userInput])

    return(
        <div id="resolutionAnimatedDemo">
            <img src={udLogo} style={{ height: 100, width: 200, alignSelf: "right"}} alt="udlogo"/>
            <h1>Web3 Domains Demo</h1>
            <p>This will give you an example of how both Resolution and Reverse Resolution works!</p>
            <h2> What Are These Terms?</h2>
            <p className="titleInfo"><b>Resolution</b> is used to turn a domain name into a wallet address.<br/><b>Reverse Resolution</b> is used to turn a wallet address into a domain name</p>
            <p className="titleInfo">Think about it this way. Resolution is like using a phone book - you know someone's name but don't know their phone number. Reverse resolution is like using caller ID - you saw a missed call from a number you don't recognize and want to find out who it belongs to.</p>
            <h2>Technical Documentation</h2>
            <p className="titleInfo">Unstoppable's <a href="https://docs.unstoppabledomains.com/developer-toolkit/resolution-integration-methods/resolution-service/overview/">Resolution Service API</a> is easy to use and supports many additional features not covered here.</p>
            <h2>Try It Yourself!</h2>
            <p className="hint">Hint: try <i>jim-unstoppable.x</i> if you're stuck</p>
            <DomainBar inputHandler={setUserInput}/>
            {unsDemo && <UnsDemo domain={userInput}/>}
            {reverseDemo && <ReverseDemo address={userInput}/>}
        </div>
    )
}

export default ResolutionAnimatedDemo;