import React, { useState } from 'react';
import{Form, FormGroup, Label, Input, Button} from 'reactstrap';


//FUNCTION
const Signup = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErr, setUsernameErr] = useState({})
    const [passwordErr, setPasswordErr] = useState({})

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = formValidation();
    if (isValid) {
            const url ='http://localhost:3000/user/register'
            fetch(url, {
            method: 'POST',
            body: JSON.stringify({username: username, password: password}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })    
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.token)
            localStorage.setItem('alter_ego', username); //adds username to local storage
            console.log(data.token)
            props.toggle();
        })
    }
}; 

    const formValidation = () => {
        const usernameErr = {};
        const passwordErr = {};
        let isValid = true;

        if(username.trim().length < 4){
            usernameErr.usernameShort = "Username is too short";
            isValid = false;
        }

        if((/\d/.test(usernameErr))){
            usernameErr.usernameNumber = "Username must have a number";
            isValid = false;
        }

        if(password.trim().length < 5){
            passwordErr.passwordShort = "Password is too short";
            isValid = false;
        }

        setUsernameErr(usernameErr);
        setPasswordErr(passwordErr);
        return isValid;

    }



//STYLE

const signupStyle =
{
    textDecoration: "underline"
}

const signupButtonStyle = 
{
    backgroundColor: "#DE3E35",
    color: "#FFE659"
}
    
return (
    <div>
            <h4 style={signupStyle}>Sign Up</h4>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="username"></Label>
                    <Input type="text" onChange={(e) => setUsername(e.target.value)} name="username" placeholder="Alter-Ego" value={username}/>
                    {Object.keys(usernameErr).map((key)=>{
                        return <div style={{color : "#DE3E35"}}>{usernameErr[key]}</div>
                    })}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password"></Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name="password"  placeholder="Code-Word" value={password}/>
                    {Object.keys(passwordErr).map((key)=>{
                        return <div style={{color : "#DE3E35"}}>{passwordErr[key]}</div>
                    })}
                </FormGroup>
                <Button style={signupButtonStyle} type="submit">Sign Up</Button>
            </Form>
        </div>
    )
}

export default Signup;