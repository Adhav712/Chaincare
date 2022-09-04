# Login page

### EmailID:

### Password:

### Organization:

- Hospital
- Insurance( Show only admin in Role Section)

### Role:

- Admin
- Doctor
- Patient

### <strong> Left over details!</strong>

- hospid:
  - 1
  - 2
  - 3
- adminid:
  - ADMIN0
  - ADMIN1
  - ADMIN2
- AdminId
  - hosp1apolloadmin
  - hosp2vijayaadmin
  - hosp3stanleyadmin

With the details form the mail id extract the details about <b>hospID</b> , <b>adminid</b> , <b>AdminId</b>
<br>

    "login_role": "admin",
    "choose_org": "hospital",
    "hospid": "1",
    "AdminID": "hosp1apolloadmin",
    "emailId": "sankar@apollohospital.com",
    "password": "11111111",
    "adminid" : "ADMIN0"

</br>

# Dashboard

## Admin Dashboard

---

### <b>Admin Detials</b>

### <b>Patient</b>

- Create

  - patientId
  - emailId
  - firstName
  - lastName
  - password
  - age
  - phoneNumber
  - <b>Submit</b>

- View

  - ReadPatient
    - input field
      - show result in container( ref: )

- Delete
  - Delete Patient

### <b>Doctor</b>

- Create

  - new_DocID
  - emailId
  - firstName
  - lastName
  - password
  - age
  - phoneNumber
  - Fields
  - <b> Submit</b>

- View

  - ReadDoctorByDoctorID
    - input field
      - show result in container( ref: )

- Delete
  - Delete Doctor

### <b>Admin Private Queries</b>

<br></br>

## Patient Dashboard

---

Primary details load with jwt help of emailID

    "org" : "hospital",
    "hospid": "1",
    "AdminID" : "hosp1apolloadmin",
    "patientId": "PID1"

load this (Patient_readPatient) function using useEffect hook to automatically pull the details of the current patient

### <b>Profile Details</b>

    {
        "firstName": "Monica",
        "lastName": "Latte",
        "age": "50",
        "phoneNumber": "+4912345678",
        "emergPhoneNumber": "+4912345678",
        "address": "Albrechtstrasse 71, 86383 Stadtbergen",
        "emailId" : "monicaLatte@gmail.com",
        "permissionGranted": [],
        "changedBy": "initLedger",
        "password": "12345678",
        "pwdTemp": true
    },

### <b>Medical Details</b>

    {
        "bloodGroup": "O+",
        "allergies": "No",
        "symptoms": "Cholesterol, Total 250 mg/dl",
        "diagnosis": "High Cholesterol",
        "treatment": "Vasolip 10 mg everyday",
        "followUp": "6 Months",
    }

<br></br>
\*by Clicking the button load the function name

    "fun_name" : " ",

<b>Patient_updatePatient</b>

    {
        "patientId" : "PID6",
        "newFirstname" : "Adhavan",
        "newLastName" : "T",
        "newPassword" : "asdas",
        "newAge" : "20",
        "updatedBy" : "patient",
        "newPhoneNumber" : "9344582248",
        "newEmergPhoneNumber" : "9940044617",
        "newAddress" : "xxxxxxx"
    }

<b>Patient_updatePatientPassword</b>

    {
        "patientId":"PID1",
        "newPassword":"Heythere"
    }

<b>Patient_grantAccessToDoctor</b>

    {
        "patientId":"PID1",
        "doctorId":"DOCTOR1"
    }

<b>Patient_revokeAccessFromDoctor</b>

    {
        "patientId":"PID1",
        "doctorId":"DOCTOR1"
    }

Once any changes made reflect the changes by call the useEffect hook.

<br></br>

## Doctor DashBoard

---

Primary details load with jwt help of emailID

    "org":"hospital",
    "hospid":"1",
    "AdminID":"hosp1apolloadmin",
    "queryName":"Doctor_readDoctor",
    "doctorId":"DOCTOR1"

load this (Doctor_readDoctor) function using useEffect hook to automatically pull the details of the current Doctor

### <b>Profile Details</b>

<br></br>
\*by Clicking the button load the function name

    "queryName" : " ",

<b> doctor_update_details</b>

    {
        "org": "hospital",
        "hospid": "1",
        "DocID": "DOCTOR1",
        "function_Name":"doctor_update_details",
        "firstName" : "adhavan",
        "lastName":"asdasdasd",
        "password": "asdsad",
        "age": "32",
        "phoneNumber":"49849",
        "address": "asdkljhnsaiuohdasd",
        "bloodGroup":"+o",
        "fields":"asdgisad"
    }

<b>Doctor_updatePatientDetails</b>

    {
        "org": "hospital",
        "hospid": "1",
        "DocID": "DOCTOR1",
        "function_Name":"Doctor_updatePatientDetails",
        "patientId":"PID1",
        "newSymptoms":"xcxas" ,
        "newDiagnosis":"asdasd" ,
        "newTreatment":"asdaw" ,
        "newFollowUp":"asdsa",
        "updatedBys":"DOCTOR1"
    }

<b>Doctor_ReadPatients</b>

    {
        "org":"hospital",
        "hospid":"2",
        "AdminID":"hosp1apolloadmin",
        "queryName":"Doctor_ReadPatients",
        "patientId":"PID1",
        "doctorId":"DOCTOR1"
    }

<b>Doctor_queryPatientsByFirstName</b>

    {
        "org":"hospital",
        "hospid":"1",
        "AdminID":"hosp1apolloadmin",
        "queryName":"Doctor_queryPatientsByFirstName",
        "firstName":"Monica"
    }

<b>Doctor_queryPatientsByLastName</b>

    {
        "org":"hospital",
        "hospid":"1",
        "AdminID":"hosp1apolloadmin",
        "queryName":"Doctor_queryPatientsByLastName",
        "lastName":"Mustermann"
    }

Once any changes made reflect the changes by call the useEffect hook.

# Insurance Dashboard

    {
        choose_org: ,
        adminid: ,
        Insurance_adminid: ,
        emailId : ,
        password :
    }

## Quering PID

    {
        "org" : "Insurance",
        "AdminID": "appUser",
        "queryName": "Ins_ReadPatients",
        "patientId": "PID1"
    }
