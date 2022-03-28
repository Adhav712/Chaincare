import React from "react";
import "./AdminHomePage.css";

export default function AdminAddPatient() {

    return(
      <div id="loginform">
        <FormHeader title="Craete Patient Details" />
        <Form />
      </div>
    )
  }




const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);


const Form = props => (
   <div>
     <FormInput description="Patient ID" placeholder="" type="email" />
     <FormInput description="First Name" placeholder="" type="text"/>
     <FormInput description="Last Names" placeholder="" type="Text"/>
     <FormInput description="Phone Number" placeholder="" type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"/>
     
     
     <FormInput description="Age" placeholder="" type="Text"/>

     <FormInput description="Blood group" placeholder="" type="tel"/>
     <FormInput description="E-Mail" placeholder="" type="Text"/>
    
    
     <FormButton title="Save"/>
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