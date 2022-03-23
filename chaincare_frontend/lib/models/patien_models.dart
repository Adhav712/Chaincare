class Patient {
  String? sId;
  String? sRev;
  String? address;
  String? age;
  String? allergies;
  String? bloodGroup;
  String? changedBy;
  String? diagnosis;
  String? emergPhoneNumber;
  String? firstName;
  String? followUp;
  String? lastName;
  String? password;
  // ignore: prefer_void_to_null
  List<Null>? permissionGranted;
  String? phoneNumber;
  bool? pwdTemp;
  String? symptoms;
  String? treatment;

  Patient({
    this.sId,
    this.sRev,
    this.address,
    this.age,
    this.allergies,
    this.bloodGroup,
    this.changedBy,
    this.diagnosis,
    this.emergPhoneNumber,
    this.firstName,
    this.followUp,
    this.lastName,
    this.password,
    this.permissionGranted,
    this.phoneNumber,
    this.pwdTemp,
    this.symptoms,
    this.treatment,
  });

  Patient.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    sRev = json['_rev'];
    address = json['address'];
    age = json['age'];
    allergies = json['allergies'];
    bloodGroup = json['bloodGroup'];
    changedBy = json['changedBy'];
    diagnosis = json['diagnosis'];
    emergPhoneNumber = json['emergPhoneNumber'];
    firstName = json['firstName'];
    followUp = json['followUp'];
    lastName = json['lastName'];
    password = json['password'];
    if (json['permissionGranted'] != null) {
      permissionGranted = [];
      json['permissionGranted'].forEach((v) {
        permissionGranted!.add(v);
      });
    }
    phoneNumber = json['phoneNumber'];
    pwdTemp = json['pwdTemp'];
    symptoms = json['symptoms'];
    treatment = json['treatment'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = sId;
    data['_rev'] = sRev;
    data['address'] = address;
    data['age'] = age;
    data['allergies'] = allergies;
    data['bloodGroup'] = bloodGroup;
    data['changedBy'] = changedBy;
    data['diagnosis'] = diagnosis;
    data['emergPhoneNumber'] = emergPhoneNumber;
    data['firstName'] = firstName;
    data['followUp'] = followUp;
    data['lastName'] = lastName;
    data['password'] = password;
    if (permissionGranted != null) {
      data['permissionGranted'] =
          permissionGranted!.map((v) => v != null ? toJson() : null).toList();
    }
    data['phoneNumber'] = phoneNumber;
    data['pwdTemp'] = pwdTemp;
    data['symptoms'] = symptoms;
    data['treatment'] = treatment;
    return data;
  }
}
