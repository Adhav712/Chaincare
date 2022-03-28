import React from "react";
import "./FormInsurance.css";

export default function FormInsurance() {

    return(
      <div id="loginform">
        <FormHeader title="Insurance Patient Details" />
        <Form />
      </div>
    )
  }




const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);


const Form = props => (
   <div>
<FormInput description="Patient ID" placeholder="" type=""/>
     <FormInput description="First Name" placeholder="" type="text"/>
     <FormInput description="Last Names" placeholder="" type="Text"/>
     <FormInput description="Address" placeholder="" type="Text"/>
     
     <FormInput description="Age" placeholder="" type="Text"/>

     <FormInput description="Blood group" placeholder="" type="tel"/>
     <FormInput description="Allergies" placeholder="" type="Text"/>
   
     <FormInput description="Symptoms" placeholder="" type="Text"/>
     <FormInput description="Diagnosis" placeholder="" type="Text"/>  
     <FormInput description="Treatment" placeholder="" type="Text"/>  
     <FormButton title="Log in"/>
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