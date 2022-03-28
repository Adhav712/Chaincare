import React from "react";
import "./Login.css";

export default function Login() {

    return(
      <div id="loginform">
        <FormHeader title="Login" />
        <Form />
      </div>
    )
  }


const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);


const Form = props => (
   <div>
     <FormInput description="Email" placeholder="Enter your email" type="email" />
     <FormInput description="Password" placeholder="Enter your password" type="password"/>
     <FormButton title="Next"/>
   </div>
);

const FormButton = props => (
  <div id="button" class="row">
    <button>{props.title}</button>
  </div>
);

const FormInput = props => (
  <div class="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder}/>
  </div>  
);
