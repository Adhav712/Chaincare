/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const crypto = require('crypto');
let initPatients = require('./initpatientLedger.json');
let initDoctors = require('./initdoctorLedger.json');

class PatientContract extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Patient Ledger ===========');
        const patient = initPatients;
        for (let i = 0; i < patient.length; i++) {
            patient[i].docType = 'patient';
            await ctx.stub.putState('PID' + i, Buffer.from(JSON.stringify(patient[i])));
            console.info('Added <--> ', patient[i]);
        }
        console.info('============= END : Initialize Patient Ledger ===========');

        const doctor = initDoctors;

        for (let i = 0; i < doctor.length; i++) {
            patient[i].docType = 'doctor';
            await ctx.stub.putState('DOCTOR' + i, Buffer.from(JSON.stringify(doctor[i])));
            console.info('Added <--> ', doctor[i]);
        }
        console.info('============= END : Initialize Ledger ===========');

    }

    // async initLedger(ctx) {
    //     console.info('============= START : Initialize Ledger ===========');
    //     for (let i = 0; i < initPatients.length; i++) {
    //         initPatients[i].docType = 'patient';
    //         await ctx.stub.putState('PID' + i, Buffer.from(JSON.stringify(initPatients[i])));
    //         console.info('Added <--> ', initPatients[i]);
    //     }
    //     console.info('============= END : Initialize Ledger ===========');
    // }

    // async createPatient(ctx, patientId, firstName, lastName, age, address) {
    //     const exists = await this.patientExists(ctx, patientId);
    //     if (exists) {
    //         throw new Error(`The patient ${patientId} already exists`);
    //     }
    //     const patient = {
    //         firstName,
    //         lastName,
    //         docType: 'patient',
    //         age,
    //         address,
    //     };
    //     const buffer = Buffer.from(JSON.stringify(patient));
    //     await ctx.stub.putState(patientId, buffer);
    // }

    // async readPatient(ctx, patientId) {
    //     const exists = await this.patientExists(ctx, patientId);
    //     if (!exists) {
    //         throw new Error(`The patient ${patientId} does not exist`);
    //     }
    //     const buffer = await ctx.stub.getState(patientId);
    //     const asset = JSON.parse(buffer.toString());
    //     return asset;
    // }

    // async updatePatient(ctx, patientId, newAddress) {
    //     const exists = await this.patientExists(ctx, patientId);
    //     if (!exists) {
    //         throw new Error(`The patient ${patientId} does not exist`);
    //     }
    //     const patient = await this.readPatient(ctx, patientId)
    //     patient.address = newAddress;
    //     const buffer = Buffer.from(JSON.stringify(patient));
    //     await ctx.stub.putState(patientId, buffer);
    // }

    async getAllPatientResults(iterator, isHistory) {
        let allResults = [];
        while (true) {
            let res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                console.log(res.value.value.toString('utf8'));

                if (isHistory && isHistory === true) {
                    jsonRes.Timestamp = res.value.timestamp;
                }
                jsonRes.Key = res.value.key;

                try {
                    jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    jsonRes.Record = res.value.value.toString('utf8');
                }
                allResults.push(jsonRes);
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return allResults;
            }
        }
    }

