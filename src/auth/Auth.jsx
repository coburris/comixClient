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

    const authStyle =
    {
        textAlign:"center",
        fontFamily: "Comic Sans",
        textDecoration: "underline",
        
    }

    const toggleButtonStyle =
    {
        backgroundColor: "#DE3E35",
    }

    return (
    <Router>
        <Container className="auth-container" style={authStyle}>
            <Row>

{/*                 <Col md="6">{showToggle === true ? <Signup updateToken={props.updateToken} toggle={props.toggle}/> : <Login updateToken={props.updateToken} toggle={props.toggle}/>}</Col> */}
                <Col md="6">{showToggle === true ? <Signup updateToken={props.updateToken} toggle={props.toggle} setUser={props.setUser}/> : <Login updateToken={props.updateToken} toggle={props.toggle} setUser={props.setUser}/>}</Col>

            </Row>
                <Button onClick={handleToggle} style={toggleButtonStyle}>Toggle Signup and Login</Button>
        </Container>
    </Router>
    )
}

export default Auth;
