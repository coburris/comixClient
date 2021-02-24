import React, {useState} from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';


const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/user/login', {
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
            props.toggle()
        })
    };


    const loginStyle =
    {
        backgroundColor: "#DE3E35"
    }

    
    return (
        <div>
            <h4>Login</h4>
            <Form onSubmit={handleSubmit} >
                <FormGroup>
                    <Label htmlFor="username">Alter-Ego</Label>
                    <Input onChange={(e) => setUsername(e.target.value)} name="username" value={username}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password}/>
                </FormGroup>
                <Button type="submit" style={loginStyle} onClick={props.setUser(username)}>Login</Button>
            </Form>
        </div>
    )
}

export default Login;
