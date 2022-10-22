import '../stylesheets/WalletAddressBar.css';
import { useState } from 'react';

function DomainBar(props) {
    const [userInput, setUserInput] = useState("");
  
    const handleSubmit = (event) => {
        event.preventDefault();
        props.inputHandler(userInput);
    };
  

    return (
        <div id="domainBar">
            <form onSubmit={handleSubmit}>
                <div className="wallet-address-bar" 
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <input 
                        type="text" 
                        value={userInput}
                        id="search-bar"
                        placeholder="Enter Address or Web3 Domain"
                        className="domain-search-bar"
                        spellCheck="false"
                        onChange={(e) => setUserInput(e.target.value)}
                    />
              </div>
          </form>
      </div>
    )
}
export default DomainBar;