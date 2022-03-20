import 'package:flutter/material.dart';

class Login extends StatelessWidget {
  const Login({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: const Text("Hello"),
        floatingActionButton: FloatingActionButton(
          onPressed: () => Navigator.pushNamed(context, '/patient-details'),
        ));
  }
}
