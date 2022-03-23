
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import  { useState } from "react";
import Axios from 'axios';
import {
    FormGroup,
    Input,
    Label
  } from 'reactstrap';



function RegisterForm() {

    /*UseState Hooks*/
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [title,setTitle] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    
    const registerNewUser = () => {
        console.log(firstName + " , " + lastName + "  , " + title + "  , " + email + "  , " + password);
        Axios.post("http://localhost:8080/api/auth/register",{ 
                        firstName: firstName,
                        lastName: lastName,
                        title: title,
                        email:email,
                        password:password});               
    };

/*Register Page View */
    return (
    <div>
    <div className="App d-flex flex-column align-items-center">
      <header className="jumbotron">
        {/* <h3>{this.state.content}</h3> */}
        <h1 className="f-heading">Create An Account</h1>
      </header>
    {/*Sign Up Form */}
      <Form style={{ width: '400px',height:'100%',backgroundColor: 'darkgrey',padding:'25px',borderRadius: '15px' }}>
        <FormGroup className="mb-3">
          <Label className ="f-labels" for ="firstName">First Name:</Label>
          <Input
            type="text"
            name="firstName"
            id="firstname"
            placeholder="First Name"
            onChange = {(event) => {
            setFirstName(event.target.value);
}}/> 
        </FormGroup>
        <FormGroup>
          <Label className ="f-labels" for="lastName">Last Name:</Label>
          <Input
            type="text"
            name="lastName"
            id="lastname"
            placeholder="Last Name"
            onChange = {(event) => {
            setLastName(event.target.value);
    }}
          />
        </FormGroup>

        <FormGroup>
          <Label className ="f-labels" for="examplePassword">Employee Type:</Label>
          <Input
            type="text"
            name="employeetype"
            id="employeetype"
            placeholder="Regular or Manager"
            onChange = {(event) => {
                setTitle(event.target.value);
    }}
          />
        </FormGroup>
        <FormGroup>
          <Label className ="f-labels" for="examplePassword">Email:</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="@example.com"
            onChange = {(event) => {
                setEmail(event.target.value);
    }}
          />
        </FormGroup>
        <FormGroup>
          <Label className ="f-labels" for="examplePassword">Password:</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="********"
            onChange = {(event) => {
                setPassword(event.target.value);
    }}
          />
        </FormGroup>
    {/*Submit form data to back end server on click of Submit btn */}
      <Button type='submit' onClick ={registerNewUser}>Submit</Button>
    </Form>
    </div>
</div>
  );
}
export default RegisterForm;
