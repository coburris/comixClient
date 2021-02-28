import React from "react";
import {Row} from "reactstrap";

const Footer = () => {

    const footerStyle = {
        backgroundColor: '#338ef5',
        color: 'white',
        fontFamily: 'Comic Sans MS',
        height: '100px',
        textAlign: 'center',
        border: 'solid #FFEB00',
        borderRadius: '10px',
        marginTop: "5%"
        
    }

    const linkStyle =
    {
        color: 'white'
    }

    return (
        <footer style={footerStyle}>
                <h5>&copy; Comix {(new Date().getFullYear())} 

                <p>All Rights Reserved for Batman only.</p> 
                </h5>
                <p>This app was made possible by the <a style={linkStyle} href="https://comicvine.gamespot.com/api/">Comic Vine API.</a></p>
        </footer>
    );
};

export default Footer;