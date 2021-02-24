import React from "react";
import {Row} from "reactstrap";

const Footer = () => {
    return (
        <footer>
            <Row>
                <p>&copy; Comix {(new Date().getFullYear())} All Rights Reserved for Batman only.  This app was made possible by the <a href="https://comicvine.gamespot.com/api/">Comic Vine API</a>.</p>
            </Row>
        </footer>
    );
};

export default Footer;