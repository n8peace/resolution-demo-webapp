import './stylesheets/DomainCard.css'

function VisualDomainCard(props){
    
    let imageUrl = "https://metadata.unstoppabledomains.com/image-src/"+props.domain//+"?withOverlay=false"

    return(
        <div>
            <h2>Plain Text</h2>
            <p>{props.domain}</p>
            <h2>Using Image</h2>
            <div id="image" className="domain-card-image-container">
                <img src={imageUrl} className="domain-card-image" />
            </div>
            <p>URL</p>
            {imageUrl}
        </div>
    )
}

export default VisualDomainCard;