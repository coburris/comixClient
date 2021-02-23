import React from "react";
import {Row} from "reactstrap";

const Footer = () => {
    return (
        <footer>
            <Row>
                <p>&copy; Comix {(new Date().getFullYear())} All Rights Reserved for Batman only.</p>
            </Row>
        </footer>
    );
};

export default Footer;