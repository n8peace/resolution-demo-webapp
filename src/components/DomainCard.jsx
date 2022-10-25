import '../stylesheets/DomainCard.css'

function DomainCard(props){
    
    let imageUrl = "https://metadata.unstoppabledomains.com/image-src/"+props.domain//+"?withOverlay=false"

    return(
        <div id="image" className="domain-card-image-container">
            <img src={imageUrl} alt="domainImage" className="domain-card-image" />
        </div>
    )
}

export default DomainCard;