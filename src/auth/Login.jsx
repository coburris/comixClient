import React, {useState} from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';


const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [usernameErr, setUsernameErr] = useState({})
    // const [passwordErr, setPasswordErr] = useState({})
    const handleSubmit = (event) => {
        event.preventDefault();
        // const isValid = formValidation();
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
            localStorage.setItem('alter_ego', username);  //adds username to local storage
            props.toggle()
        })
    };


    // const formValidation = () => {
    //     const usernameErr = {};
    //     const passwordErr = {};
    //     let isValid = true;

    //     if(username.trim().length < 4){
    //         usernameErr.usernameShort = "Username is too short";
    //         isValid = false;
    //     }

    //     if(!username.includes("number")){
    //         usernameErr.usernameNumber = "Username must have a number or special character";
    //         isValid = false;
    //     }

    //     if(password.trim().length < 5){
    //         passwordErr.passwordShort = "Password is too short";
    //         isValid = false;
    //     }

    // }



    const loginStyle =
    {
        textDecoration: "underline"
    }

    const loginButtonStyle = 
{
    backgroundColor: "#DE3E35",
    color: "#FFE659"
}
    
    return (
        <div>
            <h4 style={loginStyle}>Login</h4>
            <Form onSubmit={handleSubmit} >
                <FormGroup>
                    <Label htmlFor="username"></Label>
                    <Input onChange={(e) => setUsername(e.target.value)} name="username" placeholder="Alter-Ego" value={username}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password"></Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Code-Word" value={password}/>
                </FormGroup>
                <Button  style={loginButtonStyle} type="submit">Login</Button>
            </Form>
        </div>
    )
}

export default Login;
