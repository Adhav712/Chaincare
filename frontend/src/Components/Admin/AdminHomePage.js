import React from "react";
import "./AdminHomePage.css";

export default function AdminHomePage() {

    return(
      <div id="loginform">
        <FormHeader title="Admin Home" />
        <Form />
      </div>
    )
  }


// Admin ID , Hospital Name

const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);


const Form = props => (
   <div>
     <FormInput description="Admin ID" placeholder="" type="email" />
     <FormInput description="Hospital Name" placeholder="" type="text"/>
     
     <FormButton title="Save"/>
     <FormButton title="Create Patient"/>
     <FormButton title="Create Doctor"/>
     
    
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
