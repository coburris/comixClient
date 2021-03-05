import React, { useState } from 'react';
import{Form, FormGroup, Label, Input, Button} from 'reactstrap';


//FUNCTION
const Signup = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        
    {
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

//STYLE

const signupStyle =
{
    textDecoration: "underline"
}

const signupButtonStyle = 
{
    backgroundColor: "white",
        color:'black',
        border: 'solid 2px black',
        transform:"skew(0deg)",
}
    
return (
    <div>
            <h4 style={signupStyle}>Sign Up</h4>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="username"></Label>
                    <Input type="text" onChange={(e) => setUsername(e.target.value)} name="username" placeholder="Alter-Ego" value={username} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters" required />
                    {/* {Object.keys(usernameErr).map((key)=>{
                        return <div style={{color : "#DE3E35"}}>{usernameErr[key]}</div>
                    })} */}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password"></Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name="password"  placeholder="Code-Word" input type="password" value={password} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}" title="Must contain at least 5 or more characters" required />
                    {/* {Object.keys(passwordErr).map((key)=>{
                        return <div style={{color : "#DE3E35"}}>{passwordErr[key]}</div>
                    })} */}
                </FormGroup>
                <Button style={signupButtonStyle} type="submit">Sign Up</Button>
            </Form>
        </div>
    )
}

export default Signup;