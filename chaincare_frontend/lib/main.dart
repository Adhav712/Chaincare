import 'package:chaincare_frontend/pages/Splash_screen.dart';
import 'package:chaincare_frontend/pages/details/patient_details.dart';
import 'package:chaincare_frontend/pages/login/admin_login.dart';
import 'package:chaincare_frontend/pages/login/doctor_login.dart';
import 'package:chaincare_frontend/pages/login/insurance_login.dart';
import 'package:chaincare_frontend/pages/login/patient_login.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      initialRoute: '/',
      routes: {
        // When navigating to the "/" route, build the FirstScreen widget.
        '/': (context) => const SplashScreenc(),
        // When navigating to the "/second" route, build the SecondScreen widget.
        '/patient-details': (context) => const PatientDetails(),
        '/patient-login': (context) => const PatientLogin(),
        '/doctor-login': (context) => const DoctorLogin(),
        '/insurance-login': (context) => const InsuranceLogin(),
        '/admin-login': (context) => const AdminLogin()
      },
      theme: ThemeData(
        // is not restarted.
        primarySwatch: Colors.lightBlue,
      ),
      // home: const MyHomePage(),
    );
  }
}
