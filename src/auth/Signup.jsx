import React, { useState } from 'react';
import{Form, FormGroup, Label, Input, Button} from 'reactstrap';



const Signup = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
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
            console.log(data.token)
        })
    }; 


    const signupStyle =
    {
        backgroundColor: "#DE3E35"
    }

    const labelStyle =
    {
        textAlign: "center"
    }
    
return (
    <div>
            <h4>Sign Up</h4>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="username" style={labelStyle}>Alter-Ego</Label>
                    <Input onChange={(e) => setUsername(e.target.value)} name="username" value={username}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password}/>
                </FormGroup>
                <Button type="submit" style={signupStyle}>Sign Up</Button>
            </Form>
        </div>
    )
}

export default Signup;