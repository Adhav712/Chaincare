import React from "react";
import "./FormD.css";

export default function Updatepatient() {

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
     <FormInput description="patient ID" placeholder="" type="email" />
     <FormInput description="New Diagnosis" placeholder="" type="text"/>
     <FormInput description="New Follow up" placeholder="" type="Text"/>
     <FormInput description="New Symptoms" placeholder="" type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"/>
     <FormInput description="New Treatment" placeholder="" type="Text"/>
     <FormInput description="Updated By" placeholder="" type="tel"/> 
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
