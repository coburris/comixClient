import React, {useState} from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import Signup from './Signup';
import Login from './Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';




const Auth = (props) => {
    const [showToggle, setShowToggle] = useState(true);

    function handleToggle(){
        setShowToggle(!showToggle)
    }

    return (
    <Router>
        <Container className="auth-container">
            <Row>
                <Col md="6">{showToggle === true ? <Signup updateToken={props.updateToken}/> : <Login updateToken={props.updateToken}/>}</Col>
            </Row>
                <Button onClick={handleToggle}>Toggle Signup and Login</Button>
        </Container>
    </Router>
    )
}

export default Auth;