//PatientContract

    async patientExists(ctx, patientId) {
        const buffer = await ctx.stub.getState(patientId);
        return (!!buffer && buffer.length > 0);
    }

    async Patient_updatePatient(ctx, patientId, newFirstname,newLastName,newPassword,newAge,updatedBy,newPhoneNumber,newEmergPhoneNumber,newAddress) {
        const exists = await this.patientExists(ctx, patientId);
        if (!exists) {
            throw new Error(`The patient ${patientId} does not exist`);
        }
        const patient = await this.Patient_readPatient(ctx, patientId)
        let isDataChanged = false;
        if (newFirstname !== null && newFirstname !== '' && patient.firstName !== newFirstname) {
            patient.firstName = newFirstname;
            isDataChanged = true;
        }

        if (newLastName !== null && newLastName !== '' && patient.lastName !== newLastName) {
            patient.lastName = newLastName;
            isDataChanged = true;
        }

        if (newPassword === null || newPassword === '') {
            throw new Error(`Empty or null values should not be passed for newPassword parameter`);
        }else{
            patient.password=crypto.createHash('sha256').update(newPassword).digest('hex');
        }


        if (newAge !== null && newAge !== '' && patient.age !== newAge) {
            patient.age = newAge;
            isDataChanged = true;
        }

        if (updatedBy !== null && updatedBy !== '') {
            patient.changedBy = updatedBy;
        }

        if (newPhoneNumber !== null && newPhoneNumber !== '' && patient.phoneNumber !== newPhoneNumber) {
            patient.phoneNumber = newPhoneNumber;
            isDataChanged = true;
        }

        if (newEmergPhoneNumber !== null && newEmergPhoneNumber !== '' && patient.emergPhoneNumber !== newEmergPhoneNumber) {
            patient.emergPhoneNumber = newEmergPhoneNumber;
            isDataChanged = true;
        }

        if (newAddress !== null && newAddress !== '' && patient.address !== newAddress) {
            patient.address = newAddress;
            isDataChanged = true;
        }

        if (isDataChanged === false) return;

        const buffer = Buffer.from(JSON.stringify(patient));
        await ctx.stub.putState(patientId, buffer);
    }


    async Patient_readPatient(ctx, patientId) {
        const exists = await this.patientExists(ctx, patientId);
        if (!exists) {
            throw new Error(`The patient ${patientId} does not exist`);
        }
        const buffer = await ctx.stub.getState(patientId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

//     async Patient_createPatient(ctx, patientId, firstName, lastName, password, age,
//         phoneNumber,emergPhoneNumber,address, bloodGroup, changedBy, allergies) {
//     const exists = await this.patientExists(ctx, patientId);
//     if (exists) {
//         throw new Error(`The patient ${patientId} already exists`);
//     }
//     const patient = {
//         firstName,
//         lastName,
//         password:crypto.createHash('sha256').update(password).digest('hex'),
//         age,
//         phoneNumber,
//         emergPhoneNumber,
//         address,
//         bloodGroup,
//         changedBy,
//         allergies,
//         docType: 'patient',
//     };
//     const buffer = Buffer.from(JSON.stringify(patient));
//     await ctx.stub.putState(patientId, buffer);
// }

    async Patient_updatePatientPassword(ctx,patientId, newPassword) {
        if (newPassword === null || newPassword === '') {
            throw new Error(`Empty or null values should not be passed for newPassword parameter`);
        }

        const patient = await this.Patient_readPatient(ctx, patientId);
        patient.password = crypto.createHash('sha256').update(newPassword).digest('hex');
        if(patient.pwdTemp){
            patient.pwdTemp = false;
            patient.changedBy = patientId;
        }
        const buffer = Buffer.from(JSON.stringify(patient));
        await ctx.stub.putState(patientId, buffer);
    }

    async Patient_grantAccessToDoctor(ctx, patientId,doctorId) {
        // Get the patient asset from world state
        const patient = await this.Patient_readPatient(ctx, patientId);
        // unique doctorIDs in permissionGranted
        if (!patient.permissionGranted.includes(doctorId)) {
            patient.permissionGranted.push(doctorId);
            patient.changedBy = patientId;
        }
        const buffer = Buffer.from(JSON.stringify(patient));
        await ctx.stub.putState(patientId, buffer);
    };

    async Patient_revokeAccessFromDoctor(ctx, patientId,doctorId) {
        
        const patient = await this.Patient_readPatient(ctx, patientId);
        // Remove the doctor if existing
        if (patient.permissionGranted.includes(doctorId)) {
            patient.permissionGranted = patient.permissionGranted.filter(doctor => doctor !== doctorId);
            patient.changedBy = patientId;
        }
        const buffer = Buffer.from(JSON.stringify(patient));
        // Update the ledger with updated permissionGranted
        await ctx.stub.putState(patientId, buffer);
    };


//DoctorContract

    async doctorExists(ctx, doctorId) {
        const buffer = await ctx.stub.getState(doctorId);
        return (!!buffer && buffer.length > 0);
    }

    async Doctor_readDoctor(ctx, doctorId) {
        const exists = await this.doctorExists(ctx, doctorId);
        if (!exists) {
            throw new Error(`The patient ${doctorId} does not exist`);
        }
        const buffer = await ctx.stub.getState(doctorId);
        const result = JSON.parse(buffer.toString());
        return result;
    }

    async Doctor_ReadPatients(ctx, patientId,doctorId) {

        let patient = await this.Patient_readPatient(ctx, patientId);

        const permissionArray = patient.permissionGranted;
        if(!permissionArray.includes(doctorId)) {
            throw new Error(`The doctor ${doctorId} does not have permission to patient ${patientId}`);
        }
        patient = ({
            patientId: patientId,
            firstName: patient.firstName,
            lastName: patient.lastName,
            age: patient.age,
            bloodGroup: patient.bloodGroup,
            allergies: patient.allergies,
            symptoms: patient.symptoms,
            diagnosis: patient.diagnosis,
            treatment: patient.treatment,
            followUp: patient.followUp
        });
        return patient;
    }

    async Doctor_updateDoctor(ctx, doctorId, firstName, lastName, password, age,
        phoneNumber,address, bloodGroup, fields) {
    const exists = await this.Patient_readPatient(ctx, doctorId);
    if (exists) {
        throw new Error(`The doctor ${doctorId} already exists`);
    }
    const doctor = {
        firstName,
        lastName,
        password:crypto.createHash('sha256').update(password).digest('hex'),
        age,
        phoneNumber,
        address,
        bloodGroup,
        fields,
        docType: 'doctor',
    };
    const buffer = Buffer.from(JSON.stringify(doctor));
    await ctx.stub.putState(doctorId, buffer);
}

    async Doctor_queryPatientsByFirstName(ctx, firstName) {
        return await this.Admin_queryPatientsByFirstName(ctx, firstName);
    }

    async Doctor_queryPatientsByLastName(ctx, lastName) {
       return await this.Admin_queryPatientsByLastName(ctx, lastName);
    }

    async Doctor_updatePatientDetails(ctx, patientId, newSymptoms ,newDiagnosis ,newTreatment ,newFollowUp,updatedBy) {
        const exists = await this.patientExists(ctx, patientId);
        if (!exists) {
            throw new Error(`The patient ${patientId} does not exist`);
        }
        const patient = await this.Patient_readPatient(ctx, patientId);
        let isDataChanged = false;
        if (newSymptoms !== null && newSymptoms !== '' && patient.symptoms !== newSymptoms) {
            patient.symptoms = newSymptoms;
            isDataChanged = true;
        }

        if (newDiagnosis !== null && newDiagnosis !== '' && patient.diagnosis !== newDiagnosis) {
            patient.diagnosis = newDiagnosis;
            isDataChanged = true;
        }

        if (newTreatment !== null && newTreatment !== '' && patient.treatment !== newTreatment) {
            patient.treatment = newTreatment;
            isDataChanged = true;
        }

        if (newFollowUp !== null && newFollowUp !== '' && patient.followUp !== newFollowUp) {
            patient.followUp = newFollowUp;
            isDataChanged = true;
        }

        if (updatedBy !== null && updatedBy !== '') {
            patient.changedBy = updatedBy;
        }

        if (isDataChanged === false) return;

        const buffer = Buffer.from(JSON.stringify(patient));
        await ctx.stub.putState(patientId, buffer);
    }

//ADMIN contract

    async Admin_createPatient(ctx, patientId, firstName, lastName,password, age, phoneNumber) {
    const exists = await this.patientExists(ctx, patientId);
    if (exists) {
        throw new Error(`The patient ${patientId} already exists`);
    }
        const patient = {
            firstName,
            lastName,
            password:crypto.createHash('sha256').update(password).digest('hex'),
            age,
            phoneNumber,
            docType: 'patient',
        };
        const buffer = Buffer.from(JSON.stringify(patient));
        await ctx.stub.putState(patientId, buffer);
    }

    async Admin_createDoctor(ctx, doctorId, firstName, lastName,password, age,
        phoneNumber,Fields) {
    const exists = await this.doctorExists(ctx, doctorId);
    if (exists) {
        throw new Error(`The patient ${doctorId} already exists`);
    }
        const patient = {
            firstName,
            lastName,
            password:crypto.createHash('sha256').update(password).digest('hex'),
            age,
            phoneNumber,
            Fields,
            docType: 'doctor',
        };
        const buffer = Buffer.from(JSON.stringify(patient));
        await ctx.stub.putState(doctorId, buffer);
    }

    async Admin_readPatient(ctx, patientId) {
        const exists = await this.patientExists(ctx, patientId);
        if (!exists) {
            throw new Error(`The patient ${patientId} does not exist`);
        }
        const buffer = await ctx.stub.getState(patientId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async Admin_readDoctor(ctx, doctorId) {
        const exists = await this.doctorExists(ctx, doctorId);
        if (!exists) {
            throw new Error(`The patient ${doctorId} does not exist`);
        }
        const buffer = await ctx.stub.getState(doctorId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async Admin_deletePatient(ctx, patientId) {
        const exists = await this.patientExists(ctx, patientId);
        if (!exists) {
            throw new Error(`The patient ${patientId} does not exist`);
        }
        await ctx.stub.deleteState(patientId);
    }

    async Admin_deleteDoctor(ctx, doctorId) {
        const exists = await this.doctorExists(ctx, doctorId);
        if (!exists) {
            throw new Error(`The patient ${doctorId} does not exist`);
        }
        await ctx.stub.deleteState(doctorId);
    }

    async Admin_queryPatientsByFirstName(ctx, firstName) {
        let queryString = {};
        queryString.selector = {};
        queryString.selector.docType = 'patient';
        queryString.selector.firstName = firstName;
        const buffer = await this.getQueryResultForQueryString(ctx, JSON.stringify(queryString));
        let result = JSON.parse(buffer.toString());

        return this.fetchLimitedFields(result);
    }

    async Admin_queryPatientsByLastName(ctx, lastName) {
        let queryString = {};
        queryString.selector = {};
        queryString.selector.docType = 'patient';
        queryString.selector.lastName = lastName;
        const buffer = await this.getQueryResultForQueryString(ctx, JSON.stringify(queryString));
        let result = JSON.parse(buffer.toString());

        return this.fetchLimitedFields(result);
    }

    // async queryAllPatients(ctx) {
    //     let resultsIterator = await ctx.stub.getStateByRange('', '');
    //     let result = await this.getAllPatientResults(resultsIterator, false);

    //     return this.fetchLimitedFields(result);
    // }

    fetchLimitedFields = result => {
        for (let i = 0; i < result.length; i++) {
            const obj = result[i];
            result[i] = {
                patientId: obj.Key,
                firstName: obj.Record.firstName,
                lastName: obj.Record.lastName,
                phoneNumber: obj.Record.phoneNumber,
                emergPhoneNumber: obj.Record.emergPhoneNumber
            };
        }

        return result;
    }

    async getQueryResultForQueryString(ctx, queryString) {
        let resultsIterator = await ctx.stub.getQueryResult(queryString);
        console.info('getQueryResultForQueryString <--> ', resultsIterator);
        let results = await this.getAllPatientResults(resultsIterator, false);
        return JSON.stringify(results);
    }

//Insurance Contract    
    
    async Ins_ReadPatients(ctx, patientId){
        let patient = await this.Patient_readPatient(ctx, patientId);
        patient = ({
            patientId: patientId,
            firstName: patient.firstName,
            lastName: patient.lastName,
            age: patient.age,
            bloodGroup: patient.bloodGroup,
            allergies: patient.allergies,
            symptoms: patient.symptoms,
            diagnosis: patient.diagnosis,
            treatment: patient.treatment
        });
        return patient;
    }

}

module.exports = PatientContract;