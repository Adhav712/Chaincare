import React from "react";
import "./FormD.css";

export default function FormsDoc() {

    return(
      <div id="loginform">
        <FormHeader title="Doctor Details" />
        <Form />
      </div>
    )
  }




const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);


const Form = props => (
   <div>
     <FormInput description="Doctor ID" placeholder="" type="email" />
     <FormInput description="First Name" placeholder="" type="text"/>
     <FormInput description="Last Names" placeholder="" type="Text"/>
     <FormInput description="Feilds" placeholder="" type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"/>
     <FormInput description="Address" placeholder="" type="Text"/>
     <FormInput description="Blood group" placeholder="" type="tel"/> 
     <FormButton title="Log in"/>
     <FormButton title="Update Diagosis Details"/>
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
