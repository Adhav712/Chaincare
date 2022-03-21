import 'package:chaincare_frontend/util/constant.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class PatientLogin extends StatefulWidget {
  const PatientLogin({Key? key}) : super(key: key);

  @override
  State<PatientLogin> createState() => _PatientLoginState();
}

final _emailController = TextEditingController();
final _passController = TextEditingController();

class _PatientLoginState extends State<PatientLogin> {
  @override
  Widget build(BuildContext context) {
    final height = MediaQuery.of(context).size.height;
    final width = MediaQuery.of(context).size.height;
    return Scaffold(
      body: Container(
        padding: EdgeInsets.only(left: width / 1.3),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              decoration: BoxDecoration(
                color: colorBlue,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.1),
                    offset: const Offset(0, 10),
                    blurRadius: 30,
                  ),
                ],
                borderRadius: BorderRadius.circular(10),
              ),
              height: height / 2,
              width: width / 2,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Expanded(
                    flex: 0,
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(0, 70, 10, 70),
                      child: Text(
                        kpatientText,
                        style: GoogleFonts.poppins(
                          textStyle: const TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 1,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: TextFormField(
                            controller: _emailController,
                            decoration: const InputDecoration(
                              border: OutlineInputBorder(),
                              labelText: 'Enter your username',
                            ),
                          ),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Padding(
                          padding: const EdgeInsets.all(10.0),
                          child: TextFormField(
                            controller: _passController,
                            decoration: const InputDecoration(
                              border: OutlineInputBorder(),
                              labelText: 'Enter your password',
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(30),
                  color: Colors.white,
                ),
                height: 50,
                width: 200,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    primary: Colors.white,
                  ),
                  onPressed: () {
                    Navigator.pushNamed(context, '/patient-details');
                  },
                  child: const Text('Login'),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
