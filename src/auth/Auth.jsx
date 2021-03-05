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
textAlign: "center",
alignItems: "center"
}

const toggleStyle =
{
    alignItems: "center"
}

const buttonColor =
{
    backgroundImage:"radial-gradient(circle, lightcoral, tomato)",
    color:'white',
    border: 'solid 2px black',
    transform:"skew(0deg)",
}

    return (
    <Router>
        <Container className="auth-container">
            <Row style={authStyle}>
                <Col >{showToggle === true ? <Signup updateToken={props.updateToken} toggle={props.toggle} setUser={props.setUser}/> : <Login updateToken={props.updateToken} toggle={props.toggle}/>}</Col>
                <Button style={buttonColor}onClick={handleToggle}>Toggle Signup and Login</Button>
            </Row>
        </Container>
    </Router>
    )
}

export default Auth;