import React, {useState} from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import APIURL from '../helpers/environment';


const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [badLogin, setBadLogin] = useState(false);
    const handleSubmit = (event) => {
        setBadLogin(false);
        event.preventDefault();
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({username: username, password: password}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            if(data.token){
                props.updateToken(data.token)
                console.log(data.token)
                localStorage.setItem('alter_ego', username);  //adds username to local storage
                props.toggle()
            }else{
                setBadLogin(true);
            }
            
        }).catch((err)=>{
            console.log(err);
        })
    };

    const loginStyle =
    {
        textDecoration: "underline"
    }

    const loginButtonStyle = 
{
    backgroundImage:"radial-gradient(circle, #f8d568, #fa7a48)",
        color:'white',
        border: 'solid 2px black',
        transform:"skew(0deg)",
}
   //let thePattern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}"
    let thePattern = null
    return (
        <div>
            <h4 style={loginStyle}>Login</h4>
            <Form onSubmit={handleSubmit} >
                <FormGroup>
                    <Label htmlFor="username"></Label>
                    <Input onChange={(e) => setUsername(e.target.value)} name="username" placeholder="Alter-Ego" value={username} pattern={thePattern} title="Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters" required />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password"></Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Code-Word" input type="password" value={password} pattern={thePattern} title="Must contain at least 5 or more characters" required />
                </FormGroup>
                <Button  style={loginButtonStyle} type="submit">Login</Button>
                {badLogin ? <p style={{color:"red", marginTop:"5%"}}>Credentials Failed ... Try Again</p> : null}
            </Form>
        </div>
    )
}

export default Login;
