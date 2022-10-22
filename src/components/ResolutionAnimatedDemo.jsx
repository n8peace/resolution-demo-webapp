import { useState, useEffect } from "react";
import "../stylesheets/ResolutionAnimatedDemo.css"

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

    const handleInput = (userInput) => {
        console.log("Got: ",userInput)
        console.log("Checking if 0x... address or domain")
        const ethRegex = /(0x[a-fA-F0-9]{40})/g;
        console.log("UNS TLDs: ",unsTlds)
        if(ethRegex.test(userInput)){
            // 0x address
            setReverseDemo(true)
            console.log("This is a 0x address, will do reverse resolution demo")
        } else if (unsTlds.includes(userInput.split('.').pop())){
            // UNS address
            setUnsDemo(true)
            console.log("This is a UNS TLD, will do UNS resolution demo")
        }else(
            alert("Sorry, that input doesn't seem valid. Try a 0x style adddress or a UNS Web3 domain like jim-unstoppable.nft")
        )
    }

    useEffect( ()=>{
        console.log("User just entered: ",userInput)
        if (userInput){
            handleInput(userInput)
        }
    }, [userInput])

    return(
        <div id="resolutionAnimatedDemo">
            <h1>Web3 Domain Resolution Demo</h1>
            <p>This will give you an example of how both Resolution and Reverse Resolution works!</p>
            <h3>Resolution = Phonebook </h3>
            <p>Resolution takes in a domain name and returns back the wallet addresses configured for that domain</p>
            <h3>Reverse Resolution = Caller ID </h3>
            <p>Reverse Resolution takes in an address and returns the <b>primary</b> domain for that address</p>
            <h2>Try It Yourself!</h2>
            <p>(Hint: try jim-unstoppable.x if you're stuck)</p>
            <DomainBar inputHandler={setUserInput}/>
            {unsDemo && <UnsDemo domain={userInput}/>}
            {reverseDemo && <ReverseDemo />}
        </div>
    )
}

export default ResolutionAnimatedDemo;