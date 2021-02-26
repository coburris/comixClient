import React from "react";
import {Row} from "reactstrap";

const Footer = () => {

    const footerStyle = {
        backgroundColor: '#338ef5'
    }

    return (
        <footer style={footerStyle}>
            <Row>
                <p>&copy; Comix {(new Date().getFullYear())} All Rights Reserved for Batman only.  This app was made possible by the <a href="https://comicvine.gamespot.com/api/">Comic Vine API</a>.</p>
            </Row>
        </footer>
    );
};

export default Footer;