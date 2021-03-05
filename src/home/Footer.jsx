import React from "react";
import {Row} from "reactstrap";


const Footer = () => {

    const footerStyle = {
        backgroundImage: 'radial-gradient(circle, lightblue, deepskyblue)',
        color: 'black',
        fontFamily: 'Comic Sans MS',
        height: '150px',
        textAlign: 'center',
        border: 'solid 4px',
        borderRadius: '10px',
        marginTop: "5%",
        
    }

    const linkStyle =
    {
        color: 'black'
    }

    return (
        <footer style={footerStyle}>
                <h5>&copy; Comix {(new Date().getFullYear())} 

                <p>All Rights Reserved for Batman only.</p> 
                </h5>
                <p>This app was made possible by the <a className="speech" style={linkStyle} href="https://comicvine.gamespot.com/api/">Comic Vine API.</a></p>

                <a class="twitter-share-button"
                    href="https://twitter.com/intent/tweet?text=Comix!"
                    data-size="large" target="_blank"><img src="https://seeklogo.com/images/T/twitter-icon-square-logo-108D17D373-seeklogo.com.png" width="15" height="15"></img></a>
        </footer>
    );
};

export default Footer;