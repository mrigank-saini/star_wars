import React, { Component }  from 'react';
import classes from './Login.module.css';
import { Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../axios-instance';

class login extends Component { 

    state = { 
    
            username: '',
            password: '',
            disabled: true
        
    }
    constructor(props) {
        super(props);
        if(localStorage.getItem("username")){
            // console.log(this.props);
            this.props.history.push('/search');
        }
    }

    validateForm () {
         return this.state.username.length > 0 &&
            this.state.password.length > 0
        };


    loginHandler = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.get(`/people/?search=${this.state.username}`);
            console.log(response);
            if(response.status===200) {
                if(response.data.results.length){
                    const receivedPwd = response.data.results[0].birth_year;
                    console.log('pwd:'+ receivedPwd);
                    if(this.state.password === receivedPwd){
                        localStorage.setItem("username", this.state.username);
                        this.props.history.push('/search');
                        console.log(this.props);
                    }else{
                        console.log('Incorrect Password used. Try again');
                        alert('Incorrect Password used. Try again');
                    } 
                }else{
                    console.log('Incorrect Username/Password used. Try again');
                    alert('Incorrect Username/Password used. Try again');
                }
            }else { 
                throw new Error("Something went wrong...Try again!!!");
            }
        }
        catch(error) {
            console.log(error);
        }
        
    }

    render() { 
        return (
            <div className={classes.Login}>
                <Form onSubmit={this.loginHandler}>
                    <Form.Label style={{color: '#338eff',fontWeight: 'bold', textTransform: 'uppercase'}}>Start Exploring</Form.Label>
                    <Form.Group controlId="username">
                        <Form.Label className={classes.textLeft}>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Enter your Username" 
                            onChange={(e) => this.setState({username: e.target.value})}/>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label className={classes.textLeft}>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Enter your Password" 
                            onChange={(e) => this.setState({password: e.target.value})}/>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" disabled={!this.validateForm()}>
                        Login
                    </Button>
                    </Form>
                </div>
        );
    }
}

export default login;